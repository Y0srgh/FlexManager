import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoachComponent } from './private-coach/coach/coach.component';
import { CoachListComponent } from './private-coach/coach-list/coach-list.component';
import { RequestCardComponent } from './private-coach/request-card/request-card.component';
import {ReservationCardComponent} from './private-coach/reservation-card/reservation-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    MatDatepickerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    
  ],
  providers: [CourseService],
  bootstrap: [AppComponent]
})
export class AppModule { 
 
}
