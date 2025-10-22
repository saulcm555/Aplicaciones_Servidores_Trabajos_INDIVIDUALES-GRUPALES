import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PaymentMethod {
  @Field(() => Int, { description: 'Payment method ID' })
  id: number;

  @Field({ description: 'Payment method name' })
  name: string;

  @Field({ description: 'Payment method description', nullable: true })
  description?: string;

  @Field({ description: 'Is active' })
  isActive: boolean;
}
