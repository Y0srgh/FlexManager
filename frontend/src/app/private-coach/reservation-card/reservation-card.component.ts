import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reservation-card',
  templateUrl: './reservation-card.component.html',
  styleUrls: ['./reservation-card.component.css']
})
export class ReservationCardComponent {
  @Input() coachName: string = 'Roua';
  @Input() coachDescription: string = 'Cardio & Strength';
  @Input() coachImage: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSDr5J9LXZpWBmh373DYjQSPr9BX61pOGoxA&s';

  selectedDate: string = '';
  startTime: string = '';
  endTime: string = '';

  
  isFormValid(): boolean {
    
    if (!this.selectedDate || !this.startTime || !this.endTime) {
      return false; 
    }
  
    if (this.startTime >= this.endTime) {
      return false;
    }
    return true; 
  }
}
