import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { CourseService } from './courses.service';
import { CourseController } from './courses.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Course])], // Register the entity here
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
