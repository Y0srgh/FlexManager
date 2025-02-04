// client.component.ts
import { Component, OnInit } from '@angular/core';
import { ClientService } from './client.service';
import { Client } from '../interfaces/client';

@Component({
  selector: 'app-client',
  template: `
    <div class="container">
      <h2>Clients</h2>
      
      <div *ngIf="loading" class="loading">
        Loading...
      </div>

      <div *ngIf="error" class="error">
        {{ error }}
      </div>

      <div *ngIf="!loading && !error" class="client-list">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let client of clients">
              <td>{{ client.id }}</td>
              <td>{{ client.email }}</td>
              <td>{{ client.username }}</td>
              <td>{{ client.goal }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .container { padding: 20px; }
    .error { color: red; margin: 10px 0; }
    .loading { margin: 10px 0; }
    .table { width: 100%; border-collapse: collapse; }
    .table th, .table td { padding: 8px; border: 1px solid #ddd; }
    .table th { background-color: #f5f5f5; }
  `]
})
export class ClientComponent implements OnInit {
  clients: Client[] = [];
  loading = false;
  error: string | null = null;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.loading = true;
    this.error = null;

    this.clientService.getClients()
      .subscribe({
        next: (data) => {
          this.clients = data;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Failed to load clients. Please try again later.';
          this.loading = false;
          if (error.status === 403) {
            this.error = 'You do not have permission to view clients.';
          }
        }
      });
  }
}
