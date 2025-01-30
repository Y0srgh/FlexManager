import { Component } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {
  stats = [
    { value: '5+', description: 'Years of Service', duration: 500 },
    { value: '10k+', description: 'Happy Members', duration: 1000 },
    { value: '50+', description: 'Certified Nutritionists', duration: 1500 }
  ];
}