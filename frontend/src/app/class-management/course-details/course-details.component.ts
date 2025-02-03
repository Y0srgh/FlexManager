import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../models/course.model';
import { Router } from '@angular/router'; 
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent {
  @Input() course: Course | null = null;
  @Output() close = new EventEmitter<void>(); 
  @Output() edit = new EventEmitter<Course>(); 
  @Output() deleted = new EventEmitter<string>(); 

  private apiUrl = 'http://loalhost:4000/courses'; 

  constructor(private router: Router, private http: HttpClient) {} 

  onEdit(courseId: string) {
    this.router.navigate(['/course-edit', courseId]);
  }

  onDelete(courseId: string) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.http.delete(`${this.apiUrl}/${courseId}`).subscribe(
        () => {
          console.log('Course deleted successfully.');
          alert('Course deleted successfully.');
          this.deleted.emit(courseId); 
        },
        (error) => {
          console.error('Error deleting course:', error);
          alert('Failed to delete course. Please try again.');
        }
      );
    }
  }

  closePopup() {
    this.close.emit(); 
  }
}