import { Component, Input,Output, EventEmitter } from '@angular/core';
import { PrivateReservation } from '../../models/private-reservation.model';
import { PrivateReservationService } from '../../services/private-reservation.service'; // Importation du service


@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.css']
})
export class RequestCardComponent {
  @Input() reservation!: PrivateReservation; // Référence à l'objet PrivateReservation passé en entrée
  @Output() reservationUpdated = new EventEmitter<string>(); 

  constructor(private reservationService: PrivateReservationService) {} // Injection du service

  // Fonction appelée lors du clic sur "Accept"
  onAccept() {
    // Appel de la méthode qui met à jour l'état de la réservation à "approved"
    this.updateReservationState('approved');
  }

  // Fonction appelée lors du clic sur "Refuse"
  onRefuse() {
    // Appel de la méthode qui met à jour l'état de la réservation à "canceled"
    this.updateReservationState('canceled');
  }

  // Fonction générique qui envoie une requête PATCH pour mettre à jour l'état de la réservation
  private updateReservationState(state: string) {
    if (this.reservation && this.reservation.id) {
      this.reservationService.updateState(this.reservation.id, state).subscribe(
        (updatedReservation) => {
          console.log('Réservation mise à jour:', updatedReservation);
          
          this.reservation = updatedReservation; // Mise à jour de la réservation avec les nouvelles données
          this.reservationUpdated.emit(this.reservation.id); 
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la réservation:', error);
          // Afficher l'erreur plus en détail
          if (error.status === 400) {
            console.error('Erreur 400: Mauvaise requête, probablement due à des données incorrectes envoyées.');
          } else {
            console.error('Autre erreur:', error);
          }
        }
      );}}
}
