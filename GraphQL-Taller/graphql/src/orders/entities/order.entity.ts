import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Order {
  @Field(() => Int, { description: 'Order ID' })
  id: number;

  @Field(() => Int, { description: 'Client ID' })
  clientId: number;

  @Field(() => Float, { description: 'Order total' })
  total: number;

  @Field({ description: 'Order status' })
  status: string;

  @Field({ description: 'Order date' })
  date: string;
}
