import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSubcategoryProductInput {
  @Field(() => Int, { description: 'Subcategory ID' })
  subcategoryId: number;

  @Field(() => Int, { description: 'Product ID' })
  productId: number;
}
