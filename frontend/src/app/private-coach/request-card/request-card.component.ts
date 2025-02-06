import { Component, Input,Output, EventEmitter } from '@angular/core';
import { PrivateReservation } from '../../models/private-reservation.model';
import { PrivateReservationService } from '../../services/private-reservation.service'; // Importation du service


@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.css']
})
export class RequestCardComponent {
  @Input() reservation!: PrivateReservation; 
  @Output() reservationUpdated = new EventEmitter<string>(); 

  constructor(private reservationService: PrivateReservationService) {} 

  onAccept() {

    this.updateReservationState('approved');
  }

 
  onRefuse() {
   
    this.updateReservationState('canceled');
  }


  private updateReservationState(state: string) {
    if (this.reservation && this.reservation.id) {
      this.reservationService.updateState(this.reservation.id, state).subscribe(
        (updatedReservation) => {
          console.log('Réservation mise à jour:', updatedReservation);
          
          this.reservation = updatedReservation; 
          this.reservationUpdated.emit(this.reservation.id); 
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la réservation:', error);
          
          if (error.status === 400) {
            console.error('Erreur 400: Mauvaise requête, probablement due à des données incorrectes envoyées.');
          } else {
            console.error('Autre erreur:', error);
          }
        }
      );}}
}
