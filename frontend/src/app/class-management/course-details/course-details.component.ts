import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../models/course.model';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent {
  @Input() course: Course | null = null;
  @Input() role: string = 'coach';  
  @Output() close = new EventEmitter<void>(); 
 
  @Output() edit = new EventEmitter<Course>(); 

  constructor(private router: Router) {} 

  onEdit(courseId: number) {
    this.router.navigate(['/course-edit', courseId]);
  }
  

  
  closePopup() {
    this.close.emit(); 
  }
}  