import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductCartsService } from './product-carts.service';
import { CreateProductCartDto } from './dto/create-product-cart.dto';
import { UpdateProductCartDto } from './dto/update-product-cart.dto';

@ApiTags('Product Carts')
@Controller('product-carts')
export class ProductCartsController {
  constructor(private readonly productCartsService: ProductCartsService) {}

  @Post()
  @ApiOperation({ summary: 'Agregar un producto al carrito' })
  @ApiResponse({ status: 201, description: 'Producto agregado al carrito exitosamente' })
  create(@Body() createProductCartDto: CreateProductCartDto) {
    return this.productCartsService.create(createProductCartDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos en carritos' })
  findAll() {
    return this.productCartsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto-carrito por ID' })
  findOne(@Param('id') id: string) {
    return this.productCartsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar cantidad de un producto en el carrito' })
  update(@Param('id') id: string, @Body() updateProductCartDto: UpdateProductCartDto) {
    return this.productCartsService.update(+id, updateProductCartDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un producto del carrito' })
  remove(@Param('id') id: string) {
    return this.productCartsService.remove(+id);
  }
}
