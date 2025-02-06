import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Coach } from '../../models/coach.model';
import { PrivateReservationService } from '../../services/private-reservation.service'; 
import { PrivateReservation } from '../../models/private-reservation.model';

@Component({
  selector: 'app-reservation-card',
  templateUrl: './reservation-card.component.html',
  styleUrls: ['./reservation-card.component.css']
})
export class ReservationCardComponent {
  @Input() coach!: Coach;  
  @Output() close: EventEmitter<void> = new EventEmitter(); 

  selectedDate: string = '';
  startTime: string = '';
  endTime: string = '';

  constructor(private reservationService: PrivateReservationService) {}

  isFormValid(): boolean {
    if (!this.selectedDate || !this.startTime || !this.endTime) {
      return false;
    }
    if (this.startTime >= this.endTime) {
      return false;
    }
    return true;
  }

  onBookClick() {
    const reservationData = new PrivateReservation(
      this.coach.id,  
       
      this.selectedDate,  
      this.startTime,  
      this.endTime  
    );

    console.log('Données de réservation :', reservationData);

    this.reservationService.createReservation(reservationData).subscribe({
      next: (response) => {
        console.log('Réservation créée', response);
        this.close.emit();  
      },
      error: (error) => {
        console.error('Erreur lors de la réservation', error);
      }
    });
  }
}
