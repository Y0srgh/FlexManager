import { ConfigurableModuleBuilder, Module } from '@nestjs/common';
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
import { ReservationModule } from './reservation/reservation.module';
import { PrivateSessionModule } from './private-session/private-session.module';
import { ProgressTrackingModule } from './progress-tracking/progress-tracking.module';

@Module({
  imports: [CourseModule ,  
    ConfigModule.forRoot(), 
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, 
      autoLoadEntities: true, 
      synchronize: true, 
      entities: ["dist/**/*.entity{.ts,.js}"],
    }),
    TypeOrmModule.forFeature([Test]),
    TestModule,
    UserModule,
    CommonModule,
    ReservationModule,
    PrivateSessionModule,
    ProgressTrackingModule

],
controllers: [AppController],
providers: [AppService],
})
export class AppModule {
  
}
