import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ProductCart {
  @Field(() => Int, { description: 'Product Cart ID' })
  id: number;

  @Field(() => Int, { description: 'Cart ID' })
  cartId: number;

  @Field(() => Int, { description: 'Product ID' })
  productId: number;

  @Field(() => Int, { description: 'Quantity' })
  quantity: number;
}
