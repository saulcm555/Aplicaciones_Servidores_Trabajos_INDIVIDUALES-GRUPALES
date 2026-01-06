import {
  Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CartsService } from './carts.service';
import { ProductCartsService } from '../product-carts/product-carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CreateProductCartDto } from '../product-carts/dto/create-product-cart.dto';

@ApiTags('Carts')
@Controller('carts')
export class CartsController {
  constructor(
    private readonly cartsService: CartsService,
    private readonly productCartsService: ProductCartsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo carrito' })
  @ApiResponse({ status: 201, description: 'Carrito creado exitosamente' })
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartsService.create(createCartDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los carritos' })
  findAll() {
    return this.cartsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un carrito por ID' })
  findOne(@Param('id') id: string) {
    return this.cartsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un carrito' })
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartsService.update(+id, updateCartDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un carrito' })
  remove(@Param('id') id: string) {
    return this.cartsService.remove(+id);
  }

  // Agregar producto al carrito
  @Post(':cartId/items')
  @ApiOperation({ summary: 'Agregar un producto al carrito' })
  addItemToCart(
    @Param('cartId') cartId: string,
    @Body() body: { id_product: number; quantity: number },
  ) {
    const createProductCartDto: CreateProductCartDto = {
      id_cart: +cartId,
      id_product: body.id_product,
      quantity: body.quantity,
    };
    return this.productCartsService.create(createProductCartDto);
  }

  @Get(':cartId/items')
  @ApiOperation({ summary: 'Listar los productos dentro de un carrito' })
  getCartItems(@Param('cartId') cartId: string) {
    return this.productCartsService.findByCart(+cartId);
  }

  @Delete(':cartId/items/:productId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un producto del carrito' })
  removeItemFromCart(
    @Param('cartId') cartId: string,
    @Param('productId') productId: string,
  ) {
    return this.productCartsService.removeByCartAndProduct(+cartId, +productId);
  }
}
