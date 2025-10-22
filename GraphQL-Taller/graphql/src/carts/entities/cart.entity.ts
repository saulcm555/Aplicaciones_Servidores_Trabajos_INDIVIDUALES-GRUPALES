import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Cart {
  @Field(() => Int, { description: 'Cart ID' })
  id: number;

  @Field(() => Int, { description: 'Client ID' })
  clientId: number;

  @Field({ description: 'Cart status' })
  status: string;
}
