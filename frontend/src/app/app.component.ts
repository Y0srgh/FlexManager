import { Component } from '@angular/core';
import AOS from 'aos';
import { ChatroomComponent } from "./chatroom/chatroom.component";
import { SitePaymentComponent } from "./site-payment/site-payment.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  /* imports: [ChatroomComponent, SitePaymentComponent], */
})
export class AppComponent {
  title = 'frontend';
  ngOnInit(): void {
    AOS.init({
      duration: 1000, 
      once: false,     
    });
  }
}
