import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CourseService } from './courses.service';
import { CreateCourseDto } from 'src/classes/dto/create-course.dto';
import { UpdateCourseDto } from 'src/classes/dto/update-course.dto';
@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.delete(id);
  }
}
