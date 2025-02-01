import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular';

// Material Modules
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

// Components
import { CoachComponent } from './private-coach/coach/coach.component';
import { CoachListComponent } from './private-coach/coach-list/coach-list.component';
import { RequestCardComponent } from './private-coach/request-card/request-card.component';
import { ReservationCardComponent } from './private-coach/reservation-card/reservation-card.component';
import { ClassFormComponent } from './class-management/class-form/class-form.component';
import { CourseComponent } from './class-management/course/course.component';
import { CourseDetailsComponent } from './class-management/course-details/course-details.component';
import { CoursePageComponent } from './class-management/course-page/course-page.component';
import { CourseManagementComponent } from './components/course-management/course-management.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppComponent } from './app.component';

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
import { CalendarComponent } from './calendar/calendar.component';

// Services
import { CourseService } from './services/course.service';

@NgModule({
  declarations: [
    AppComponent,
    CoachComponent,
    CoachListComponent,
    RequestCardComponent,
    ReservationCardComponent,
    ClassFormComponent,
    CourseComponent,
    CourseDetailsComponent, 
    CoursePageComponent,
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
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FullCalendarModule,
    // Material Modules
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    AppRoutingModule,
    // RouterModule.forRoot(routes),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggerInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
