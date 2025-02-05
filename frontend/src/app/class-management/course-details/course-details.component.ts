import { Component, Input, Output, EventEmitter, output } from '@angular/core';
import { Course } from '../../models/course.model';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
})
export class CourseDetailsComponent {
  @Input() course: Course | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() deleted = new EventEmitter<string>();
  @Output() updated = new EventEmitter<Course>();

  isEditing = false;

  private apiUrl = 'http://localhost:3000/courses';
  editedCourse: Course = {
    id: '',
    title: '',
    coachId: '',
    coachName: '',
    coachPhoto: '',
    duration: '',

    description: '',
    startTime: '',
    endTime: '',
    capacity: 0
  };
  

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}


  onEdit() {
    if (this.course) {
      this.isEditing = true;
      this.editedCourse = { ...this.course }; 
    }
  }

  onUpdateCourse() {
    if (!this.editedCourse) return;
  
    const updatedCourseData = { 
      title: this.editedCourse.title,
      duration: this.editedCourse.duration,
      description: this.editedCourse.description,
      startTime: this.editedCourse.startTime,
      endTime: this.editedCourse.endTime,
      capacity: this.editedCourse.capacity,
    };
  
    this.http.patch<Course>(`${this.apiUrl}/${this.editedCourse.id}`, updatedCourseData)
      .subscribe(
        (updatedCourse) => {
          this.course = updatedCourse; 
          this.isEditing = false; 
          this.updated.emit(updatedCourse);  
          this.snackBar.open('Course updated successfully!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: 'custom-snackbar',
          });
        },
        (error) => {
          console.error('Error updating course:', error);
          this.snackBar.open('Error updating course!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: 'custom-snackbar',
          });
        }
      );
  }
  


  onDelete(courseId: string) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.http.delete(`${this.apiUrl}/${courseId}`).subscribe(
        () => {
          this.snackBar.open('Course deleted successfully!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: 'custom-snackbar',
          });
          this.deleted.emit(courseId);
        },
        (error) => {
          console.error('Error deleting course:', error);
          this.snackBar.open('Error deleting course!', 'Close', {
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
