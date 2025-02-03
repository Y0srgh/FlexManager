import { Controller, Get, HttpException,HttpStatus,Post, Body,Request, Patch, Param, Delete ,UseGuards,Res,Req} from '@nestjs/common';
import { SitePaymentService } from './site-payment.service';
import { CreateSitePaymentDto } from './dto/create-site-payment.dto';
import { UpdateSitePaymentDto } from './dto/update-site-payment.dto';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';

@Controller('site-payment')
export class SitePaymentController {
  constructor(private readonly sitePaymentService: SitePaymentService) {}
  @Post('create-subscription')
  @UseGuards(JwtAuthGuard)
  async createSubscriptionSession(@Request() req, @Body() priceId : any ) {
    // try {
      // console.log('Raw Body:', req.rawBody.toString());
    console.log("username test")
      console.log(req.user.username);
    const customer = await this.sitePaymentService.createCustomer(req.user.email,req.user.username);

    const subscription = await this.sitePaymentService.createSubscriptionSession(req.user.id,customer.id,priceId.priceId);
    console.log(subscription);
    //   return { success: true, subscription };
    // } catch (error) {
    //   throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    // }
    return subscription;
  }
}


