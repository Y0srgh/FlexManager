import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>, // Inject the repository
  ) {}

  async findAll(): Promise<Course[]> {
    return this.courseRepository.find();
  }

  async findOne(id: number): Promise<Course> {
    return this.courseRepository.findOne({ where: { id } });
  }

  async create(courseData: Partial<Course>): Promise<Course> {
    const course = this.courseRepository.create(courseData);
    return this.courseRepository.save(course);
  }

  async update(id: number, courseData: Partial<Course>): Promise<Course> {
    await this.courseRepository.update(id, courseData);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.courseRepository.delete(id);
  }
}
