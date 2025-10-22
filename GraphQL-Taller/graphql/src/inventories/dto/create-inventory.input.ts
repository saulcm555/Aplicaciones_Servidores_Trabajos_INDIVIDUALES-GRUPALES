import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateInventoryInput {
  @Field(() => Int, { description: 'Product ID' })
  productId: number;

  @Field(() => Int, { description: 'Stock quantity' })
  quantity: number;

  @Field({ description: 'Warehouse location', nullable: true })
  location?: string;
}
