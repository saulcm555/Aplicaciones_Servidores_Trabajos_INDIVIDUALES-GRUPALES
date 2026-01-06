import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateAdminDto } from './create-admin.dto';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
  @ApiPropertyOptional({
    description: 'Nombre actualizado del administrador',
    maxLength: 100,
    example: 'Juan Carlos Pérez',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  admin_name?: string;

  @ApiPropertyOptional({
    description: 'Correo electrónico actualizado del administrador',
    example: 'admin_nuevo@marketplace.com',
  })
  @IsOptional()
  @IsEmail()
  admin_email?: string;

  @ApiPropertyOptional({
    description: 'Nueva contraseña del administrador',
    minLength: 6,
    example: 'newSecurePassword456',
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  admin_password?: string;

  @ApiPropertyOptional({
    description: 'Rol actualizado del administrador',
    example: 'moderator',
  })
  @IsOptional()
  @IsString()
  role?: string;
}
