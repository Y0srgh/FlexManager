import { Component, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  private readonly endpoint = 'auth/sign-in';

  showPassword: boolean = false;

  signinForm!: FormGroup;

  ngOnInit() {
    this.signinForm = new FormGroup({
      signinDetails: new FormGroup({
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$'),
        ]),
      }),
    });
  }
  get signinDetails() {
    return this.signinForm.get('signinDetails') as FormGroup;
  }

  onSubmit() {
    Object.keys(this.signinDetails.controls).forEach((key) => {
      const control = this.signinDetails.get(key);
      control?.markAsTouched();
    });
  }
}
