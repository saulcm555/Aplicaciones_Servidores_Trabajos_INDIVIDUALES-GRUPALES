import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateClientDto } from './create-client.dto';

export class UpdateClientDto extends PartialType(CreateClientDto) {
  @ApiPropertyOptional({
    description: 'Nombre actualizado del cliente',
    example: 'Juan Carlos Pérez',
  })
  client_name?: string;

  @ApiPropertyOptional({
    description: 'Email actualizado del cliente',
    example: 'juancarlos@example.com',
  })
  client_email?: string;

  @ApiPropertyOptional({
    description: 'Teléfono actualizado del cliente',
    example: '+9876543210',
  })
  phone?: string;

  @ApiPropertyOptional({
    description: 'Dirección actualizada del cliente',
    example: 'Avenida Central 456',
  })
  address?: string;
}
