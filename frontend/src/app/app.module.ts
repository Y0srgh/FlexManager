import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoachComponent } from './private-coach/coach/coach.component';
import { CoachListComponent } from './private-coach/coach-list/coach-list.component';
import { RequestCardComponent } from './private-coach/request-card/request-card.component';


@NgModule({
  declarations: [
    AppComponent,
    CoachComponent,
    CoachListComponent,
    RequestCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
