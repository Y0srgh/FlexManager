import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';import { FormsModule } from '@angular/forms';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { ChatroomComponent } from './chatroom/chatroom.component';

import { ButtonComponent } from './button/button.component';
import { SitePaymentComponent } from './site-payment/site-payment.component';
import { SitePaymentService } from './services/site-payment/site-payment.service';
@NgModule({
  declarations: [
    ButtonComponent,
    ChatroomComponent,
    AppComponent,
    TimeAgoPipe,
    SitePaymentComponent,

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [SitePaymentService],
  bootstrap: [AppComponent]
})
export class AppModule { }