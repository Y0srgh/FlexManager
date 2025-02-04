import { Component } from '@angular/core';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrl: './coaches.component.css'
})
export class CoachesComponent {
  coaches = [
    { name: 'John Doe', image: '/assets/coach1.png', title: 'Expert Nutritionist', delay: 0 },
    { name: 'Jane Smith', image: '/assets/coach2.png', title: 'Fitness Guru', delay: 300 },
    { name: 'Jane Smith', image: '/assets/coach2.png', title: 'Fitness Guru', delay: 400 },
    { name: 'Jane Smith', image: '/assets/coach2.png', title: 'Fitness Guru', delay: 500 }
  ];
}
