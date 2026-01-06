import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePaymentMethodDto {
  @ApiProperty({
    description: 'Nombre del método de pago',
    example: 'Tarjeta de Crédito',
  })
  @IsString()
  @IsNotEmpty()
  method_name: string;

  @ApiPropertyOptional({
    description: 'Detalles adicionales del método de pago',
    example: 'Aceptamos Visa, Mastercard y American Express',
  })
  @IsString()
  @IsOptional()
  details_payment?: string;
}
