import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-failed',
  templateUrl: './failed.component.html',
  styleUrls: ['./failed.component.scss']
})
export class FailedComponent {

  constructor(private router: Router) {}

  retryPayment(): void {
    this.router.navigate(['/payment']); // Redirection vers la page de paiement
  }
}
