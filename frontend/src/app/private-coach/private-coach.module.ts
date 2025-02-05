import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachComponent } from './coach/coach.component';
import { CoachListComponent } from './coach-list/coach-list.component';
import { RequestCardComponent } from './request-card/request-card.component';
import { RequestPageComponent } from './request-page/request-page.component';
import { ReservationCardComponent } from './reservation-card/reservation-card.component';



@NgModule({
  declarations: [
    CoachComponent,
    // CoachListComponent,
    RequestCardComponent,
    // ReservationCardComponent,
    // RequestPageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PrivateCoachModule { }
