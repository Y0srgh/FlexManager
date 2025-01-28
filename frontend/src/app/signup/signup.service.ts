import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor() { }

  isFieldInvalid(formGroup: FormGroup, fieldName: string): boolean {    
    const field = formGroup.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  togglePasswordVisibility(showPassword: boolean): boolean {
    return !showPassword;
  }

  previousStep(currentStep: number): number {
    return currentStep > 1 ? currentStep-- : currentStep;
  }
}
