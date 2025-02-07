import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoachService } from './coach.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-coach',
  templateUrl: './add-coach.component.html',
  styleUrls: ['./add-coach.component.scss']
})
export class AddCoachComponent implements OnInit {
  coachForm!: FormGroup;
  isSubmitting = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private coachService: CoachService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.coachForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['coach'],
      // password: [
      //   '',
      //   [
      //     Validators.required,
      //     Validators.minLength(6),
      //     Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$'),
      //   ],
      // ],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      expertise: ['', Validators.required],
      certifications: ['', Validators.required],
      isPrivate: [false]
    });
  }

  onSubmit(): void {
    if (this.coachForm.valid) {
      this.isSubmitting = true;
      this.coachService.createCoach(this.coachForm.value).subscribe({
        next: (response) => {
          this.snackBar.open('Coach added successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          this.router.navigate(['/coaches']); 
        },
        error: (error) => {
          this.isSubmitting = false;
          this.snackBar.open(error.message || 'Failed to add coach', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }
      });
    } else {
      this.markFormGroupTouched(this.coachForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.coachForm.get(controlName);
    if (control?.hasError('required')) {
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required`;
    }
    if (control?.hasError('email')) {
      return 'Invalid email address';
    }
    if (control?.hasError('minlength')) {
      return `Minimum length is ${control.errors?.['minlength'].requiredLength} characters`;
    }
    // if (control?.hasError('pattern')) {
    //   if (controlName === 'password') {
    //     return 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character';
    //   }
    //   if (controlName === 'phone') {
    //     return 'Phone number must contain at least 8 digits';
    //   }
    // }
    return '';
  }
}
