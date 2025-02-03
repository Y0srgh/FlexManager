import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import JwtResponse from '../../model/JwtResponse';
const ACCESS_KEY = 'accessToken';
const USER_KEY = 'user-key';
const REFRESH_KEY = 'refresh-key';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) {}

  public saveAccessToken(token: string) {
    sessionStorage.removeItem(ACCESS_KEY);
    sessionStorage.setItem(ACCESS_KEY, token);
  }
  public getAccessToken() {
    return sessionStorage.getItem(ACCESS_KEY);
  }
  public saveRefresh(refresh: string) {
    sessionStorage.removeItem(REFRESH_KEY);
    sessionStorage.setItem(REFRESH_KEY, refresh);
  }
  public getRefresh() {
    return sessionStorage.getItem(REFRESH_KEY);
  }
  public authenticateUser(jwtresp: JwtResponse) {
    sessionStorage.setItem(USER_KEY, JSON.stringify(jwtresp));
  }
  public getUserDetails(): JwtResponse | null {
    const accessToken = localStorage.getItem(ACCESS_KEY);

    console.log(accessToken)
    if (accessToken) return jwt_decode.jwtDecode(accessToken);

    return null;
  }

  public isLoggedIn() {
    return sessionStorage.getItem(USER_KEY) != null;
  }
  public logout()
  {
    return this.http.post<any>(`${environment.BASE_URL}/logout`,{});
  }
  public disconnectSession(): void {
    // window.sessionStorage.clear();

  }
}
