import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SubcategoryProductsService } from './subcategory-products.service';
import { CreateSubcategoryProductDto } from './dto/create-subcategory-product.dto';
import { UpdateSubcategoryProductDto } from './dto/update-subcategory-product.dto';

@ApiTags('Subcategory Products')
@Controller('subcategory-products')
export class SubcategoryProductsController {
  constructor(private readonly subcategoryProductsService: SubcategoryProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Asociar un producto con una subcategoría' })
  @ApiResponse({ status: 201, description: 'Asociación creada exitosamente' })
  create(@Body() createSubcategoryProductDto: CreateSubcategoryProductDto) {
    return this.subcategoryProductsService.create(createSubcategoryProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las asociaciones subcategoría-producto' })
  findAll() {
    return this.subcategoryProductsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una asociación por ID' })
  findOne(@Param('id') id: string) {
    return this.subcategoryProductsService.findOne(+id);
  }

  @Get('subcategory/:subcategoryId')
  @ApiOperation({ summary: 'Obtener productos de una subcategoría' })
  findBySubcategory(@Param('subcategoryId') subcategoryId: string) {
    return this.subcategoryProductsService.findBySubcategory(+subcategoryId);
  }

  @Get('product/:productId')
  @ApiOperation({ summary: 'Obtener subcategorías de un producto' })
  findByProduct(@Param('productId') productId: string) {
    return this.subcategoryProductsService.findByProduct(+productId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una asociación subcategoría-producto' })
  update(@Param('id') id: string, @Body() updateSubcategoryProductDto: UpdateSubcategoryProductDto) {
    return this.subcategoryProductsService.update(+id, updateSubcategoryProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una asociación subcategoría-producto' })
  remove(@Param('id') id: string) {
    return this.subcategoryProductsService.remove(+id);
  }
}
