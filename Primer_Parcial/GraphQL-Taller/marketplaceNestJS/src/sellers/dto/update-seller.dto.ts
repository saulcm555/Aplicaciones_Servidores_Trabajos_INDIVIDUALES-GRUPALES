import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateSellerDto } from './create-seller.dto';

export class UpdateSellerDto extends PartialType(CreateSellerDto) {
	@ApiPropertyOptional({
		description: 'Nombre actualizado del vendedor',
		example: 'TechStore Global S.A.',
	})
	seller_name?: string;

	@ApiPropertyOptional({
		description: 'Email actualizado del vendedor',
		example: 'info@techstoreglobal.com',
	})
	email?: string;

	@ApiPropertyOptional({
		description: 'Teléfono actualizado del vendedor',
		example: '+0987654321',
	})
	phone?: string;
}
