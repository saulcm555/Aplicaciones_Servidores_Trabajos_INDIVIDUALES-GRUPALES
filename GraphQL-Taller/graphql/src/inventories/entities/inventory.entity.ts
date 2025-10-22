import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Inventory {
  @Field(() => Int, { description: 'Inventory ID' })
  id: number;

  @Field(() => Int, { description: 'Product ID' })
  productId: number;

  @Field(() => Int, { description: 'Stock quantity' })
  quantity: number;

  @Field({ description: 'Warehouse location', nullable: true })
  location?: string;
}
