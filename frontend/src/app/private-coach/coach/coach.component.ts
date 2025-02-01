import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.css']
})
export class CoachComponent {
  
  @Input() coach!: { name: string, specialty: string, image: string };  
  @Output() select = new EventEmitter<string>();

  selectCoach() {
    this.select.emit(this.coach.name);  
    console.log(`${this.coach.name} has been selected!`);
  }
}
