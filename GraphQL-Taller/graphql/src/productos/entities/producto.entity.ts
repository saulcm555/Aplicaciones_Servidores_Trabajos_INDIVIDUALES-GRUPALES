import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Producto {
  @Field(() => Int)
  id_product: number;

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

  @Field(() => Int)
  stock: number;

  @Field({ nullable: true })
  photo?: string;

  @Field()
  created_at: string;
}
