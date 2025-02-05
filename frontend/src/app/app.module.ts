import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { PaymentComponent } from './pages/payment/payment.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { CourseManagementComponent } from './components/course-management/course-management.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailsModalComponent } from './pages/membership-page/membership-list/details-dialog/details-modal/details-modal.component';
import { MemberShipComponent } from './pages/membership-page/membership-list/membership-list.component';
import { MembershipPageComponent } from './pages/membership-page/membership-page.component';
import { SuccessComponent } from './pages/payment/success/success.component';
import { FailedComponent } from './pages/payment/failed/failed.component';
import { SitePaymentComponent } from './site-payment/site-payment.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { StatsComponent } from './components/stats/stats.component';
import { WhyChooseUsComponent } from './components/why-choose-us/why-choose-us.component';
import { CoachesComponent } from './components/coaches/coaches.component';
import { NutritionistsComponent } from './components/nutritionist/nutritionist.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { ButtonComponent } from './components/shared/button/button.component';
import { SignupComponent } from './signup/signup.component';
import { ProgressIndicatorComponent } from './components/progress-indicator/progress-indicator.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { SigninComponent } from './signin/signin.component';
import { ClientComponent } from './client/client.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { JoinOptionsComponent } from './join-options/join-options.component';
import { SignupParentComponent } from './signup-parent/signup-parent.component';

// const routes: Routes = [
//   { path: '', component: HeroComponent },
//   { path: 'stats', component: StatsComponent },
//   { path: 'why-choose-us', component: WhyChooseUsComponent },
//   { path: 'coaches', component: CoachesComponent },
//   { path: 'nutritionnist', component: NutritionistsComponent },
//   { path: 'pricing', component: PricingComponent },
//   { path: 'testimonials', component: TestimonialsComponent },
//   { path: '**', redirectTo: '' }
// ];
import { SitePaymentService } from './services/site-payment/site-payment.service';
import { DatePipe } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    PaymentComponent,
    MemberShipComponent,
    MembershipPageComponent,
    DetailsModalComponent,
    SuccessComponent,
    FailedComponent,
    ChatroomComponent,
    TimeAgoPipe,
    CourseManagementComponent,
    CourseFormComponent,
    SidebarComponent,
    HeaderComponent,
    HeroComponent,
    StatsComponent,
    WhyChooseUsComponent,
    CoachesComponent,
    NutritionistsComponent,
    PricingComponent,
    TestimonialsComponent,
    FooterComponent,
    LayoutComponent,
    ButtonComponent,
    SignupComponent,
    ProgressIndicatorComponent,
    InputFieldComponent,
    SigninComponent,
    ClientComponent,
    JoinOptionsComponent,
    SignupParentComponent,
    ChatroomComponent,
    SitePaymentComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule ,
    MatDialogModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    AppRoutingModule,
    // RouterModule.forRoot(routes),
    DatePipe,
    MatIconModule
    ,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggerInterceptor, multi: true },
    SitePaymentService,
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
