import { Component, OnInit } from '@angular/core';
import { Coach } from '../../models/coach.model';
import { CoachService } from '../../services/coach.service';

@Component({
  selector: 'app-coach-list',
  templateUrl: './coach-list.component.html',
  styleUrls: ['./coach-list.component.css']
})
export class CoachListComponent implements OnInit {
  coaches: Coach[] = [];
  isModalOpen = false;
  selectedCoach: Coach | null = null;

  constructor(private coachService: CoachService) {}

  ngOnInit(): void {
    this.fetchCoaches();
  }

  fetchCoaches(): void {
    this.coachService.getCoaches().subscribe(
      (data) => {
        this.coaches = data;
        
      },
      (error) => {
        console.error('Erreur lors de la récupération des coachs:', error);
      }
    );
  }

  

  selectCoach({ coachId, action }: { coachId: string; action: string }) {
    console.log(coachId, '-------------', action);
    if (action === 'select') {
      
      const selectedCoach = this.coaches.find(coach => coach.id === coachId);
      if (selectedCoach) {
        this.selectedCoach = selectedCoach;
        this.isModalOpen = true;
      } else {
        this.selectedCoach = null;
      }
    }
    else if (action === 'remove') {
      this.coachService.removeCoach(coachId).subscribe(
        () => {
          console.log('Coach supprimé avec succès');
          this.fetchCoaches();
        },
        (error: any) => {
          console.error('Erreur lors de la suppression du coach:', error);
        }
      );
  
    }
  }


  closeModal() {
    this.isModalOpen = false;
    this.selectedCoach = null;
  }
}
