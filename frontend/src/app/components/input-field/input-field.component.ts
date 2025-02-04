import { Component, Input } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { SignupService } from '../../signup/signup.service';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.css',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
})
export class InputFieldComponent {
  @Input() label!: string;
  @Input() type: string = 'text';
  @Input() iconClass!: string;
  @Input() controlName!: string;
  @Input() basicDetails!: FormGroup;
  @Input() showPassword: boolean = false;



  constructor(private signupService: SignupService) {}

  isFieldInvalid(formGroup: FormGroup, fieldName: string): boolean {
    return this.signupService.isFieldInvalid(formGroup, fieldName);
  }

  togglePasswordVisibility() {
    this.showPassword = this.signupService.togglePasswordVisibility(this.showPassword);
  }
}
