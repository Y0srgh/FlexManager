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

  private apiUrl = 'http://localhost:3000/subscriptions'; 

  constructor(private http: HttpClient) { }

  getMemberships(): Observable<membership[]> {
    return this.http.get<membership[]>(this.apiUrl);
  }
}
