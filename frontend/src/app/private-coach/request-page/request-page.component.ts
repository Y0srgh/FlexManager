import { Component, OnInit } from '@angular/core';
import { PrivateReservationService } from '../../services/private-reservation.service';
import { PrivateReservation } from '../../models/private-reservation.model';

@Component({
  selector: 'app-request-page',
  templateUrl: './request-page.component.html',
  styleUrls: ['./request-page.component.css']
})
export class RequestPageComponent implements OnInit {
  coachId: string = '481cffd8-42b7-4036-b28a-37cae55aaf93';
  reservations: PrivateReservation[] = [];

  constructor(private reservationService: PrivateReservationService) { }

  ngOnInit(): void {
    this.reservationService.getReservations().subscribe((data) => {
      console.log('Toutes les réservations récupérées :', data); 
      this.reservations = data.filter(reservation => reservation.coachId === this.coachId);
      console.log('Réservations filtrées :', this.reservations); 
    });
  }
  }

