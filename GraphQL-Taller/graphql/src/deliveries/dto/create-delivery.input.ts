import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateDeliveryInput {
  @Field(() => Int, { description: 'Order ID' })
  orderId: number;

  @Field({ description: 'Delivery status' })
  status: string;

  @Field({ description: 'Delivery address' })
  address: string;

  @Field({ description: 'Delivery date', nullable: true })
  deliveryDate?: string;
}
