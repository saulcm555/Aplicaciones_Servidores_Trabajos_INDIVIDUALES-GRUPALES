import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateProductOrderDto {
  @ApiProperty({
    description: 'ID de la orden',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  id_order: number;

  @ApiProperty({
    description: 'ID del producto',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  id_product: number;

  @ApiProperty({
    description: 'Precio unitario del producto',
    example: 99.99,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  price_unit: number;

  @ApiProperty({
    description: 'Cantidad del producto en la orden',
    example: 3,
    minimum: 1,
  })
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  quantity: number;

  @ApiProperty({
    description: 'Subtotal (precio_unitario * cantidad)',
    example: 299.97,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  subtotal: number;
}
