import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GymPrices } from 'src/enums/gymPlan';
import { SitePaymentService } from 'src/app/services/site-payment/site-payment.service';
interface Plan {
  type: string;
  name: string;
  discount?: number;
  key : string;
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  paymentForm!: FormGroup;
  planPrices : any[]=[] ;
  paymentType: string = '';
  selectedItem: string = '';
  selectedPlan: string ="";
  showItemSelection: boolean = false;
  transactionId: string = '';
  isProcessing: boolean = false;
  showErrorPopup: boolean = false;
  planMode: string ="subscription" ;
    


  plans: Plan[] = [
    { type: 'monthly', name: 'Monthly Plan',key : "ONEMONTHMEMBERSHIP"},
    { type: 'annual', name: 'Annual Plan', discount: 15,key : "ONEYEARMEMBERSHIP" },
    { type: 'quarterly', name: 'Quarterly Plan', discount: 10,key :"ONEQUARTER" }
  ];

  availableItems: any[] = [];

  constructor(private fb: FormBuilder,
     private router: Router,
     private sitePaymentService : SitePaymentService) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadAvailableItems();
    this.LoadPrices();
    console.log("initial",this.selectedPlan)
  }

  private initializeForm(): void {
    this.paymentForm = this.fb.group({
      paymentType: ['', Validators.required], 
      planType: ['monthly', Validators.required]
    });
  }

  private loadAvailableItems(): void {
    this.availableItems = [
      { id: 1, name: 'Basic Course', price: 100,"key" :"BASICCOURSE" },
      { id: 2, name: 'Premium Course', price: 200,"key":"PREMIUMCOURSE" }
    ];
  }
  LoadPrices(){
    Object.entries(GymPrices).forEach(([key,priceId]) => {

      this.sitePaymentService.getRealPrice(priceId).subscribe((priceDetails) => {
        console.log("------------------",priceDetails);
        this.planPrices.push({"name": key,...priceDetails});
        console.log(this.planPrices);

      });
      
    });
  }
  onPaymentTypeChange(event: any): void {
    this.paymentType = event.target.value;
    this.showItemSelection = ['course', 'subscription', 
      // 'Private Session'
    ].includes(this.paymentType);
  }
  handlePayment(){
    
    if(this.selectedPlan ===""){
      this.selectedPlan="ONEMONTHMEMBERSHIP"
    };
    this.sitePaymentService.HandlePayment(this.selectedPlan,this.planMode).subscribe((data : any)=>{
      window.open(data.redirectUrl,"__blank")
    });
    
  }
  onPlanChange(planType: any) {
    this.selectedPlan = planType.key;
    this.planMode="subscription"
    console.log("-------- plan selection",planType);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.paymentForm.get(fieldName);
    return field ? (field.invalid && field.touched) : false;
  }

  resetForm(): void {
    this.paymentForm.reset({ paymentType: '', planType: 'monthly' });
    this.selectedItem = '';
    // this.selectedPlan = '';
  }

  private processPayment(paymentDetails: any): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.transactionId = 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase();
        resolve();
      }, 2000);
    });
  }


  
  OncourseSelect(){
    this.planMode="payment"
    this.selectedPlan=this.selectedItem;
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  getPrice(key :any){
    return this.planPrices.find((planPrice)=>planPrice.name==key).unit_amount/100;
  }
}
