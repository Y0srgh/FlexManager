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
  constructor (
    // private userService : UserService,
    // private sessionService : SessionService,
    private sitePaymentService : SitePaymentService,
  ){}
  ngOnInit(): void {
    //   = this.sessionService.getUserDetails().subscribe((sessionData )=>{
  //     this.UserSession=sessionData  
  // })
  // this.userService.getUserById(this.UserSession.id).subscribe((User)=>{
    //   this.user=sender
    // })
    // this.User_plan=this.user.siteSubscriptions.plan || "FREETRIAL";
    // this.daysleft=this.sitePaymentService.getDaysSinceSubscription(this.user.siteSubscriptions);
    // this.barvalue=Math.floor(100*this.daysleft/30)
  }

  upgradePayment(plan : string){
    console.log("aaaaaaaaaaaaaaaaaaaa");
    //  this.sitePaymentService.HandlePayment(this.user.id,plan).subscribe((data : any)=>{
    //   console.log(data);
    // }); 
    }

  sendtoStripeManagement(){
    console.log('Redirecting to Stripe Management...');
    // window.location.href = 'https://billing.stripe.com/p/login/test_7sI4i8e8gbKA7x6fYY';
  }
}
