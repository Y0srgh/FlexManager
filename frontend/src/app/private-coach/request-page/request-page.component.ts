import { Component, OnInit } from '@angular/core';
import { PrivateReservationService } from '../../services/private-reservation.service';
import { PrivateReservation } from '../../models/private-reservation.model';

@Component({
  selector: 'app-request-page',
  templateUrl: './request-page.component.html',
  styleUrls: ['./request-page.component.css']
})
export class RequestPageComponent implements OnInit {
  coachId: string = '4d29a321-fb1d-44a3-85e6-01d3899ef933'; // ID du coach à filtrer
  reservations: PrivateReservation[] = [];

  constructor(private reservationService: PrivateReservationService) { }
  onReservationUpdated(updatedReservationId: string) {
    // Filtrer la réservation mise à jour pour la supprimer de la liste affichée
    this.reservations = this.reservations.filter(reservation => reservation.id !== updatedReservationId);
  }
  

  ngOnInit(): void {
    // Récupérer toutes les réservations
    this.reservationService.getReservations().subscribe((data: any[]) => {
      console.log('Toutes les réservations récupérées :', data);

      // Afficher chaque objet brut reçu
      data.forEach(reservation => {
        console.log('Objet brut reçu :', reservation);
      });

      // Transformer les données
      this.reservations = data.map(reservation => this.transformReservation(reservation));

      console.log('Réservations après transformation :', this.reservations);

      // Filtrer les réservations en fonction de l'ID du coach et de l'état 'pending'
      this.reservations = this.reservations.filter(reservation => 
        reservation.coachId === this.coachId && reservation.state === 'pending'
      );

      console.log('Réservations filtrées et en attente :', this.reservations);
    });
  }

  private transformReservation(data: any): PrivateReservation {
    console.log('Données avant transformation :', data);

    return {
      id: data.id,
      coachId: data.coachEntity?.id || undefined,  
      clientId: data.clientEntity?.id || undefined, 
      username: data.clientEntity?.user?.username || '',
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      imageUrl: data.imageUrl || null,
      state: data.state
    };
  }
}
