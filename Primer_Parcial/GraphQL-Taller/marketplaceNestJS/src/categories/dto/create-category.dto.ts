import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Nombre de la categoría',
    example: 'Electrónica',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  category_name: string;

  @ApiPropertyOptional({
    description: 'Descripción de la categoría',
    example: 'Productos electrónicos y tecnológicos',
  })
  @IsString()
  @IsOptional()
  category_description?: string;

  @ApiPropertyOptional({
    description: 'URL de la foto de la categoría',
    example: 'https://example.com/electronics.jpg',
  })
  @IsString()
  @IsOptional()
  category_photo?: string;
}
