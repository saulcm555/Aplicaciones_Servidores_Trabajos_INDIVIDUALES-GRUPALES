import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateSubcategoryProductDto } from './create-subcategory-product.dto';

export class UpdateSubcategoryProductDto extends PartialType(CreateSubcategoryProductDto) {
  @ApiPropertyOptional({
    description: 'ID actualizado de la subcategoría',
    example: 2,
  })
  id_subcategory?: number;

  @ApiPropertyOptional({
    description: 'ID actualizado del producto',
    example: 2,
  })
  id_product?: number;
}
