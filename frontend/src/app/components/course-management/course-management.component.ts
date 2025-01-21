import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CourseService } from '../../course.service';
import { Course } from '../../models/course.model';
import { CourseFormComponent } from '../course-form/course-form.component';

@Component({
  selector: 'app-course-management',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatButtonModule, CourseFormComponent],
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css'],
})
export class CourseManagementComponent implements OnInit {
  courses: Course[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe((courses) => {
      this.courses = courses;
    });
  }

  onDelete(id: number): void {
    this.courseService.deleteCourse(id).subscribe(() => {
      this.loadCourses();
    });
  }
}
