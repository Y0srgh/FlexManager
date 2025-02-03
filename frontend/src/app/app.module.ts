import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailsModalComponent } from './pages/membership-page/membership-list/details-dialog/details-modal/details-modal.component';
import { MemberShipComponent } from './pages/membership-page/membership-list/membership-list.component';
import { MembershipPageComponent } from './pages/membership-page/membership-page.component';

@NgModule({
  declarations: [
    AppComponent,
    PaymentComponent,
    MemberShipComponent,
    MembershipPageComponent,
    DetailsModalComponent,
  
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule ,
    MatDialogModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
