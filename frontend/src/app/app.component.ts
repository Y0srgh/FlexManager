import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    this.router.events.subscribe(() => {
      const hiddenRoutes = ['/signup', '/signin' ,'/','/signup/sportsman','/signup/parent','/register']; 
      this.showNavbar = !hiddenRoutes.includes(this.router.url);
    });
  }
 
}