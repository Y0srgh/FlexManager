import { Component } from '@angular/core';

@Component({
  selector: 'app-why-choose-us',
  templateUrl: './why-choose-us.component.html',
  styleUrl: './why-choose-us.component.css'
})
export class WhyChooseUsComponent {
  features = [
    { icon: 'fas fa-dumbbell', title: 'Top-notch Equipment', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', duration: 1000 },
    { icon: 'fas fa-heartbeat', title: 'Personalized Programs', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', duration: 1500 },
    { icon: 'fas fa-users', title: 'Expert Coaches', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', duration: 2000 }
  ];
}