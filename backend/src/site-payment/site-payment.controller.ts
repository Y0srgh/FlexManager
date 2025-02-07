import { Controller, Get, HttpException,HttpStatus,Post, Body,Request, Patch, Param, Delete ,UseGuards,Res,Req} from '@nestjs/common';
import { SitePaymentService } from './site-payment.service';
import { CreateSitePaymentDto } from './dto/create-site-payment.dto';
import { UpdateSitePaymentDto } from './dto/update-site-payment.dto';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';
import { PriceId } from 'src/enums/price-id.enum';

@Controller('site-payment')
export class SitePaymentController {
  constructor(private readonly sitePaymentService: SitePaymentService) {}
  @Post('site-payment')
  @UseGuards(JwtAuthGuard)
  async createSubscriptionSession(@Request() req, @Body() plan : any ) {

    console.log("username test")
    console.log(req.user.username,plan);
    const customer = await this.sitePaymentService.createCustomer(req.user.email,req.user.username);
    const subscription = await this.sitePaymentService.createSubscriptionSession(req.user.id,customer.id,plan.priceId,plan.paymentMode);
    console.log(subscription);

    return {'redirectUrl':subscription.url.toString()};
  }
  @Get("price/:priceId")
  @UseGuards(JwtAuthGuard)
  async getPaymentIntent(@Param('priceId') priceId: string){
    return await this.sitePaymentService.getpaymentIntent(priceId);
  }
  @Get("site-payment/UserSubscription")
  @UseGuards(JwtAuthGuard)
  async getSiteSubscription(@Request() req){
    return await this.sitePaymentService.getSiteSubscription(req.user);
  }
}

