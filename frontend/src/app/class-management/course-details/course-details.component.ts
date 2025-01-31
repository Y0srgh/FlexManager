import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent {
  @Input() course: Course | null = null;
  @Input() role: string = 'user';  
  @Output() close = new EventEmitter<void>(); 

  isEditing: boolean = false;  

  
  editCourse() {
    this.isEditing = true;
  }

  
  closePopup() {
    this.close.emit(); 
  }
}  