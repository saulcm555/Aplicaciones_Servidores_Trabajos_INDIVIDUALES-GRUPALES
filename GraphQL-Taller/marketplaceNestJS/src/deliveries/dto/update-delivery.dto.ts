import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateDeliveryDto } from './create-delivery.dto';

export class UpdateDeliveryDto extends PartialType(CreateDeliveryDto) {
  @ApiPropertyOptional({
    description: 'Estado actualizado de la entrega',
    example: 'delivered',
  })
  status?: string;

  @ApiPropertyOptional({
    description: 'Dirección actualizada de entrega',
    example: 'Avenida Central 456',
  })
  delivery_address?: string;

  @ApiPropertyOptional({
    description: 'Costo actualizado de entrega',
    example: 7.99,
  })
  delivery_cost?: number;
}
