import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent {
  @Input() course: Course | null = null;
  @Input() role: string = 'user';  // Ajouter le rôle
  @Output() close = new EventEmitter<void>(); // Pour fermer le pop-up

  isEditing: boolean = false;  // Ajouter un état pour le mode édition

  // Fonction pour activer le mode édition
  editCourse() {
    this.isEditing = true;
  }

  // Fonction pour fermer le pop-up
  closePopup() {
    this.close.emit(); 
  }
}  