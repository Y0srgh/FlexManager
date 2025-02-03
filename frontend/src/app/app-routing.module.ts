import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './pages/payment/payment.component'; 
import { MembershipPageComponent } from './pages/membership-page/membership-page.component';


const routes: Routes = [
  
  { path: 'subscription', component: MembershipPageComponent},
  { path: 'payment', component: PaymentComponent },
  { path: '**', redirectTo: '/subscription', pathMatch: 'full' }, 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{useHash:false}), 
  ],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
