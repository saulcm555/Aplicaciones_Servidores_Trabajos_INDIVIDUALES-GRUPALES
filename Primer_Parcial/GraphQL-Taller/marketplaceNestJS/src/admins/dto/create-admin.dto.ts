import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    description: 'Nombre del administrador',
    maxLength: 100,
    example: 'Juan Pérez',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  admin_name: string;

  @ApiProperty({
    description: 'Correo electrónico del administrador',
    example: 'admin@marketplace.com',
  })
  @IsEmail()
  @IsNotEmpty()
  admin_email: string;

  @ApiProperty({
    description: 'Contraseña del administrador',
    minLength: 6,
    example: 'securePassword123',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  admin_password: string;

  @ApiPropertyOptional({
    description: 'Rol del administrador en el sistema',
    example: 'superadmin',
  })
  @IsString()
  @IsOptional()
  role?: string;
}
