import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';import { FormsModule } from '@angular/forms';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { ChatroomComponent } from './chatroom/chatroom.component';

import { ButtonComponent } from './button/button.component';
@NgModule({
  declarations: [
    ButtonComponent,
    ChatroomComponent,
    AppComponent,
    TimeAgoPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }