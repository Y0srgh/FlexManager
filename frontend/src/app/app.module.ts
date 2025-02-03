import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Overlay } from '@angular/cdk/overlay';
import { MAT_DATEPICKER_SCROLL_STRATEGY } from '@angular/material/datepicker';
import { inject } from '@angular/core';
// Material Modules
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

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
import { ClientComponent } from './client/client.component';
import { JoinOptionsComponent } from './join-options/join-options.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CourseManagementComponent } from './components/course-management/course-management.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { CoachComponent } from './private-coach/coach/coach.component';
import { CoachListComponent } from './private-coach/coach-list/coach-list.component';
import { RequestCardComponent } from './private-coach/request-card/request-card.component';
import { ReservationCardComponent } from './private-coach/reservation-card/reservation-card.component';
import { ClassFormComponent } from './class-management/class-form/class-form.component';
import { CourseComponent } from './class-management/course/course.component';
import { CourseDetailsComponent } from './class-management/course-details/course-details.component';
import { CoursePageComponent } from './class-management/course-page/course-page.component';
import { RequestPageComponent} from './private-coach/request-page/request-page.component';

// Interceptors
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { ButtonComponent } from './components/shared/button/button.component';

@NgModule({
  declarations: [
    AppComponent,
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
    CoursePageComponent,
    RequestPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FullCalendarModule,
    // Material Modules
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggerInterceptor, multi: true },
    { provide: MAT_DATEPICKER_SCROLL_STRATEGY,
      useFactory: () => {
        const overlay = inject(Overlay);
        return () => overlay.scrollStrategies.reposition();
      }}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
