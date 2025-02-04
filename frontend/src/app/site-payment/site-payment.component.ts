import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/Userservice/user.service';
import { SessionService } from '../services/sessionManager/session.service';
import { SitePaymentService } from '../services/site-payment/site-payment.service';
import JwtResponse from '../model/JwtResponse';

@Component({
  selector: 'app-site-payment',
  templateUrl: './site-payment.component.html',
  styleUrl: './site-payment.component.css'
})
export class SitePaymentComponent implements OnInit {
  User_plan : string ="PRO";
  UserSession! : JwtResponse | null;
  daysleft : number =1;
  user : any = {siteSubscriptions: {subscription_active:true}};
  barvalue: number = 25;
  subscription_active : boolean = false
  constructor (
    private userService : UserService,
    private sessionService : SessionService,
    private sitePaymentService : SitePaymentService,
  ){}
  ngOnInit(): void {
     this.UserSession =this.sessionService.getUserDetails();
     if (this.UserSession){
      this.userService.getUserById(this.UserSession.id).subscribe((User)=>{
        this.user=User
      })
     }
     if (this.user.siteSubscription){
      this.subscription_active=this.user.siteSubscription.isActive;
     }

    console.log(this.user);
    this.User_plan=this.user.siteSubscriptions.plan || "FREETRIAL";
    this.daysleft=this.sitePaymentService.getDaysSinceSubscription(this.user.siteSubscriptions || 0);
    this.barvalue=Math.floor(100*this.daysleft/30)
  }

  upgradePayment(plan : string){
    console.log(plan);
     this.sitePaymentService.HandlePayment(plan).subscribe((data : any)=>{
      window.open(data.redirectUrl,"_blank");
    }); 
    }

  sendtoStripeManagement(){
    console.log('Redirecting to Stripe Management...');
    window.location.href = 'https://billing.stripe.com/p/login/test_7sI4i8e8gbKA7x6fYY';
  }
}
