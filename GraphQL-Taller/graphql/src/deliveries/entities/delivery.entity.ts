import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Delivery {
  @Field(() => Int, { description: 'Delivery ID' })
  id: number;

  @Field(() => Int, { description: 'Order ID' })
  orderId: number;

  @Field({ description: 'Delivery status' })
  status: string;

  @Field({ description: 'Delivery address' })
  address: string;

  @Field({ description: 'Delivery date', nullable: true })
  deliveryDate?: string;
}
