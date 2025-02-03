import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
interface Plan {
  type: string;
  name: string;
  price: number;
  discount?: number;
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  paymentForm! : FormGroup;
  paymentType: string = 'course';
  selectedItem: string = '';
  selectedPlan: string = '';
  showItemSelection: boolean = false;
  transactionId: string = '';
  isProcessing: boolean = false;
  showSuccessPopup: boolean = false;

  plans: Plan[] = [
    { type: 'monthly', name: 'Monthly Plan', price: 60 },
    { type: 'annual', name: 'Annual Plan', price: 40, discount: 15 },
    { type: 'quarterly', name: 'Quarterly Plan', price: 50, discount: 10 }
  ];

  availableItems: any[] = [];

  constructor(private fb: FormBuilder ,  private router: Router) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadAvailableItems();
  }

  private initializeForm(): void {
    this.paymentForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      cardType: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      expiryDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/([0-9]{2})$')]],
      cvc: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
      country: ['', Validators.required],
      paymentType: ['course', Validators.required],
      totalAmount: [{ value: 0, disabled: true }],
      zipCode: [''],
      planType: ['monthly']
    });
  }

  private loadAvailableItems(): void {
    // Simulate API call to load items based on payment type
    this.availableItems = [
      { id: 1, name: 'Basic Course', price: 100 },
      { id: 2, name: 'Premium Course', price: 200 },
      // Add more items as needed
    ];
  }

  onPaymentTypeChange(event: any): void {
    this.paymentType = event.target.value;
    this.showItemSelection = ['course', 'subscription', 'Private Session'].includes(this.paymentType);
    this.updateFormValidation();
  }

  onPlanChange(planType: string): void {
    this.selectedPlan = planType;
    this.updateTotal();
  }

  updateFormValidation(): void {
    const totalAmountControl = this.paymentForm.get('totalAmount');
    const zipCodeControl = this.paymentForm.get('zipCode');

    if (this.paymentType === 'course') {
      totalAmountControl?.enable();
      zipCodeControl?.disable();
    } else if (this.paymentType === 'subscription') {
      totalAmountControl?.disable();
      zipCodeControl?.enable();
    } else {
      totalAmountControl?.disable();
      zipCodeControl?.disable();
    }
  }

  calculateTotal(): number {
    // Implement your total calculation logic here
    return 0;
  }

  updateTotal(): void {
    const total = this.calculateTotal();
    this.paymentForm.patchValue({ totalAmount: total });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.paymentForm.get(fieldName);
    return field ? (field.invalid && field.touched) : false;
  }

  resetForm(): void {
    this.paymentForm.reset();
    this.selectedItem = '';
    this.selectedPlan = '';
  }

  onSubmit(): void {
    if (this.paymentForm.valid && !this.isProcessing) {
      this.isProcessing = true;
      
      // Simulate payment processing
      this.processPayment(this.paymentForm.value)
        .then(() => {
          this.showPaymentSuccess();
        })
        .catch((error) => {
          console.error('Payment failed:', error);
          this.showPaymentError();
        })
        .finally(() => {
          this.isProcessing = false;
        });
    } else {
      this.markFormGroupTouched(this.paymentForm);
    }
  }

  private processPayment(paymentDetails: any): Promise<void> {
    // Simulate API call to payment gateway
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Generate random transaction ID
        this.transactionId = 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase();
        resolve();
      }, 2000); // Simulate 2 second processing time
    });
  }

  showPaymentSuccess(): void {
    this.showSuccessPopup = true;
  }

  showPaymentError(): void {
    // Implement error handling here
    alert('Payment failed. Please try again.');
  }

  closeSuccessPopup(): void {
    this.showSuccessPopup = false;
    this.resetForm();
    // Optionally redirect to another page
    // this.router.navigate(['/dashboard']);
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
