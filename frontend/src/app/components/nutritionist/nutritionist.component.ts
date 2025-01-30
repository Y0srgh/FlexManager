import { Component } from '@angular/core';

@Component({
  selector: 'app-nutritionists',
  templateUrl: './nutritionists.component.html',
  styleUrl: './nutritionists.component.css'
})
export class NutritionistsComponent {
  nutritionists = [
    { name: 'Mike Tyson', image: 'nutritionnist1.png', delay: 0 },
    { name: 'Ronda Rousey', image: 'nutritionnist2.png', delay: 300 }
  ];
}
