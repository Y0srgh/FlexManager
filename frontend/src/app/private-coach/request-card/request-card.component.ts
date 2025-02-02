import { Component, Input } from '@angular/core';
import { PrivateReservation } from '../../models/private-reservation.model';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.css']
})
export class RequestCardComponent {
  @Input() reservation!: PrivateReservation;

  onAccept() {
    console.log(`Reservation accepted for Client: ${this.reservation.name}`);
  }

  onRefuse() {
    console.log(`Reservation refused for Client: ${this.reservation.name}`);
  }
}
