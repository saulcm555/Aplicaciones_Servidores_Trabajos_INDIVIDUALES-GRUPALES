import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Client {
  @Field(() => Int)
  id_client: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  address?: string;

  @Field()
  created_at: string;
}
