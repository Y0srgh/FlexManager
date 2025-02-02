import { IsString } from "class-validator";
export class CreateSitePaymentDto {
    @IsString()
    readonly userId: string;
  
    @IsString()
    readonly priceId: string;
}
