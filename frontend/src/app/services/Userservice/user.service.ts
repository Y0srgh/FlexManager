import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  public getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${environment.BASE_URL}/user/${id}`);
  }
  public getAllUsers(): Observable<any> {
    return this.http.get<any>(`${environment.BASE_URL}/user/`);
  }

}
