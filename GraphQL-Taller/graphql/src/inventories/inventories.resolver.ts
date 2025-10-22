import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { InventoriesService } from './inventories.service';
import { Inventory } from './entities/inventory.entity';
import { CreateInventoryInput } from './dto/create-inventory.input';
import { UpdateInventoryInput } from './dto/update-inventory.input';

@Resolver(() => Inventory)
export class InventoriesResolver {
  constructor(private readonly inventoriesService: InventoriesService) {}

  @Mutation(() => Inventory)
  createInventory(@Args('createInventoryInput') createInventoryInput: CreateInventoryInput) {
    return this.inventoriesService.create(createInventoryInput);
  }

  @Query(() => [Inventory], { name: 'inventories' })
  findAll() {
    return this.inventoriesService.findAll();
  }

  @Query(() => Inventory, { name: 'inventory' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.inventoriesService.findOne(id);
  }

  @Mutation(() => Inventory)
  updateInventory(@Args('updateInventoryInput') updateInventoryInput: UpdateInventoryInput) {
    return this.inventoriesService.update(updateInventoryInput.id, updateInventoryInput);
  }

  @Mutation(() => Inventory)
  removeInventory(@Args('id', { type: () => Int }) id: number) {
    return this.inventoriesService.remove(id);
  }
}
