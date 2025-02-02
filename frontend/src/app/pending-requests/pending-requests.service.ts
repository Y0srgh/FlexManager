import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../interfaces/client';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class PendingRequestsService {
  private apiUrl = `auth/request/pending-child-request`;

  constructor(private http: HttpClient, private baseService: BaseService) {}

  getRequests(): Observable<any[]> {
    return this.baseService.get<any[]>(this.apiUrl);
  }

  updateRequestStatus(requestId: string, status: 'approved' | 'rejected') {
    return this.baseService.patch<any[]>(`${this.apiUrl}/${requestId}/status`, { status });
  }

  /*
  updateRequestStatus(requestId: string, status: 'approved' | 'rejected') {
    this.http.patch(`${environment.apiUrl}/parent-child-requests/${requestId}/status`, { status })
      .subscribe(
        () => {
          this.pendingRequests = this.pendingRequests.filter(req => req.id !== requestId);
        },
        (error) => console.error(`Error updating request status:`, error)
      );
  }
  */
}
