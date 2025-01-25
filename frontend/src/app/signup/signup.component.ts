import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  currentStep = 1;
  submitted = false;

  goals = [
    'Weight Loss',
    'Muscle Gain',
    'General Fitness',
    'Strength Training',
    'Flexibility',
  ];

  showPassword: boolean = false;


  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      basicDetails: this.fb.group({
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$')]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
        gender: ['', Validators.required],
        age: [
          '',
          [Validators.required, Validators.min(16), Validators.max(100)],
        ],
        height: [
          '',
          [Validators.required, Validators.min(100), Validators.max(250)],
        ],
        weight: [
          '',
          [Validators.required, Validators.min(30), Validators.max(300)],
        ],
      }),
      membershipDetails: this.fb.group({
        goal: ['', Validators.required],
      }),
    });
  }

  get f() {
    return this.signupForm.controls;
  }
  get basicDetails() {
    return this.signupForm.get('basicDetails') as FormGroup;
  }
  get membershipDetails() {
    return this.signupForm.get('membershipDetails') as FormGroup;
  }

  nextStep() {
    if (this.currentStep === 1) {
      Object.keys(this.basicDetails.controls).forEach((key) => {
        const control = this.basicDetails.get(key);
        control?.markAsTouched();
      });

      if (this.basicDetails.valid) {
        this.currentStep++;
      } else {
        console.log('Form errors:', this.basicDetails.errors);
      }
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.currentStep === 2) {
      Object.keys(this.membershipDetails.controls).forEach((key) => {
        const control = this.membershipDetails.get(key);
        control?.markAsTouched();
      });
    }

    if (this.signupForm.valid) {
      console.log('Form submitted:', this.signupForm.value);
      this.currentStep++;
    }
  }

  exit() {
    console.log('Exiting signup process');
  }

  isFieldInvalid(formGroup: FormGroup, fieldName: string): boolean {
    const field = formGroup.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getGoalIcon(goal: string): string {
    const icons: { [key: string]: string } = {
      'Weight Loss': 'fas fa-weight-scale',
      'Muscle Gain': 'fas fa-dumbbell',
      'General Fitness': 'fas fa-heart',
      'Strength Training': 'fas fa-fist-raised',
      Flexibility: 'fas fa-child',
    };
    return icons[goal] || 'fas fa-target';
  }

  getGoalDescription(goal: string): string {
    const descriptions: { [key: string]: string } = {
      'Weight Loss':
        'Achieve your ideal weight through targeted exercises and nutrition plans',
      'Muscle Gain':
        'Build strength and muscle mass with professional guidance',
      'General Fitness':
        'Improve overall health and maintain an active lifestyle',
      'Strength Training':
        'Enhance power and endurance through specialized training',
      Flexibility:
        'Increase mobility and reduce injury risk through stretching routines',
    };
    return descriptions[goal] || '';
  }

  selectGoal(goal: string) {
    this.membershipDetails.get('goal')?.setValue(goal);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
