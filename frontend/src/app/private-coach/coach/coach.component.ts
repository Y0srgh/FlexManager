import { Component } from '@angular/core';

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.css']
})
export class CoachComponent {
  coach = {
    name: 'Fawzi Benzarti',
    specialty: 'Fitness Coach',
    image: 'https://thumbs.dreamstime.com/b/m-coach-20854003.jpg' 
  };

  selectCoach() {
    console.log(`${this.coach.name} has been selected!`);
  }
}
