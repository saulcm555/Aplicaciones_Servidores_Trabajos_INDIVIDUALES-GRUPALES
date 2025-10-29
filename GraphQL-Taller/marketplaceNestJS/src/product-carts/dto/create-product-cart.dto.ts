import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateProductCartDto {
  @ApiProperty({
    description: 'ID del producto',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  id_product: number;

  @ApiProperty({
    description: 'ID del carrito',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  id_cart: number;

  @ApiProperty({
    description: 'Cantidad del producto en el carrito',
    example: 2,
    minimum: 1,
  })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  quantity: number;
}
