import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
	@ApiProperty({
		description: 'Nombre del producto',
		example: 'Laptop Dell Inspiron',
	})
	@IsString()
	@IsNotEmpty()
	product_name: string;

	@ApiPropertyOptional({
		description: 'Descripción del producto',
		example: 'Laptop de 15 pulgadas con procesador Intel i7',
	})
	@IsOptional()
	@IsString()
	description?: string;

	@ApiProperty({
		description: 'Precio del producto',
		example: 999.99,
		minimum: 0,
	})
	@Type(() => Number)
	@IsNumber()
	@Min(0)
	price: number;

	@ApiProperty({
		description: 'Stock disponible del producto',
		example: 50,
		minimum: 0,
	})
	@Type(() => Number)
	@IsInt()
	@Min(0)
	stock: number;

	@ApiPropertyOptional({
		description: 'ID del vendedor',
		example: 1,
	})
	@IsOptional()
	@IsInt()
	id_seller?: number;

	@ApiPropertyOptional({
		description: 'ID de la categoría',
		example: 1,
	})
	@IsOptional()
	@IsInt()
	id_category?: number;

	@ApiPropertyOptional({
		description: 'ID de la subcategoría',
		example: 1,
	})
	@IsOptional()
	@IsInt()
	id_sub_category?: number;

	@ApiPropertyOptional({
		description: 'URL de la foto del producto',
		example: 'https://example.com/laptop.jpg',
	})
	@IsOptional()
	@IsString()
	photo?: string;
}
