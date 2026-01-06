import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SellersService } from './sellers.service';
import { InventoriesService } from '../inventories/inventories.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';

@ApiTags('Sellers')
@Controller('sellers')
export class SellersController {
  constructor(
    private readonly sellersService: SellersService,
    private readonly inventoriesService: InventoriesService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo vendedor' })
  @ApiResponse({ status: 201, description: 'Vendedor creado exitosamente' })
  create(@Body() createSellerDto: CreateSellerDto) {
    return this.sellersService.create(createSellerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los vendedores' })
  findAll() {
    return this.sellersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un vendedor por ID' })
  findOne(@Param('id') id: string) {
    return this.sellersService.findOne(+id);
  }

  @Get(':id/inventory')
  @ApiOperation({ summary: 'Obtener el inventario de un vendedor' })
  findInventory(@Param('id') id: string) {
    return this.inventoriesService.findBySeller(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un vendedor' })
  update(@Param('id') id: string, @Body() updateSellerDto: UpdateSellerDto) {
    return this.sellersService.update(+id, updateSellerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un vendedor' })
  remove(@Param('id') id: string) {
    return this.sellersService.remove(+id);
  }
}
