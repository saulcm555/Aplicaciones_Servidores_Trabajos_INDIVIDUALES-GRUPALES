import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateInventoryDto } from './create-inventory.dto';

export class UpdateInventoryDto extends PartialType(CreateInventoryDto) {
	@ApiPropertyOptional({
		description: 'Ubicación actualizada del inventario',
		example: 'Bodega Secundaria - Guayaquil',
	})
	location?: string;

	@ApiPropertyOptional({
		description: 'Stock total actualizado',
		example: 750,
	})
	stock_total?: number;
}
