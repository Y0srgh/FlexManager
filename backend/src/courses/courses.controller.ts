import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CourseService } from './courses.service';
import { Course } from './entities/course.entity';

@Controller('courses') // Base route for all endpoints
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async findAll(): Promise<Course[]> {
    return this.courseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Course> {
    return this.courseService.findOne(id);
  }

  @Post()
  async create(@Body() courseData: Partial<Course>): Promise<Course> {
    return this.courseService.create(courseData);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() courseData: Partial<Course>,
  ): Promise<Course> {
    return this.courseService.update(id, courseData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.courseService.delete(id);
  }
}
