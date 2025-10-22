import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class SubcategoryProduct {
  @Field(() => Int, { description: 'Subcategory Product ID' })
  id: number;

  @Field(() => Int, { description: 'Subcategory ID' })
  subcategoryId: number;

  @Field(() => Int, { description: 'Product ID' })
  productId: number;

  @Field({ description: 'Created at', nullable: true })
  createdAt?: string;
}
