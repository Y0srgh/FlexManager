import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachComponent } from './coach/coach.component';
import { CoachListComponent } from './coach-list/coach-list.component';
import { RequestCardComponent } from './request-card/request-card.component';



@NgModule({
  declarations: [
    CoachComponent,
    CoachListComponent,
    RequestCardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PrivateCoachModule { }
