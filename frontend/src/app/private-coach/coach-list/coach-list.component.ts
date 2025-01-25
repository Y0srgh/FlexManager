import { Component } from '@angular/core';

@Component({
  selector: 'app-coach-list',
  templateUrl: './coach-list.component.html',
  styleUrls: ['./coach-list.component.css']
})
export class CoachListComponent {
  coaches = [
    { name: 'Rayen Timoumi', specialty: 'Fitness Trainer', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1_699OIlro1Us8yuRGDpgO1q1Tj2dIIeJQA&s' },
    { name: 'Mohamed ben Mohamed', specialty: 'Yoga Instructor', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-C_UAhXq9GfuGO452EEzfbKnh1viQB9EDBQ&s' },
    { name: 'testt testt', specialty: 'Boxing Coach', image: 'https://www.abc-coach-sportif.com/_next/image/?url=https%3A%2F%2Fwp.abc-coach-sportif.com%2Fwp-content%2Fuploads%2F2023%2F08%2FABC-coach-sportif-paris-75.jpg&w=3840&q=100' },
    { name: 'Roua timoumi', specialty: 'Fitness Trainer', image: 'https://www.abc-coach-sportif.com/_next/image/?url=https%3A%2F%2Fwp.abc-coach-sportif.com%2Fwp-content%2Fuploads%2F2023%2F08%2FABC-coach-sportif-paris-75.jpg&w=3840&q=100' },
    { name: 'test test', specialty: 'Fitness Trainer', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1_699OIlro1Us8yuRGDpgO1q1Tj2dIIeJQA&s' },
    { name: 'Ahmed ben Ahmed', specialty: 'Yoga Instructor', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-C_UAhXq9GfuGO452EEzfbKnh1viQB9EDBQ&s' },
  ];
  selectCoach(coach: { name: string, specialty: string, image: string }) {
    console.log(`${coach.name} selected`);
  }
}
