import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class ChildAssociationService {
  private apiUrl = `auth/request`;

  constructor( private baseService: BaseService) {}

  associateChildren(childrenEmails: string[]): Observable<any> {
    console.log("i am here ---------------");
    
    return this.baseService.post<any>(`${this.apiUrl}`, {
      childrenEmails
    });
  }
}
