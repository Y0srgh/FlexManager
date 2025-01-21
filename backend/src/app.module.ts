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
import { CourseModule } from './courses/entities/strategy/courses.module';
import { CoachModule } from './coach/coach.module';

@Module({
  imports: [CourseModule ,  
    ConfigModule.forRoot(), 
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, 
      autoLoadEntities: true, 
      synchronize: true, 

    }),
    TypeOrmModule.forFeature([Test]),
    TestModule,
    UserModule,
    CoachModule,

],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
