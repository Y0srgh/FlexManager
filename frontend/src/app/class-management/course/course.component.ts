import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {
  @Input() course: Course | null = null;
  @Output() viewDetails = new EventEmitter<string>();
  @Output() deleted = new EventEmitter<string>(); 
  @Output() updated = new EventEmitter<Course>();

  showDetails: boolean = false;
  courses: Course[] = [];


  onViewDetails() {
    if (this.course) {
      this.viewDetails.emit(this.course.id);
      this.showDetails = true;
    }
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  
  onCourseDeleted(courseId: string) {
    this.deleted.emit(courseId); 
  }
  onCourseUpdated(updatedCourse: Course) {
    this.updated.emit(updatedCourse);  
  }
}