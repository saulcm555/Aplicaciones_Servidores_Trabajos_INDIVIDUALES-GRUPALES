import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCartInput {
  @Field(() => Int, { description: 'Client ID' })
  clientId: number;

  @Field({ description: 'Cart status' })
  status: string;
}
