import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field(() => Int, { description: 'Client ID' })
  clientId: number;

  @Field(() => Float, { description: 'Order total' })
  total: number;

  @Field({ description: 'Order status' })
  status: string;
}
