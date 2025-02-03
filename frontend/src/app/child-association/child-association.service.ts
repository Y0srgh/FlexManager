import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class ChildAssociationService {
  private apiUrl = `auth/request/associate-children`;

  constructor( private baseService: BaseService) {}

  associateChildren(childrenEmails: string[]): Observable<any> {
    return this.baseService.post<any>(`${this.apiUrl}/associate-children`, {
      childrenEmails
    });
  }
}
