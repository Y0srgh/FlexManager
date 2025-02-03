import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface Plan {
  type: string;
  name: string;
  discount?: number;
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  paymentForm!: FormGroup;
  paymentType: string = '';
  selectedItem: string = '';
  selectedPlan: string = '';
  showItemSelection: boolean = false;
  transactionId: string = '';
  isProcessing: boolean = false;
  showErrorPopup: boolean = false;

  plans: Plan[] = [
    { type: 'monthly', name: 'Monthly Plan' },
    { type: 'annual', name: 'Annual Plan', discount: 15 },
    { type: 'quarterly', name: 'Quarterly Plan', discount: 10 }
  ];

  availableItems: any[] = [];

  constructor(private fb: FormBuilder, private router: Router) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadAvailableItems();
  }

  private initializeForm(): void {
    this.paymentForm = this.fb.group({
      paymentType: ['', Validators.required], 
      planType: ['monthly', Validators.required]
    });
  }

  private loadAvailableItems(): void {
    this.availableItems = [
      { id: 1, name: 'Basic Course', price: 100 },
      { id: 2, name: 'Premium Course', price: 200 }
    ];
  }

  onPaymentTypeChange(event: any): void {
    this.paymentType = event.target.value;
    this.showItemSelection = ['course', 'subscription', 'Private Session'].includes(this.paymentType);
  }

  onPlanChange(planType: string) {
    this.selectedPlan = planType;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.paymentForm.get(fieldName);
    return field ? (field.invalid && field.touched) : false;
  }

  resetForm(): void {
    this.paymentForm.reset({ paymentType: '', planType: 'monthly' });
    this.selectedItem = '';
    this.selectedPlan = '';
  }

  private processPayment(paymentDetails: any): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.transactionId = 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase();
        resolve();
      }, 2000);
    });
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      this.isProcessing = true;
      const paymentDetails = this.paymentForm.value;
  
      this.processPayment(paymentDetails)
        .then(() => {
          this.isProcessing = true;
          this.router.navigate(['/success']); 
        })
        .catch(() => {
          this.isProcessing = false;
          this.showErrorPopup = true; 
        });
    } else {
      this.markFormGroupTouched(this.paymentForm); 
      this.showErrorPopup = true; 
    }
  }
  


  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
