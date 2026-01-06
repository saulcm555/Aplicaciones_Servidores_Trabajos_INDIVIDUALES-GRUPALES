import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, IsNumber, IsDateString, MaxLength } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'ID del cliente que realiza la orden',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  id_client: number;

  @ApiPropertyOptional({
    description: 'ID del carrito asociado',
    example: 1,
  })
  @IsInt()
  @IsOptional()
  id_cart?: number;

  @ApiProperty({
    description: 'ID del método de pago',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  id_payment_method: number;

  @ApiPropertyOptional({
    description: 'ID de la entrega',
    example: 1,
  })
  @IsInt()
  @IsOptional()
  id_delivery?: number;

  @ApiProperty({
    description: 'Monto total de la orden',
    example: 299.99,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  total_amount: number;

  @ApiPropertyOptional({
    description: 'Estado de la orden',
    example: 'pending',
    maxLength: 50,
  })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  status?: string;

  @ApiPropertyOptional({
    description: 'Fecha de entrega estimada',
    example: '2025-11-01',
  })
  @IsString()
  @IsOptional()
  delivery_date?: string;
}
