import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DeliveriesService } from './deliveries.service';
import { Delivery } from './entities/delivery.entity';
import { CreateDeliveryInput } from './dto/create-delivery.input';
import { UpdateDeliveryInput } from './dto/update-delivery.input';

@Resolver(() => Delivery)
export class DeliveriesResolver {
  constructor(private readonly deliveriesService: DeliveriesService) {}

  @Mutation(() => Delivery)
  createDelivery(@Args('createDeliveryInput') createDeliveryInput: CreateDeliveryInput) {
    return this.deliveriesService.create(createDeliveryInput);
  }

  @Query(() => [Delivery], { name: 'deliveries' })
  findAll() {
    return this.deliveriesService.findAll();
  }

  @Query(() => Delivery, { name: 'delivery' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.deliveriesService.findOne(id);
  }

  @Mutation(() => Delivery)
  updateDelivery(@Args('updateDeliveryInput') updateDeliveryInput: UpdateDeliveryInput) {
    return this.deliveriesService.update(updateDeliveryInput.id, updateDeliveryInput);
  }

  @Mutation(() => Delivery)
  removeDelivery(@Args('id', { type: () => Int }) id: number) {
    return this.deliveriesService.remove(id);
  }
}
