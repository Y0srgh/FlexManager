import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Coach } from '../../models/coach.model';

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.css']
})
export class CoachComponent {
  
  @Input() coach!: Coach;    
  @Output() select = new EventEmitter<number>();

  selectCoach() {
    this.select.emit(this.coach.id);  
    console.log(`Coach sélectionné : ${this.coach.name} (ID: ${this.coach.id})`);
  }
}
