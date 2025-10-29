import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, Min, IsString } from 'class-validator';

export class CreateInventoryDto {
	@ApiProperty({
		description: 'ID del vendedor propietario del inventario',
		example: 1,
		minimum: 1,
	})
	@IsInt()
	@Min(1)
	id_seller: number;

	@ApiPropertyOptional({
		description: 'Ubicación del inventario',
		example: 'Bodega Principal - Quito',
	})
	@IsOptional()
	@IsString()
	location?: string;

	@ApiProperty({
		description: 'Stock total en inventario',
		example: 500,
		minimum: 0,
	})
	@IsInt()
	@Min(0)
	stock_total: number;
}
