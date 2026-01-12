import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);
  private readonly webhookUrl = process.env.N8N_WEBHOOK_URL;
  private readonly webhookEnabled = process.env.N8N_ENABLED === 'true';
  private readonly stockBajoThreshold = parseInt(process.env.STOCK_BAJO_THRESHOLD || '5');

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @Inject('ORDERS_SERVICE') private ordersClient: ClientProxy,
  ) {}

  // ============================================
  // REST API Methods (para MCP)
  // ============================================

  /**
   * Obtener todos los productos
   */
  async findAll(): Promise<Product[]> {
    this.logger.log('Getting all products');
    return this.productRepository.find();
  }

  /**
   * Buscar productos por nombre
   */
  async search(query: string): Promise<Product[]> {
    this.logger.log(`Searching products with query: ${query}`);
    return this.productRepository.find({
      where: {
        name: Like(`%${query}%`),
      },
    });
  }

  /**
   * Obtener producto por ID
   */
  async findById(id: string): Promise<Product> {
    this.logger.log(`Getting product by ID: ${id}`);
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  /**
   * Validar stock de un producto
   */
  async validateStock(productId: string, quantity: number): Promise<{
    productId: string;
    productName: string;
    requestedQuantity: number;
    availableStock: number;
    isAvailable: boolean;
    message: string;
  }> {
    this.logger.log(`Validating stock for product ${productId}, quantity: ${quantity}`);
    
    const product = await this.productRepository.findOne({ where: { id: productId } });
    
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    const isAvailable = product.stock >= quantity;
    
    return {
      productId: product.id,
      productName: product.name,
      requestedQuantity: quantity,
      availableStock: product.stock,
      isAvailable,
      message: isAvailable 
        ? `Stock suficiente. Disponible: ${product.stock} unidades`
        : `Stock insuficiente. Solo hay ${product.stock} unidades disponibles`,
    };
  }

  // ============================================
  // RabbitMQ Methods (existente)
  // ============================================

  async reserveStock(productId: string, quantity: number, idempotencyKey: string) {
    this.logger.log(`Reserve stock request for product ${productId}, quantity: ${quantity}, key: ${idempotencyKey}`);

    const product = await this.productRepository.findOne({ where: { id: productId } });

    let result;

    if (!product) {
      this.logger.warn(`Product ${productId} not found`);
      result = {
        approved: false,
        reason: 'PRODUCT_NOT_FOUND',
        idempotencyKey,
      };
    } else if (product.stock < quantity) {
      this.logger.warn(`Insufficient stock for product ${productId}. Available: ${product.stock}, Requested: ${quantity}`);
      result = {
        approved: false,
        reason: 'OUT_OF_STOCK',
        idempotencyKey,
      };
    } else {
      const oldStock = product.stock;
      product.stock -= quantity;
      await this.productRepository.save(product);
      this.logger.log(`Stock reserved for product ${productId}. New stock: ${product.stock}`);

      result = {
        approved: true,
        productId,
        quantity,
        idempotencyKey,
      };

      // 🔥 Emitir evento de egreso a n8n
      await this.emitEventToN8n('egreso.creado', {
        productId: product.id,
        productName: product.name,
        previousStock: oldStock,
        newStock: product.stock,
        quantity,
        reason: 'ORDEN_CONFIRMADA',
      });

      // 🔥 Verificar stock bajo
      if (product.stock <= this.stockBajoThreshold && oldStock > this.stockBajoThreshold) {
        await this.emitEventToN8n('producto.stock_bajo', {
          productId: product.id,
          productName: product.name,
          currentStock: product.stock,
          threshold: this.stockBajoThreshold,
          urgencia: product.stock === 0 ? 'alta' : 'media',
        });
      }
    }

    // Enviar evento de respuesta al Orders Service
    this.ordersClient.emit('product.stockReserved', result);

    return result;
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
            source: 'products-service',
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
