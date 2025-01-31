import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {
  @Input() course: Course | null = null;
  @Input() role: string = 'coach'; 
  @Output() viewDetails = new EventEmitter<number>();  

  showDetails: boolean = false;

  onViewDetails() {
    if (this.course) {
      this.viewDetails.emit(this.course.id);  
      this.showDetails = true;  
    }
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }
}  