import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCartDto {
  @ApiProperty({
    description: 'ID del cliente al que pertenece el carrito',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  id_client: number;

  @ApiProperty({
    description: 'Estado del carrito (por defecto "active")',
    example: 'active',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  status?: string;
}
