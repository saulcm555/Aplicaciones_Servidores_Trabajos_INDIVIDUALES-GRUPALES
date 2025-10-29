import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
	@ApiPropertyOptional({
		description: 'Nombre actualizado del producto',
		example: 'Laptop Dell XPS 15',
	})
	product_name?: string;

	@ApiPropertyOptional({
		description: 'Precio actualizado del producto',
		example: 1299.99,
	})
	price?: number;

	@ApiPropertyOptional({
		description: 'Stock actualizado del producto',
		example: 25,
	})
	stock?: number;
}
