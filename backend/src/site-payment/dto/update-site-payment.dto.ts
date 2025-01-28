import { PartialType } from '@nestjs/mapped-types';
import { CreateSitePaymentDto } from './create-site-payment.dto';

export class UpdateSitePaymentDto extends PartialType(CreateSitePaymentDto) {}
