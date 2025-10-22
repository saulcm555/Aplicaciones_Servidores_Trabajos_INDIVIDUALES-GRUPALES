import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field({ description: 'Category name' })
  category_name: string;

  @Field({ description: 'Category description', nullable: true })
  description?: string;
}
