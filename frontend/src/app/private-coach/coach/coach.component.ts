import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Coach } from '../../models/coach.model';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.css'],
})
export class CoachComponent {
  @Input() coach!: Coach;
  @Output() select = new EventEmitter<{ coachId: string; action: string }>();

  constructor(private auth: AuthService) {}
  currentRole: string = '';
  ngOnInit() {
    const userRole = this.auth.getCurrentUserRole();
    this.currentRole = userRole!;
  }
  isClient(): boolean {
    return this.currentRole === 'client';
  }
  isCoach(): boolean {
    return this.currentRole === 'coach';
  }
  isAdmin(): boolean {
    return this.currentRole === 'manager';
  }

  selectCoach() {
    this.select.emit({coachId : this.coach.id, action : 'select'});
    console.log(
      `Coach sélectionné : ${this.coach.name} (ID: ${this.coach.id})`
    );
  }

  removeCoach() {
    this.select.emit({ coachId: this.coach.id, action: 'remove' });
    console.log(
      `Coach sélectionné : ${this.coach.name} (ID: ${this.coach.id})`
    );
  }
}
