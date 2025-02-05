import { Component, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { BaseService } from '../base/base.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  constructor(
      private baseService: BaseService
    ) {}
  private readonly endpoint = 'auth/signin';

  showPassword: boolean = false;

  signinForm!: FormGroup;

  ngOnInit() {
    this.signinForm = new FormGroup({
      signinDetails: new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
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

    console.log('Form value:', this.signinForm.value);
    if (this.signinForm.valid) {
      localStorage.removeItem('accessToken');
      this.baseService.post(`${this.endpoint}`, this.signinDetails.value).subscribe({
        next: (response: any) => {
          console.log('Signin successful:', response);
          //after 1s
          setTimeout(() => {
            localStorage.setItem('accessToken',response.accessToken);
             window.location.href = '/home';
          }, 1000);
        },
        error: (error) => {
          console.error('Signin failed:', error);
        },
      });
      
    }
  }
}
