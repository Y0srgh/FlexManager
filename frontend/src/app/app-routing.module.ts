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
import { PaymentComponent } from './pages/payment/payment.component';
import { MembershipPageComponent } from './pages/membership-page/membership-page.component';
import { SuccessComponent } from './pages/payment/success/success.component';
import { FailedComponent } from './pages/payment/failed/failed.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { JoinOptionsComponent } from './join-options/join-options.component';
import { CoachListComponent } from './private-coach/coach-list/coach-list.component';
import { RequestPageComponent } from './private-coach/request-page/request-page.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SignupParentComponent } from './signup-parent/signup-parent.component';
import { PendingRequestsComponent } from './pending-requests/pending-requests.component';
import { ParentChildAssociationComponent } from './parent-child-association/parent-child-association.component';
import { FitnessTrackerComponent } from './fitness-tracker/fitness-tracker.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AddCoachComponent } from './add-coach/add-coach.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { SitePaymentComponent } from './site-payment/site-payment.component';
import { RoleGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: 'signup/sportsman', component: SignupComponent },
  { path: 'signup/parent', component: SignupParentComponent },
  { path: 'signin', component: SigninComponent },
  { path: '', component: LayoutComponent },

  {
    path: 'subscription',
    component: MembershipPageComponent,
    canActivate: [RoleGuard],
    data: { roles: ['client'] },
  },
  { path: 'payment', component: PaymentComponent },
  { path: 'success', component: SuccessComponent },
  { path: 'failed', component: FailedComponent },
  { path: 'chat', component: ChatroomComponent },
  { path: 'manage-subscription', component: SitePaymentComponent },
  { path: 'register', component: JoinOptionsComponent },
  {
    path: 'tracker',
    component: FitnessTrackerComponent,
    canActivate: [RoleGuard],
    data: { roles: ['client'] },
  },
  {
    path: 'pending-child-request',
    component: PendingRequestsComponent,
    canActivate: [RoleGuard],
    data: { roles: ['parent', 'client'] },
  },
  {
    path: 'associate-child',
    component: ParentChildAssociationComponent,
    canActivate: [RoleGuard],
    data: { roles: ['parent'] },
  },
  { path: 'course', component: CoursePageComponent },
  {
    path: 'coaches',
    component: CoachListComponent,
    canActivate: [RoleGuard],
    data: { roles: ['manager','client'] },
  },
  {
    path: 'requests',
    component: RequestPageComponent,
    canActivate: [RoleGuard],
    data: { roles: ['coach'] },
  },
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [RoleGuard],
    // data: { roles: ['manager', 'coach', 'client', 'parent'] },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [RoleGuard],
    data: { roles: ['manager'] },
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [RoleGuard],
    data: { roles: ['coach', 'client'] },
  },
  {
    path: 'add-coach',
    component: AddCoachComponent,
    canActivate: [RoleGuard],
    data: { roles: ['manager'] },
  },

  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
