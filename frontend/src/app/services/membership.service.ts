import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface membership {
  id: number;
  name: string;
  details: string;
  price: number;
  equipment: string;
  benefits: string[];
}

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  private apiUrl = 'http://localhost:3000/subscriptions'; // URL de ton API back-end

  constructor(private http: HttpClient) { }

  // Fonction pour récupérer les abonnements depuis l'API
  getMemberships(): Observable<membership[]> {
    return this.http.get<membership[]>(this.apiUrl);
  }
}
