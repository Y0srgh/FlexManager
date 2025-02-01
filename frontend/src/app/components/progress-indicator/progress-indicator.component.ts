import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-indicator',
  templateUrl: './progress-indicator.component.html',
  styleUrl: './progress-indicator.component.css'
})
export class ProgressIndicatorComponent {
 @Input() currentStep: number = 1;
 @Input() totalSteps: number = 3;

 get progressWidth(): number {
   return (this.currentStep / 3) * 100 ;
 }
}
