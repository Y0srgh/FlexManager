import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {
  @Input() course: Course | null = null;
  @Input() role: string = 'user'; // Ajouter l'input rôle
  @Output() viewDetails = new EventEmitter<number>();  // Émettre l'ID du cours

  showDetails: boolean = false;

  onViewDetails() {
    if (this.course) {
      this.viewDetails.emit(this.course.id);  // Envoyer l'ID du cours au parent
      this.showDetails = true;  // Afficher les détails
    }
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }
}  