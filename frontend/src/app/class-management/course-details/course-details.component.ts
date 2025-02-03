import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../models/course.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
})
export class CourseDetailsComponent {
  @Input() course: Course | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() edit = new EventEmitter<Course>();
  @Output() deleted = new EventEmitter<string>();

  private apiUrl = 'http://localhost:4000/courses';

  constructor(
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  onEdit(courseId: string) {
    this.router.navigate(['/course-edit', courseId]);
  }

  onDelete(courseId: string) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.http.delete(`${this.apiUrl}/${courseId}`).subscribe(
        () => {
          this.snackBar.open('Class deleted successfully!', 'close', {
            duration: 3000, 
            verticalPosition: 'top', 
            horizontalPosition: 'right',  
            panelClass: 'custom-snackbar',
          });
          this.deleted.emit(courseId);
        },
        (error) => {
          console.error('Error deleting course:', error);
          this.snackBar.open('Error deleting class!', 'close', {
            duration: 3000, 
            verticalPosition: 'top', 
            horizontalPosition: 'right',  
            panelClass: 'custom-snackbar',
          });
          
        }
      );
    }
  }

  closePopup() {
    this.close.emit();
  }
}
