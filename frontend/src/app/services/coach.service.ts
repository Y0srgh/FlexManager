import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';  // Assure-toi d'importer 'tap'
import { Coach } from '../models/coach.model';
import {  map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class CoachService {
  private apiUrl = 'http://localhost:4000/auth/coach'; 

  constructor(private http: HttpClient) {}

  getCoaches(): Observable<Coach[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(data => console.log('Données des coachs récupérées:', data)),
      map(coaches => 
        coaches
          .filter(coach => coach.isPrivate === true) 
          .map(coach => new Coach(
            coach.id,                           
            coach.expertise || '',              
            coach.user?.username || '',         
            'https://img.freepik.com/vecteurs-libre/illustration-du-jeune-prince-vecteur_1308-174367.jpg'         
          ))
      )
    );
  }
}
