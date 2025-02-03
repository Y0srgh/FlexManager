import { ConfigurableModuleBuilder, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './test/entities/test.entity';
import * as dotenv from 'dotenv';
import { TestModule } from './test/test.module';
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
      url: 'postgresql://postgres:root@localhost:5433/flexmanager',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    TypeOrmModule.forFeature([Test]),
    TestModule,
    SitePaymentModule,
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
