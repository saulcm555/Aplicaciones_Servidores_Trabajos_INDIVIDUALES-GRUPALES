import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSellerDto {
	@ApiProperty({
		description: 'Nombre del vendedor',
		example: 'TechStore S.A.',
	})
	@IsString()
	@IsNotEmpty()
	seller_name: string;

	@ApiPropertyOptional({
		description: 'Email del vendedor',
		example: 'contact@techstore.com',
	})
	@IsOptional()
	@IsEmail()
	email?: string;

	@ApiPropertyOptional({
		description: 'Teléfono del vendedor',
		example: '+1234567890',
	})
	@IsOptional()
	@IsString()
	phone?: string;

	@ApiPropertyOptional({
		description: 'Descripción del vendedor',
		example: 'Tienda especializada en productos tecnológicos',
	})
	@IsOptional()
	@IsString()
	description?: string;
}
