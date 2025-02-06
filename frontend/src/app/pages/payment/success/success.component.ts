import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent {
  showSuccessPopup: boolean = false; 
  paymentForm: any; 
  selectedItem: string = '';
  selectedPlan: string = '';

  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigate(['/home']); 
  }

  closeSuccessPopup(): void {
    this.showSuccessPopup = false;
    this.resetForm();
  }

  resetForm(): void {
    if (this.paymentForm) {
      this.paymentForm.reset();
    }
    this.selectedItem = '';
    this.selectedPlan = '';
  }
}
