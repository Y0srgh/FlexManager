import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  ngOnInit(): void {
    AOS.init({
      duration: 1000, 
      once: false,     
    });}
  showNavbar = true;
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      const hiddenRoutes = ['/','/#home','/#coach','/#pricing','/#testimonials','/#why-choose-us','/#stats','/#nutritionists','/signup', '/signin' ,'/register','/signup/sportsman','/signup/parent']; 
      this.showNavbar = !hiddenRoutes.includes(this.router.url);
      const currentRoute = this.router.url.split('?')[0];
console.log("current route", currentRoute);

      // Set navbar visibility
      this.showNavbar = !hiddenRoutes.includes(currentRoute);
    });
  }
 
}