import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiPropertyOptional({
    description: 'Estado actualizado de la orden',
    example: 'completed',
  })
  status?: string;

  @ApiPropertyOptional({
    description: 'Monto total actualizado',
    example: 349.99,
  })
  total_amount?: number;

  @ApiPropertyOptional({
    description: 'Fecha de entrega actualizada',
    example: '2025-11-05',
  })
  delivery_date?: string;
}
