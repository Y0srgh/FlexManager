import { Controller, Get, HttpException,HttpStatus,Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SitePaymentService } from './site-payment.service';
import { CreateSitePaymentDto } from './dto/create-site-payment.dto';
import { UpdateSitePaymentDto } from './dto/update-site-payment.dto';

@Controller('site-payment')
export class SitePaymentController {
  constructor(private readonly sitePaymentService: SitePaymentService) {}
  @Post('create-subscription')
  async createSubscription(@Body() createSubscriptionDto : CreateSitePaymentDto ) {
    try {
      const subscription = await this.sitePaymentService.createSubscription(createSubscriptionDto);
      return { success: true, subscription };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

