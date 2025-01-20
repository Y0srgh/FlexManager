import { ConfigurableModuleBuilder, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './courses/entities/course.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [CourseModule ,  
    ConfigModule.forRoot(), // Load .env variables
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, // Use the DATABASE_URL from .env
      autoLoadEntities: true, // Automatically load entities
      synchronize: true, // Set to false in production
    }),

],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
