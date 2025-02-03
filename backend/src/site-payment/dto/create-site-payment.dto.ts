import { IsString } from "class-validator";
import { IsEnum } from 'class-validator';
import { PriceId } from "src/enums/price-id.enum";


export class CreateSitePaymentDto {
    readonly priceId: string;
}
