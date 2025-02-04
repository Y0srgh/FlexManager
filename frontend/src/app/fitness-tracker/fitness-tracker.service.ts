// progress-tracking.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProgressTracking } from './progress-tracking.interface';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class FitnessTrackingService {
  private apiUrl = 'auth/progress';

  constructor(private http: HttpClient, private baseService: BaseService) {}

  getProgressHistory(): Observable<ProgressTracking[]> {
    return this.baseService.get<ProgressTracking[]>(this.apiUrl);
  }

  addProgressEntry(entry: Partial<ProgressTracking>): Observable<ProgressTracking> {
    return this.baseService.post<ProgressTracking>(`${this.apiUrl}/progress-tracking`, entry);
  }
}
