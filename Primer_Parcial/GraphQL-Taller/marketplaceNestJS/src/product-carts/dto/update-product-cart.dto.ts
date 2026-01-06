import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateProductCartDto } from './create-product-cart.dto';

export class UpdateProductCartDto extends PartialType(CreateProductCartDto) {
  @ApiPropertyOptional({
    description: 'Cantidad actualizada del producto',
    example: 5,
  })
  quantity?: number;
}
