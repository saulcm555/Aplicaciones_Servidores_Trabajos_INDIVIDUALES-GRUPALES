import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PaymentMethodsService } from './payment-methods.service';
import { PaymentMethod } from './entities/payment-method.entity';
import { CreatePaymentMethodInput } from './dto/create-payment-method.input';
import { UpdatePaymentMethodInput } from './dto/update-payment-method.input';

@Resolver(() => PaymentMethod)
export class PaymentMethodsResolver {
  constructor(private readonly paymentMethodsService: PaymentMethodsService) {}

  @Mutation(() => PaymentMethod)
  createPaymentMethod(@Args('createPaymentMethodInput') createPaymentMethodInput: CreatePaymentMethodInput) {
    return this.paymentMethodsService.create(createPaymentMethodInput);
  }

  @Query(() => [PaymentMethod], { name: 'paymentMethods' })
  findAll() {
    return this.paymentMethodsService.findAll();
  }

  @Query(() => PaymentMethod, { name: 'paymentMethod' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.paymentMethodsService.findOne(id);
  }

  @Mutation(() => PaymentMethod)
  updatePaymentMethod(@Args('updatePaymentMethodInput') updatePaymentMethodInput: UpdatePaymentMethodInput) {
    return this.paymentMethodsService.update(updatePaymentMethodInput.id, updatePaymentMethodInput);
  }

  @Mutation(() => PaymentMethod)
  removePaymentMethod(@Args('id', { type: () => Int }) id: number) {
    return this.paymentMethodsService.remove(id);
  }
}
