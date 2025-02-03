import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../interfaces/client';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = `auth/client`;

  constructor(private baseService: BaseService) {}

  getClients(): Observable<Client[]> {
    return this.baseService.get<Client[]>(this.apiUrl);
  }
}
