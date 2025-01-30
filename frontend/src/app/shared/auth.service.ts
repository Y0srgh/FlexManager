import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, switchMap, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:3000/auth';
  private accessTokenSubject = new BehaviorSubject<string | null>(null);
  private refreshingToken = false;

  constructor(private http: HttpClient) {}

  setAccessToken(token: string) {
    this.accessTokenSubject.next(token);
    localStorage.setItem('accessToken', token);
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  refreshAccessToken() {
    console.log("i am in refresh access token");
    
    if (this.refreshingToken) return this.accessTokenSubject.asObservable();

    this.refreshingToken = true;
    return this.http.get<{ accessToken: string }>(`${this.API_URL}/refresh`, { withCredentials: true }).pipe(
      map(response => {
        this.setAccessToken(response.accessToken);
        this.refreshingToken = false;
        return response.accessToken;
      }),
      catchError(error => {
        this.refreshingToken = false;
        console.log("error from refresh access", error);
        
        return throwError(() => error);
      })
    );
  }

  refreshToken(): Observable<any> {
    return this.http.get(`${this.API_URL}/refresh`, { withCredentials: true }).pipe(
      tap((res: any) => {
        localStorage.setItem('accessToken', res.accessToken);
      })
    );
  }

  logout() {
    localStorage.removeItem('accessToken');
    // Redirect to login page
  }
}
