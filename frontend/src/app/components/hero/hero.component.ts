import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  link = "/register";
  onGetStartedClick(){
    console.log("hello from get started");
    
  }
}
