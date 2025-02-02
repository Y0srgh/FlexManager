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
    if (currentStep > 1) {
      return currentStep -1;
    }else{
      return currentStep;
    }
  }

  nextStep(currentStep: number, basicDetails: FormGroup): number {
    if (currentStep === 1) {
      Object.keys(basicDetails.controls).forEach((key) => {
        const control = basicDetails.get(key);
        control?.markAsTouched();
      });

      if (basicDetails.valid) {
        currentStep++;
      } else {
        console.log('Form errors:', basicDetails.errors);
      }
    }
    return currentStep;
  }
}
