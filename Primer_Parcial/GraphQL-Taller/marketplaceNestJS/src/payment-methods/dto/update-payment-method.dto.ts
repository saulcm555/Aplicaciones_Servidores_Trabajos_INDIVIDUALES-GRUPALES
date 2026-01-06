import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreatePaymentMethodDto } from './create-payment-method.dto';

export class UpdatePaymentMethodDto extends PartialType(CreatePaymentMethodDto) {
  @ApiPropertyOptional({
    description: 'Nombre actualizado del método de pago',
    example: 'Tarjeta de Débito',
  })
  method_name?: string;

  @ApiPropertyOptional({
    description: 'Detalles actualizados del método de pago',
    example: 'Solo aceptamos tarjetas nacionales',
  })
  details_payment?: string;
}
