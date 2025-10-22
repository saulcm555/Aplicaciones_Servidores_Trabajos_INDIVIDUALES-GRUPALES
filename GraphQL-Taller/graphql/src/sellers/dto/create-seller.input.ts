import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSellerInput {
  @Field({ description: 'Seller name' })
  name: string;

  @Field({ description: 'Seller email' })
  email: string;

  @Field({ description: 'Seller phone', nullable: true })
  phone?: string;

  @Field({ description: 'Business name', nullable: true })
  businessName?: string;
}
