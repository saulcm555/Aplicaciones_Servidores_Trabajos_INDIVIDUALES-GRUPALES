import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Seller {
  @Field(() => Int, { description: 'Seller ID' })
  id: number;

  @Field({ description: 'Seller name' })
  name: string;

  @Field({ description: 'Seller email' })
  email: string;

  @Field({ description: 'Seller phone', nullable: true })
  phone?: string;

  @Field({ description: 'Business name', nullable: true })
  businessName?: string;
}
