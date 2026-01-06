import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InventoriesService } from './inventories.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@ApiTags('Inventories')
@Controller('inventories')
export class InventoriesController {
  constructor(private readonly inventoriesService: InventoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo inventario' })
  @ApiResponse({ status: 201, description: 'Inventario creado exitosamente' })
  create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoriesService.create(createInventoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los inventarios' })
  findAll() {
    return this.inventoriesService.findAll();
  }

  @Get('/sellers/:sellerId')
  @ApiOperation({ summary: 'Obtener inventarios de un vendedor' })
  findBySeller(@Param('sellerId') sellerId: string) {
    return this.inventoriesService.findBySeller(+sellerId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un inventario por ID' })
  findOne(@Param('id') id: string) {
    return this.inventoriesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un inventario' })
  update(@Param('id') id: string, @Body() updateInventoryDto: UpdateInventoryDto) {
    return this.inventoriesService.update(+id, updateInventoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un inventario' })
  remove(@Param('id') id: string) {
    return this.inventoriesService.remove(+id);
  }
}
