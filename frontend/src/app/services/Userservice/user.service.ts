import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { BaseService } from '../../base/base.service';
import { Client } from '../../interfaces/client';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `auth/client`;
  constructor(private http: HttpClient, private baseService: BaseService) { }

   public getUserById(id: string | null ): Observable<any> {
    return  this.http.get<any>(`${environment.BASE_URL}/auth/User/${id}`);
  }

   public getUserByEmailAndUsername(email: string | null , username:string | null): Observable<any> {
    return  this.http.get<any>(`${environment.BASE_URL}/auth/User-eu/${email}/${username}`);
  }



  public getAllUsers(): Observable<any[]> {
    return  this.http.get<any>(`${environment.BASE_URL}/auth/User`);
  }

  public getClient(id : string ): Observable<Client> {
      const options = {
        withCredentials: true
      };
      return this.baseService.get<Client>(this.apiUrl,"",);
    }

}
