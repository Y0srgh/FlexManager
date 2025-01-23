import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachComponent } from './coach/coach.component';
import { CoachListComponent } from './coach-list/coach-list.component';



@NgModule({
  declarations: [
    CoachComponent,
    CoachListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PrivateCoachModule { }
