import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { PaymentComponent } from './pages/payment/payment.component'; 
import { MembershipPageComponent } from './pages/membership-page/membership-page.component';
import { SuccessComponent } from './pages/payment/success/success.component';
import { FailedComponent } from './pages/payment/failed/failed.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ClientComponent } from './client/client.component';
import { JoinOptionsComponent } from './join-options/join-options.component';
import { SignupParentComponent } from './signup-parent/signup-parent.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { SitePaymentComponent } from './site-payment/site-payment.component';

const routes: Routes = [
  { path: 'subscription', component: MembershipPageComponent},
  { path: 'payment', component: PaymentComponent },
  { path: 'success', component: SuccessComponent}, 
  { path: 'failed', component: FailedComponent }   , 
  {path :"chat",component: ChatroomComponent},
  {path : "manage-subscription",component : SitePaymentComponent},
  {path : '', component: LayoutComponent },
  { path: 'signup/sportsman', component: SignupComponent },
  { path: 'signup/parent', component: SignupParentComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'client', component: ClientComponent },
  { path: 'register', component: JoinOptionsComponent },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes,{useHash:false}), 
  ],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
