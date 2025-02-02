import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { SitePaymentComponent } from './site-payment/site-payment.component';
const routes: Routes = [
  {path :"chat",component: ChatroomComponent},
  {path : "manage-subscription",component : SitePaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
