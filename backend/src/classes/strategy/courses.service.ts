import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../entities/course.entity';
import { CreateCourseDto } from 'src/classes/dto/create-course.dto';
import { UpdateCourseDto } from 'src/classes/dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = this.courseRepository.create(createCourseDto);
    return this.courseRepository.save(course);
  }

  async findAll(): Promise<Course[]> {
    return this.courseRepository.find({ relations: ['coach'] });
  }

  async findOne(id: number): Promise<Course> {
    return this.courseRepository.findOne({ where: { id }, relations: ['coach'] });
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
    await this.courseRepository.update(id, updateCourseDto);
    return this.courseRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.courseRepository.delete(id);
  }
}
