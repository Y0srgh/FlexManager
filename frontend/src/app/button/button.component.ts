import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() backgroundColor: string = '#007bff'; // Default background color
  @Input() textColor: string = '#fff';          // Default text color
  @Input() buttonText: string = 'Click Me';     // Default button text
  @Output() buttonClick = new EventEmitter<void>(); // Event emitter for click

  handleClick(): void {
    this.buttonClick.emit(); // Emit event when the button is clicked
  }
}