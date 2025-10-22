import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePaymentMethodInput {
  @Field({ description: 'Payment method name' })
  name: string;

  @Field({ description: 'Payment method description', nullable: true })
  description?: string;

  @Field({ description: 'Is active', defaultValue: true })
  isActive: boolean;
}
