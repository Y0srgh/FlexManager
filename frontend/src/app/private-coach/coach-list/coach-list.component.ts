import { Component } from '@angular/core';
import { Coach } from '../../models/coach.model';

@Component({
  selector: 'app-coach-list',
  templateUrl: './coach-list.component.html',
  styleUrls: ['./coach-list.component.css']
})
export class CoachListComponent {
  coaches: Coach[] = [
    new Coach(7, 'Midou', 'Aerobic Instructor', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-C_UAhXq9GfuGO452EEzfbKnh1viQB9EDBQ&s'),
    new Coach(1, 'Rayen Timoumi', 'Fitness Trainer', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1_699OIlro1Us8yuRGDpgO1q1Tj2dIIeJQA&s'),
    new Coach(2, 'Mohamed ben Mohamed', 'Yoga Instructor', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-C_UAhXq9GfuGO452EEzfbKnh1viQB9EDBQ&s'),
    new Coach(3, 'Testt Testt', 'Boxing Coach', 'https://www.abc-coach-sportif.com/_next/image/?url=https%3A%2F%2Fwp.abc-coach-sportif.com%2Fwp-content%2Fuploads%2F2023%2F08%2FABC-coach-sportif-paris-75.jpg&w=3840&q=100'),
    new Coach(4, 'Roua Timoumi', 'Fitness Trainer', 'https://www.abc-coach-sportif.com/_next/image/?url=https%3A%2F%2Fwp.abc-coach-sportif.com%2Fwp-content%2Fuploads%2F2023%2F08%2FABC-coach-sportif-paris-75.jpg&w=3840&q=100'),
    new Coach(5, 'Test Test', 'Fitness Trainer', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1_699OIlro1Us8yuRGDpgO1q1Tj2dIIeJQA&s'),
    new Coach(6, 'Ahmed ben Ahmed', 'Yoga Instructor', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-C_UAhXq9GfuGO452EEzfbKnh1viQB9EDBQ&s'),
  ];

  isModalOpen = false;
  selectedCoach: Coach | null = null;

  selectCoach(coachId: number) {
    const selectedCoach = this.coaches.find(coach => coach.id === coachId);
    if (selectedCoach) {
      this.selectedCoach = selectedCoach;
      this.isModalOpen = true;  
    } else {
      this.selectedCoach = null;  
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedCoach = null;
  }
}