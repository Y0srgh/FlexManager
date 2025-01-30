import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon'; 


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoachComponent } from './private-coach/coach/coach.component';
import { CoachListComponent } from './private-coach/coach-list/coach-list.component';
import { RequestCardComponent } from './private-coach/request-card/request-card.component';
import {ReservationCardComponent} from './private-coach/reservation-card/reservation-card.component';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HomeComponent } from './home/home.component';
import { CardComponent } from './card/card.component';


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


import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    CourseManagementComponent, 
    CourseFormComponent,       
    SidebarComponent, HeaderComponent, HeroComponent, StatsComponent, WhyChooseUsComponent, CoachesComponent, NutritionistsComponent, PricingComponent, TestimonialsComponent, FooterComponent, LayoutComponent, ButtonComponent, SignupComponent,     CoachComponent,
    CoachListComponent,
    RequestCardComponent,
    ReservationCardComponent,
    CalendarComponent,       
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
    FullCalendarModule
    MatIconModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
