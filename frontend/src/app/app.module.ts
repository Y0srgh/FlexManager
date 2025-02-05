import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { PaymentComponent } from './pages/payment/payment.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { Overlay } from '@angular/cdk/overlay';
import { MAT_DATEPICKER_SCROLL_STRATEGY } from '@angular/material/datepicker';
import { inject } from '@angular/core';
// Material Modules
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { CoachComponent } from './private-coach/coach/coach.component';
import { CoachListComponent } from './private-coach/coach-list/coach-list.component';
import { RequestCardComponent } from './private-coach/request-card/request-card.component';
import { ReservationCardComponent } from './private-coach/reservation-card/reservation-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HomeComponent } from './home/home.component';
import { CardComponent } from './card/card.component';
import { DetailsModalComponent } from './pages/membership-page/membership-list/details-dialog/details-modal/details-modal.component';
import { MemberShipComponent } from './pages/membership-page/membership-list/membership-list.component';
import { MembershipPageComponent } from './pages/membership-page/membership-page.component';
import { SuccessComponent } from './pages/payment/success/success.component';
import { FailedComponent } from './pages/payment/failed/failed.component';
import { SitePaymentComponent } from './site-payment/site-payment.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon, MatIconModule } from '@angular/material/icon';

// Components
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { StatsComponent } from './components/stats/stats.component';
import { WhyChooseUsComponent } from './components/why-choose-us/why-choose-us.component';
import { CoachesComponent } from './components/coaches/coaches.component';
import { NutritionistsComponent } from './components/nutritionist/nutritionist.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SignupComponent } from './signup/signup.component';
import { ProgressIndicatorComponent } from './components/progress-indicator/progress-indicator.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { SigninComponent } from './signin/signin.component';
import { CalendarComponent } from './calendar/calendar.component';

import { ClassFormComponent } from './class-management/class-form/class-form.component';
import { CourseComponent } from './class-management/course/course.component';
import { CourseDetailsComponent } from './class-management/course-details/course-details.component';
import { CoursePageComponent } from './class-management/course-page/course-page.component';
import { RequestPageComponent } from './private-coach/request-page/request-page.component';

// Interceptors
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { JoinOptionsComponent } from './join-options/join-options.component';
import { SignupParentComponent } from './signup-parent/signup-parent.component';
import { PendingRequestsComponent } from './pending-requests/pending-requests.component';
import { ChildAssociationComponent } from './child-association/child-association.component';
import { ParentChildAssociationComponent } from './parent-child-association/parent-child-association.component';
import { FitnessTrackerComponent } from './fitness-tracker/fitness-tracker.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ButtonComponent } from './components/shared/button/button.component';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CourseManagementComponent } from './components/course-management/course-management.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { ProgressFormDialogComponent } from './progress-form-dialog/progress-form-dialog.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AddCoachComponent } from './add-coach/add-coach.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SitePaymentService } from './services/site-payment/site-payment.service';
import { DatePipe } from '@angular/common';
@NgModule({
  declarations: [
    NavbarComponent,
    AppComponent,
    PaymentComponent,
    MemberShipComponent,
    MembershipPageComponent,
    DetailsModalComponent,
    SuccessComponent,
    FailedComponent,
    ChatroomComponent,
    TimeAgoPipe,
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
    JoinOptionsComponent,
    SignupParentComponent,
    PendingRequestsComponent,
    ChildAssociationComponent,
    ParentChildAssociationComponent,
    FitnessTrackerComponent,
    CalendarComponent,
    CourseManagementComponent,
    CourseFormComponent,
    CoachComponent,
    CoachListComponent,
    RequestCardComponent,
    ReservationCardComponent,
    ClassFormComponent,
    CourseComponent,
    CourseDetailsComponent,
    DashboardComponent,
    CardComponent,
    HomeComponent,
    CoursePageComponent,
    RequestPageComponent,
    ProgressFormDialogComponent,
    NotFoundComponent,
    AddCoachComponent,
    ChatroomComponent,
    SitePaymentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule ,
    HttpClientModule,
    FullCalendarModule,
    MatNativeDateModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    AppRoutingModule,
    // RouterModule.forRoot(routes),
    DatePipe,
    MatIconModule,
    MatDatepickerModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSnackBarModule,
MatIcon,
    MatProgressSpinnerModule,
    MatCheckboxModule
    ,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggerInterceptor, multi: true },
{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {
      provide: MAT_DATEPICKER_SCROLL_STRATEGY,
      useFactory: () => {
        const overlay = inject(Overlay);
        return () => overlay.scrollStrategies.reposition();
      }},
          provideAnimationsAsync(),
    SitePaymentService,
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
