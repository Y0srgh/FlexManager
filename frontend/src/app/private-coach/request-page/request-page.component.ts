import { Component, OnInit } from '@angular/core';
import { PrivateReservationService } from '../../services/private-reservation.service';
import { PrivateReservation } from '../../models/private-reservation.model';

@Component({
  selector: 'app-request-page',
  templateUrl: './request-page.component.html',
  styleUrls: ['./request-page.component.css']
})
export class RequestPageComponent implements OnInit {
 
  reservations: PrivateReservation[] = [];

  constructor(private reservationService: PrivateReservationService) { }
  onReservationUpdated(updatedReservationId: string) {
  
    this.reservations = this.reservations.filter(reservation => reservation.id !== updatedReservationId);
  }
  

  ngOnInit(): void {
   
    this.reservationService.getReservations().subscribe((data: any[]) => {
      console.log('Toutes les réservations récupérées :', data);

      data.forEach(reservation => {
        console.log('Objet brut reçu :', reservation);
      });

      this.reservations = data.map(reservation => this.transformReservation(reservation));

      console.log('Réservations après transformation :', this.reservations);

      this.reservations = this.reservations.filter(reservation => 
        reservation.state === 'pending'
      );

      console.log('Réservations filtrées et en attente :', this.reservations);
    });
  }

  private transformReservation(data: any): any {
    console.log('Données avant transformation :', data);

    return {
      id: data.id,
   
      username: data.clientEntity?.user?.username || '',
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      imageUrl: data.imageUrl || null,
      state: data.state
    };
  }
}
