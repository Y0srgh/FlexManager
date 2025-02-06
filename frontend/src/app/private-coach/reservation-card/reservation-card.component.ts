import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Coach } from '../../models/coach.model';
import { PrivateReservationService } from '../../services/private-reservation.service';
import { PrivateReservation } from '../../models/private-reservation.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-reservation-card',
  templateUrl: './reservation-card.component.html',
  styleUrls: ['./reservation-card.component.css'],
})
export class ReservationCardComponent {
  @Input() coach!: Coach;
  @Output() close: EventEmitter<void> = new EventEmitter();

  selectedDate: string = '';
  startTime: string = '';
  endTime: string = '';

  constructor(
    private reservationService: PrivateReservationService,
    private router: Router,
    private snackBar: MatSnackBar,
    private auth: AuthService
  ) {}

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



    this.reservationService.createReservation(reservationData).subscribe({
      next: (response) => {
        console.log('Réservation créée', response);
        this.snackBar.open('Reservation created successufully!', 'close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: 'custom-snackbar',
        });
        this.router.navigate(['/calendar']);
        this.close.emit();
      },
      error: (error) => {
        console.error('Erreur lors de la réservation', error);
        this.snackBar.open('Error creating reservation!', 'close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          panelClass: 'custom-snackbar',
        });
      },
    });
  }
}
