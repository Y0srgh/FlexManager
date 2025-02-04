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
  @Input() coach!: Coach;  // Le coach reçu depuis le parent
  @Output() close: EventEmitter<void> = new EventEmitter();  // Permet de fermer le formulaire après la réservation

  selectedDate: string = '';
  startTime: string = '';
  endTime: string = '';

  constructor(private reservationService: PrivateReservationService) {}

  isFormValid(): boolean {
    // Validation du formulaire
    if (!this.selectedDate || !this.startTime || !this.endTime) {
      return false;
    }
    if (this.startTime >= this.endTime) {
      return false;
    }
    return true;
  }

  onBookClick() {
    // Construction des données de réservation avec les objets complets pour coach et client
    const reservationData = new PrivateReservation(
      this.coach.id,  // coachId
      '481cffd8-42b7-4036-b28a-37cae55aaf93',  // clientId (Remplace '1' par l'ID du client connecté)
      this.selectedDate,  // date
      this.startTime,  // startTime
      this.endTime  // endTime
    );

    console.log('Données de réservation :', reservationData);

    // Appel du service pour créer la réservation
    this.reservationService.createReservation(reservationData).subscribe({
      next: (response) => {
        console.log('Réservation créée', response);
        this.close.emit();  // Ferme le formulaire après la réservation
      },
      error: (error) => {
        console.error('Erreur lors de la réservation', error);
      }
    });
  }
}
