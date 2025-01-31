import { Injectable } from '@angular/core';
import { Course } from '../models/course.model'; 

@Injectable({
  providedIn: 'root'  
})
export class CourseService {
  private course: Course | null = null;

  setCourse(course: Course): void {
    this.course = course;
  }

  getCourse(): Course | null {
    return this.course;
  }
}
