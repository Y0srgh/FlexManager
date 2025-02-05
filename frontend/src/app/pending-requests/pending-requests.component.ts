import { Component } from '@angular/core';
import { PendingRequestsService } from './pending-requests.service';

@Component({
  selector: 'app-pending-requests',
  templateUrl: './pending-requests.component.html',
  styleUrl: './pending-requests.component.css',
})
export class PendingRequestsComponent {
  requests: any[] = [];

  constructor(private pendingRequestsService: PendingRequestsService) {}

  ngOnInit(): void {
    this.fetchPendingRequests();
  }

  fetchPendingRequests() {
    this.pendingRequestsService.getRequests().subscribe({
      next: (requests) => {
        this.requests = requests;
        console.log('requests --------------- ', requests);
      },
      error: (err) => console.error('Error fetching clients:', err),
    });
  }

  updateRequestStatus(requestId: string, status: 'approved' | 'rejected'){
    this.pendingRequestsService.updateRequestStatus(requestId, status).subscribe({
      next: (requests: any) => {
        console.log('requests after patch--------------- ', requests);
        
        this.requests = this.requests.filter(req => req.id !== requestId) ;
      },
      error: (err) => console.error('Error fetching clients:', err),
    });
  }

  //yosr.ghozzi@insat.ucar.tn
}
