import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component'; 
import { CoursePageComponent } from './class-management/course-page/course-page.component';
import { HeroComponent } from './components/hero/hero.component';
import { StatsComponent } from './components/stats/stats.component';
import { WhyChooseUsComponent } from './components/why-choose-us/why-choose-us.component';
import { CoachesComponent } from './components/coaches/coaches.component';
import { NutritionistsComponent } from './components/nutritionist/nutritionist.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ClientComponent } from './client/client.component';
import { JoinOptionsComponent } from './join-options/join-options.component';
import { CoachListComponent } from './private-coach/coach-list/coach-list.component';
import {RequestPageComponent} from './private-coach/request-page/request-page.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
  { path: '', component: LayoutComponent },
  { path: 'signup/sportsman', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'client', component: ClientComponent },
  { path: 'register', component: JoinOptionsComponent },
  { path: 'course', component: CoursePageComponent },
  { path: 'coaches', component: CoachListComponent },
  { path: 'requests', component: RequestPageComponent },
  { path: 'home', component: HomeComponent }, 
  { path: 'dashboard', component: DashboardComponent }, 
  { path: 'calendar', component: CalendarComponent }, 
];


  


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
