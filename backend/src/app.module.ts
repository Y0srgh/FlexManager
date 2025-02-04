import { ConfigurableModuleBuilder, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv'; // Assurez-vous que dotenv est bien importé
import { SubscriptionsModule } from './subscription/subscription.module';
import { TestModule } from './test/test.module';
import { Test } from './test/entities/test.entity';

import { UserModule } from './user/user.module';
dotenv.config();
import { CourseModule } from './classes/strategy/courses.module';
import { CommonModule } from './common/common.module';
import { BaseService } from './base/base.service';
import { PrivateSessionModule } from './private-session/private-session.module';
import { MessengerModule } from './messenger/messenger.module';
import { SitePaymentModule } from './site-payment/site-payment.module';
import configs from './site-payment/config';


@Module({
  imports: [CourseModule ,  
    ConfigModule.forRoot({
      isGlobal: true,
      load : [ configs]
    }), 
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    TypeOrmModule.forFeature([Test]),
    TestModule,
    SubscriptionsModule,
    SitePaymentModule,
    BaseService,
    MessengerModule,
    UserModule,
    CommonModule,
    PrivateSessionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
