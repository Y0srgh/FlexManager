import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { siteSubscriptions } from './entities/site-payment.entity';
import { SitePaymentService } from './site-payment.service';
import { SitePaymentController } from './site-payment.controller';
import { SiteSubscriptionRepository } from './site-payment.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports :[TypeOrmModule.forFeature([siteSubscriptions]),ConfigModule],
  controllers: [SitePaymentController],
  providers: [SitePaymentService,SiteSubscriptionRepository],
  exports:[SitePaymentService]

})
export class SitePaymentModule {}
