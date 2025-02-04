import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css']
})
export class CoursePageComponent implements OnInit {
  courses: Course[] = [];
  selectedCourse: Course | null = null;
  showModal: boolean = false;

  constructor(private courseService: CourseService, private router: Router) {}

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses() {
    this.courseService.getCourses().subscribe(
      (data: Course[]) => {
        this.courses = data;
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  onViewDetails(courseId: string) {
    this.selectedCourse = this.courses.find(course => course.id === courseId) || null;
  }

  closeDetails() {
    this.selectedCourse = null;
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onEdit(courseId: string) {
    this.router.navigate(['/course-edit', courseId]);
  }

  onCourseAdded(newCourse: any) {
    this.courses.push(newCourse); 
  }
  onCourseDeleted(courseId: string) {
    this.courses = this.courses.filter(course => course.id !== courseId);
  }
  onCourseUpdated(updatedCourse: Course) {
    const index = this.courses.findIndex(course => course.id === updatedCourse.id);
    if (index !== -1) {
      this.courses[index] = updatedCourse;  
    }}

}