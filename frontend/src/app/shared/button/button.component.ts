import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() backgroundColor: string = "var(--color-2)"; 
  @Input() textColor: string = "white";          
  @Input() buttonText: string = 'Click Me'; 
  @Input() buttonType: string = 'primary';   
  @Input() type: string = 'button';   
  @Input() icon: string = '';   
  @Output() buttonClick = new EventEmitter<void>(); 

  handleClick(): void {
    this.buttonClick.emit();
  }
}
