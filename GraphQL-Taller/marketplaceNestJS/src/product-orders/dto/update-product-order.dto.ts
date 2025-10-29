import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateProductOrderDto } from './create-product-order.dto';

export class UpdateProductOrderDto extends PartialType(CreateProductOrderDto) {
  @ApiPropertyOptional({
    description: 'Cantidad actualizada del producto',
    example: 5,
  })
  quantity?: number;

  @ApiPropertyOptional({
    description: 'Precio unitario actualizado',
    example: 89.99,
  })
  price_unit?: number;

  @ApiPropertyOptional({
    description: 'Subtotal actualizado',
    example: 449.95,
  })
  subtotal?: number;
}
