import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { RedisService } from '../redis/redis.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);
  private readonly webhookUrl = process.env.N8N_WEBHOOK_URL;
  private readonly webhookEnabled = process.env.N8N_ENABLED === 'true';

  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @Inject('PRODUCTS_SERVICE') private productsClient: ClientProxy,
    @Inject('EVENTS_SERVICE') private eventsClient: ClientProxy,
    private redisService: RedisService,
  ) {}

  // ============================================
  // REST API Methods (para MCP)
  // ============================================

  /**
   * Obtener todas las órdenes
   */
  async findAll(): Promise<Order[]> {
    this.logger.log('Getting all orders');
    return this.orderRepository.find({
      order: { id: 'DESC' },
    });
  }

  /**
   * Obtener orden por ID
   */
  async findById(id: string): Promise<Order> {
    this.logger.log(`Getting order by ID: ${id}`);
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  // ============================================
  // Core Business Methods
  // ============================================

  async createOrder(dto: { productId: string; quantity: number }) {
    const idempotencyKey = uuidv4();

    this.logger.log(`Creating order for product ${dto.productId} with key ${idempotencyKey}`);

    const order = this.orderRepository.create({
      productId: dto.productId,
      quantity: dto.quantity,
      status: 'PENDING',
      idempotencyKey,
    });

    await this.orderRepository.save(order);

    this.productsClient.emit('product.reserveStock', {
      productId: dto.productId,
      quantity: dto.quantity,
      idempotencyKey,
    });

    
    await this.emitEventToN8n('pedido.recibido', {
      orderId: order.id,
      productId: order.productId,
      quantity: order.quantity,
      status: order.status,
      idempotencyKey: order.idempotencyKey,
    });

    return order;
  }

  async handleStockReserved(data: {
    approved: boolean;
    productId: string;
    quantity: number;
    idempotencyKey: string;
    reason?: string;
  }) {
    const cacheKey = `processed:${data.idempotencyKey}`;
    const lockKey = `lock:${data.idempotencyKey}`;

    // Verificar si el mensaje ya fue procesado
    const alreadyProcessed = await this.redisService.exists(cacheKey);
    if (alreadyProcessed) {
      this.logger.warn(`Duplicate message detected for key ${data.idempotencyKey}, ignoring`);
      return { status: 'duplicate', message: 'Message already processed' };
    }

    // Intentar adquirir lock distribuido (expira en 10 segundos)
    const lockAcquired = await this.redisService.setNX(lockKey, '1', 10);
    if (!lockAcquired) {
      this.logger.warn(`Lock already held for key ${data.idempotencyKey}, another instance processing`);
      return { status: 'locked', message: 'Another instance is processing this message' };
    }

    try {
      // Buscar la orden
      const order = await this.orderRepository.findOne({
        where: { idempotencyKey: data.idempotencyKey },
      });

      if (!order) {
        this.logger.warn(`Order not found for idempotency key ${data.idempotencyKey}`);
        return { status: 'not_found', message: 'Order not found' };
      }

      // Actualizar estado
      if (data.approved) {
        order.status = 'CONFIRMED';
        this.logger.log(`Order ${order.id} CONFIRMED`);
      } else {
        order.status = 'REJECTED';
        this.logger.log(`Order ${order.id} REJECTED - Reason: ${data.reason}`);
      }

      await this.orderRepository.save(order);

      // Emitir eventos de dominio según el resultado
      const eventPayload = {
        orderId: order.id,
        status: order.status,
        productId: data.productId,
        quantity: data.quantity,
        idempotencyKey: data.idempotencyKey,
        timestamp: new Date().toISOString(),
      };

      if (data.approved) {
        this.logger.log(`📤 Emitting event: order.confirmed for order ${order.id}`);
        this.eventsClient.emit('order.confirmed', eventPayload);
        
        // 🔥 Emitir a n8n
        await this.emitEventToN8n('pedido.confirmado', eventPayload);
      } else {
        this.logger.log(`📤 Emitting event: order.cancelled for order ${order.id}`);
        const cancelPayload = {
          ...eventPayload,
          reason: data.reason || 'STOCK_NOT_AVAILABLE',
        };
        this.eventsClient.emit('order.cancelled', cancelPayload);
        
        // 🔥 Emitir a n8n
        await this.emitEventToN8n('pedido.cancelado', cancelPayload);
      }

      // Marcar mensaje como procesado (TTL 24 horas)
      await this.redisService.set(cacheKey, 'true', 86400);

      return { status: 'processed', order };
    } catch (error) {
      this.logger.error(`Error processing stock reserved message: ${error.message}`, error.stack);
      throw error;
    } finally {
      // Liberar lock
      await this.redisService.del(lockKey);
    }
  }

  // ============================================
  // n8n Integration
  // ============================================

  /**
   * Emitir evento a n8n para automatización
   */
  private async emitEventToN8n(evento: string, payload: any): Promise<void> {
    if (!this.webhookEnabled || !this.webhookUrl) {
      this.logger.debug('n8n webhook disabled or URL not configured');
      return;
    }

    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-Event-Type': evento,
        },
        body: JSON.stringify({
          evento,
          timestamp: new Date().toISOString(),
          data: payload,
          metadata: {
            source: 'orders-service',
            version: '1.0.0',
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      this.logger.log(`✅ Evento ${evento} emitido a n8n exitosamente`);
    } catch (error) {
      this.logger.error(`❌ Error emitiendo evento a n8n: ${error.message}`);
      // No lanzamos el error para no afectar el flujo principal
    }
  }
}
