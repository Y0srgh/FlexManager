import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
import { PendingRequestsComponent } from './pending-requests/pending-requests.component';
import { ChildAssociationComponent } from './child-association/child-association.component';

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

@NgModule({
  declarations: [
    AppComponent,
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
    PendingRequestsComponent,
    ChildAssociationComponent,
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
    MatIconModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggerInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
