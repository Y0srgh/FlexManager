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


@Module({
  imports: [TypeOrmModule.forFeature([siteSubscriptions,UserEntity]),
    StripeModule.forRootAsync(StripeModule, {
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('STRIPE_CONFIG'),
      inject: [ConfigService],
    }),
  ],
  controllers: [SitePaymentController],
  providers: [SitePaymentService, SiteSubscriptionRepository,SitePaymentWebhookService,],
})
export class SitePaymentModule {

}
