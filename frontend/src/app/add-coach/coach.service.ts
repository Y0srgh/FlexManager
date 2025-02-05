import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coach } from '../models/coach.model';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class CoachService {
  private apiUrl = `auth/coach`;

  constructor(private http: HttpClient, private baseService: BaseService) {}

  createCoach(coachData: Coach): Observable<any> {
    return this.baseService.post(this.apiUrl, coachData);
  }
}
