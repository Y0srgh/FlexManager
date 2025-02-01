import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { CourseManagementComponent } from './components/course-management/course-management.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppComponent } from './app.component';
import { CoachComponent } from './private-coach/coach/coach.component';
import { CoachListComponent } from './private-coach/coach-list/coach-list.component';
import { RequestCardComponent } from './private-coach/request-card/request-card.component';
import {ReservationCardComponent} from './private-coach/reservation-card/reservation-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';


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
import { ButtonComponent } from './shared/button/button.component';
import { SignupComponent } from './signup/signup.component';
import { CalendarComponent } from './calendar/calendar.component';

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

import { ClassFormComponent } from './class-management/class-form/class-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {CourseComponent} from './class-management/course/course.component'
import {CourseDetailsComponent} from './class-management/course-details/course-details.component'
import { Course } from './models/course.model';
import {CoursePageComponent} from './class-management/course-page/course-page.component'
import { CourseService } from './services/course.service'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




@NgModule({
  declarations: [
    AppComponent,
    CourseManagementComponent, 
    CourseFormComponent,       
    SidebarComponent, HeaderComponent, HeroComponent, StatsComponent, WhyChooseUsComponent, CoachesComponent, NutritionistsComponent, PricingComponent, TestimonialsComponent, FooterComponent, LayoutComponent, ButtonComponent, SignupComponent,     CoachComponent,
    CoachListComponent,
    RequestCardComponent,
    ReservationCardComponent,
    CalendarComponent,       ,
    ClassFormComponent,
    CourseComponent,
    CourseDetailsComponent, 
    CoursePageComponent,
    
    

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule, 
    MatFormFieldModule,
    MatInputModule,
    AppRoutingModule,
    // RouterModule.forRoot(routes),
 
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FullCalendarModule, 
    MatDatepickerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
  
    
  ],

  providers: [CourseService],
  bootstrap: [AppComponent],
})
export class AppModule { 
 
}