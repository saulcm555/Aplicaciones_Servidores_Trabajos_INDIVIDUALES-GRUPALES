import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateCartDto } from './create-cart.dto';

export class UpdateCartDto extends PartialType(CreateCartDto) {
  @ApiPropertyOptional({
    description: 'Estado actualizado del carrito',
    example: 'inactive',
  })
  status?: string;
}
