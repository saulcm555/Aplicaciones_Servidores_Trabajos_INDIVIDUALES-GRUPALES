import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, IsNumber, IsDateString, MaxLength } from 'class-validator';

export class CreateDeliveryDto {
  @ApiPropertyOptional({
    description: 'ID del producto a entregar',
    example: 1,
  })
  @IsInt()
  @IsOptional()
  id_product?: number;

  @ApiProperty({
    description: 'Dirección de entrega',
    example: 'Calle Principal 123, Apartamento 4B',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  delivery_address: string;

  @ApiProperty({
    description: 'Ciudad de entrega',
    example: 'Quito',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  city: string;

  @ApiProperty({
    description: 'Estado de la entrega',
    example: 'pending',
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  status: string;

  @ApiPropertyOptional({
    description: 'Tiempo estimado de entrega',
    example: '2025-11-01T10:00:00Z',
  })
  @IsDateString()
  @IsOptional()
  estimated_time?: Date;

  @ApiPropertyOptional({
    description: 'Nombre de la persona que entrega',
    example: 'Carlos Pérez',
    maxLength: 255,
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  delivery_person?: string;

  @ApiProperty({
    description: 'Costo de la entrega',
    example: 5.99,
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  delivery_cost: number;
}
