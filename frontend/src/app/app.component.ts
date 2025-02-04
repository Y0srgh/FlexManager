import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  showNavbar = true;
  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      const hiddenRoutes = ['/signup', '/signin' ,'/']; 
      this.showNavbar = !hiddenRoutes.includes(this.router.url);
    });
  }
 
}