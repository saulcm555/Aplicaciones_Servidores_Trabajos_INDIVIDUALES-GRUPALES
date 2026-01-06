import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@ObjectType()
export class Admin {
  @Field(() => Int, { description: 'Admin ID' })
  id_admin: number;

  @Field({ description: 'Admin name' })
  admin_name: string;

  @Field({ description: 'Admin email address' })
  @IsEmail()
  admin_email: string;

  // ⚠️ Password NO debe exponerse en queries públicas por seguridad
  // Solo se usa internamente para autenticación
  // @Field({ nullable: true, description: 'Admin password (hashed)' })
  // admin_password?: string;

  @Field({ nullable: true, description: 'Admin role' })
  role?: string;

  @Field(() => GraphQLISODateTime, { description: 'Creation date' })
  created_at: Date;

  @Field(() => GraphQLISODateTime, { nullable: true, description: 'Updated date' })
  updated_at?: Date;
}
