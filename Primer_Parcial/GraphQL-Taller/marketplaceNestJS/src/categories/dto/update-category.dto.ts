import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiPropertyOptional({
    description: 'Nombre actualizado de la categoría',
    example: 'Electrónica y Tecnología',
  })
  category_name?: string;

  @ApiPropertyOptional({
    description: 'Descripción actualizada de la categoría',
    example: 'Nueva descripción de la categoría',
  })
  category_description?: string;
}
