import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../interfaces/client';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = `auth/client`;

  constructor(private http: HttpClient, private baseService: BaseService) {}

  getClients(): Observable<Client[]> {
    const options = {
      withCredentials: true
    };
    return this.baseService.get<Client[]>(this.apiUrl);
  }
}
