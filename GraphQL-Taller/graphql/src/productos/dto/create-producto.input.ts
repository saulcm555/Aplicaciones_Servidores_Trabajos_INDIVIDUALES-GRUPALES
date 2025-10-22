import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateProductoInput {
  @Field(() => Int, { nullable: true })
  id_seller?: number;

  @Field(() => Int, { nullable: true })
  id_category?: number;

  @Field(() => Int, { nullable: true })
  id_sub_category?: number;

  @Field()
  product_name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Float)
  price: number;

  @Field(() => Int, { defaultValue: 0 })
  stock: number;

  @Field({ nullable: true })
  photo?: string;
}
