import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../course.entity';
import { CourseService } from './courses.service';
import { CourseController } from './courses.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Course])], 
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
