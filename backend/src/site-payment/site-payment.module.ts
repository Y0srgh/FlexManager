import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { siteSubscriptions } from './entities/site-payment.entity';
import { SitePaymentService } from './site-payment.service';
import { SitePaymentController } from './site-payment.controller';
import { SiteSubscriptionRepository } from './site-payment.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StripeModule } from '@golevelup/nestjs-stripe';
import { SitePaymentWebhookService } from './site-payment-webhook.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { OneTimePaymentRepo } from './one-time-payment.repository';
import { OneTimePayment } from './entities/One-time-Payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([siteSubscriptions,UserEntity,OneTimePayment]),
    StripeModule.forRootAsync(StripeModule, {
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('STRIPE_CONFIG'),
      inject: [ConfigService],
    }),
  ],
  controllers: [SitePaymentController],
  providers: [SitePaymentService,UserService,JwtService, SiteSubscriptionRepository,SitePaymentWebhookService,OneTimePaymentRepo],
})
export class SitePaymentModule {

}
