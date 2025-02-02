import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BaseService } from '../base/base.service';
import { SignupService } from '../signup/signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-parent',
  templateUrl: './signup-parent.component.html',
  styleUrl: './signup-parent.component.css',
})
export class SignupParentComponent {
  private readonly endpoint = 'auth/parent';

  signupForm!: FormGroup;
  currentStep = 1;
  submitted = false;

  showPassword: boolean = false;

  linkChildren: boolean = true;

  constructor(
    private fb: FormBuilder,
    private baseService: BaseService,
    private signupService: SignupService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      basicDetails: this.fb.group({
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$'),
          ],
        ],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      }),
      associatedAccounts: this.fb.group({
        associatedAccountsCount: [
          1,
          [
            Validators.required,
            Validators.pattern('^[1-9]{1}$'),
            Validators.min(1),
          ],
        ],
        children: this.fb.array([]),
      }),
    });

    this.associatedAccounts
      .get('associatedAccountsCount')
      ?.valueChanges.subscribe((count) => {
        this.updateChildEmailControls(+count || 0);
      });

    this.updateChildEmailControls(1);
  }
  get children() {
    return this.associatedAccounts.get('children') as FormArray;
  }

  get f() {
    return this.signupForm.controls;
  }
  get basicDetails() {
    return this.signupForm.get('basicDetails') as FormGroup;
  }
  get associatedAccounts() {
    return this.signupForm.get('associatedAccounts') as FormGroup;
  }

  private updateChildEmailControls(count: number) {
    const childrenArray = this.children;
    while (childrenArray.length) {
      childrenArray.removeAt(0);
    }

    if (count <= 9) {
      for (let i = 0; i < count; i++) {
        const childGroup = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
        });
        childrenArray.push(childGroup);
      }
    }
  }

  nextStep() {
    this.currentStep = this.signupService.nextStep(
      this.currentStep,
      this.basicDetails
    );
  }

  asFormGroup(control: AbstractControl): FormGroup {
    if (!(control instanceof FormGroup)) {
      throw new Error('Control is not a FormGroup');
    }
    return control as FormGroup;
  }

  previousStep() {
    this.currentStep = this.signupService.previousStep(this.currentStep);
  }

  onSubmit() {
    this.submitted = true;
    this.linkChildren = false;
    console.log('submitting form...', this.associatedAccounts.value);

    const parentData = {
      ...this.basicDetails.value,
      associatedAccountsCount: this.associatedAccounts.get(
        'associatedAccountsCount'
      )?.value,
      childrenEmails: this.associatedAccounts
        .get('children')
        ?.value.map((child: { email: string }) => child.email),
    };
    console.log('parentData---------------', parentData);

    this.baseService.post(`${this.endpoint}`, parentData).subscribe({
      next: (response: any) => {
        console.log('Parent created successfully:', response);
        // this.router.navigate(['signin']);
      },
      error: (error) => {
        console.error('Signup failed:', error);
      },
    });
  }

  exit() {
    this.router.navigate(['signin']);
  }

  isFieldInvalid(formGroup: FormGroup, fieldName: string): boolean {
    return this.signupService.isFieldInvalid(formGroup, fieldName);
  }

  onLinkChild() {
    console.log('link children');
    this.linkChildren = true;
    this.currentStep++;
  }

  skipChildLinking() {
    this.linkChildren = false;
    this.signupForm
      .get('associatedAccounts.associatedAccountsCount')
      ?.setValue(0);
    const parentData = {
      ...this.basicDetails.value,
      associatedAccountsCount: 0,
      childrenEmails: [],
    };
    console.log('parentData---------------', parentData);

    this.baseService.post(`${this.endpoint}`, parentData).subscribe({
      next: (response: any) => {
        console.log('Parent created successfully:', response);
      },
      error: (error) => {
        console.error('Signup failed:', error);
      },
    });
    this.currentStep++;
  }
}
