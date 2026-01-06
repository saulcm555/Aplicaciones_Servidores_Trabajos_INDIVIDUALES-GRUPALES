import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductOrdersService } from './product-orders.service';
import { CreateProductOrderDto } from './dto/create-product-order.dto';
import { UpdateProductOrderDto } from './dto/update-product-order.dto';

@ApiTags('Product Orders')
@Controller('product-orders')
export class ProductOrdersController {
  constructor(private readonly productOrdersService: ProductOrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Agregar un producto a una orden' })
  @ApiResponse({ status: 201, description: 'Producto agregado a la orden exitosamente' })
  create(@Body() createProductOrderDto: CreateProductOrderDto) {
    return this.productOrdersService.create(createProductOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos en órdenes' })
  findAll() {
    return this.productOrdersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto-orden por ID' })
  findOne(@Param('id') id: string) {
    return this.productOrdersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un producto en la orden' })
  update(@Param('id') id: string, @Body() updateProductOrderDto: UpdateProductOrderDto) {
    return this.productOrdersService.update(+id, updateProductOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un producto de la orden' })
  remove(@Param('id') id: string) {
    return this.productOrdersService.remove(+id);
  }
}
