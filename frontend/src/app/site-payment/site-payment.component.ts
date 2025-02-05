import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/Userservice/user.service';
import { SessionService } from '../services/sessionManager/session.service';
import { SitePaymentService } from '../services/site-payment/site-payment.service';
import JwtResponse from '../model/JwtResponse';
import { an } from 'node_modules/@fullcalendar/core/internal-common';

@Component({
  selector: 'app-site-payment',
  templateUrl: './site-payment.component.html',
  styleUrl: './site-payment.component.css',
})
export class SitePaymentComponent implements OnInit {
  User_plan: string = 'Free plan';
  UserSession!: JwtResponse | null;
  CurrentSubscription: any;
  user: any = { siteSubscriptions: { subscription_active: true } };
  daysleft!: number;
  barvalue!: number;
  subscription_active: boolean = false;
  selectedPlan: string = '';
  popupVisible: boolean = false;
  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private sitePaymentService: SitePaymentService
  ) {}
  ngOnInit(): void {
    this.UserSession = this.sessionService.getUserDetails();
    if (this.UserSession) {
      this.userService.getUserById(this.UserSession.id).subscribe((User) => {
        this.user = User;
      });
    }
    this.getCurrentSubscription();

    console.log('this.CurrentSubscription[0]', this.CurrentSubscription);
  }

  upgradePayment(plan: string) {
    console.log(plan);
    this.sitePaymentService
      .HandlePayment(plan, 'payment')
      .subscribe((data: any) => {
        window.open(data.redirectUrl, '_blank');
      });
  }
  getCurrentSubscription() {
    this.sitePaymentService
      .getUserCurrentSubscription()
      .subscribe((subcription: any) => {
        console.log(
          'subscription ---------------------------------------',
          subcription
        );
        this.CurrentSubscription = subcription[subcription.length - 1];
        this.User_plan = subcription[subcription.length - 1].Plan;
        this.daysleft = this.calculateDaysPassed(
          subcription[subcription.length - 1].updatedAt
        );
        this.barvalue = ((this.daysleft-30) * 100) / 30 ;
        console.log('this.', this.barvalue);
        
        this.subscription_active = subcription[subcription.length - 1].isActive;
      });
  }

  calculateDaysPassed(date: string): number {
    const givenDate = new Date(date);
    const today = new Date();
    const differenceInMillis = today.getTime() - givenDate.getTime();
    const daysPassed = Math.floor(differenceInMillis / (1000 * 3600 * 24));
    console.log('days passed', daysPassed);
    
    return 30 - daysPassed;
  }

  sendtoStripeManagement() {
    console.log('Redirecting to Stripe Management...');
    window.location.href =
      'https://billing.stripe.com/p/login/test_7sI4i8e8gbKA7x6fYY';
  }

  selectPlan(plan: string): void {
    this.selectedPlan = plan;
    this.sitePaymentService
      .HandlePayment(plan, 'subscription')
      .subscribe((data: any) => {
        window.open(data.redirectUrl, '_blank');
      });
    // this.popupVisible = true;
  }

  goHome(): void {
    this.popupVisible = false;
    // Logique pour rediriger si nécessaire
    console.log('Returning to the homepage...');
  }
}
