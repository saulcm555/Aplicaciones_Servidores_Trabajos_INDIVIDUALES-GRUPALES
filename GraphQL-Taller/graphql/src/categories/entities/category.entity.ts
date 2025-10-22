import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Category {
  @Field(() => Int, { description: 'Category ID' })
  id_category: number;

  @Field({ description: 'Category name' })
  category_name: string;

  @Field({ description: 'Category description', nullable: true })
  description?: string;

  @Field()
  created_at: string;
}
