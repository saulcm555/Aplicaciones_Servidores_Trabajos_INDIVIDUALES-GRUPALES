import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({
    description: 'Nombre del cliente',
    example: 'Juan Pérez',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  client_name: string;

  @ApiProperty({
    description: 'Email del cliente',
    example: 'juan.perez@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  client_email: string;

  @ApiProperty({
    description: 'Contraseña del cliente',
    example: 'password123',
    minLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  client_password: string;

  @ApiProperty({
    description: 'Teléfono del cliente',
    example: '+1234567890',
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  phone: string;

  @ApiProperty({
    description: 'Dirección del cliente',
    example: 'Calle Principal 123',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  address: string;
}
