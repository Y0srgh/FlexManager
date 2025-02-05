import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PrivateReservation } from '../models/private-reservation.model';

@Injectable({
  providedIn: 'root'
})
export class PrivateReservationService {
  private apiUrl = 'http://localhost:3000/reservations'; 

  constructor(private http: HttpClient) {}

  createReservation(reservation: PrivateReservation): Observable<PrivateReservation> {
    return this.http.post<PrivateReservation>(this.apiUrl, reservation);
  }

  getReservations(): Observable<PrivateReservation[]> {
    console.log('getReservations()');
    return this.http.get<PrivateReservation[]>('http://localhost:3000/reservations/coach');
  }
  updateState(id: string, state: string): Observable<PrivateReservation> {
    return this.http.patch<PrivateReservation>(`${this.apiUrl}/${id}`, { state });
  }
  
  
}
