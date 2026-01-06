import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateSubcategoryProductDto {
  @ApiProperty({
    description: 'ID de la subcategoría',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  id_subcategory: number;

  @ApiProperty({
    description: 'ID del producto',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  id_product: number;
}
