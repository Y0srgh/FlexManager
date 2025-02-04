import { Component } from '@angular/core';
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
import { ChildAssociationService } from '../child-association/child-association.service';

@Component({
  selector: 'app-parent-child-association',
  templateUrl: './parent-child-association.component.html',
  styleUrl: './parent-child-association.component.css',
})
export class ParentChildAssociationComponent {
  signupForm!: FormGroup;
  linkChildren: boolean = true;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private baseService: BaseService,
    private signupService: SignupService,
    private childAssociationService : ChildAssociationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
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

  get f() {
    return this.signupForm.controls;
  }

  get associatedAccounts() {
    return this.signupForm.get('associatedAccounts') as FormGroup;
  }

  get children() {
    return this.associatedAccounts.get('children') as FormArray;
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

  asFormGroup(control: AbstractControl): FormGroup {
    if (!(control instanceof FormGroup)) {
      throw new Error('Control is not a FormGroup');
    }
    return control as FormGroup;
  }

  onSubmit() {
    this.submitted = true;
    this.linkChildren = false;
    console.log('submitting form...', this.associatedAccounts.value);

   this.baseService.post<any>('auth/request/associate-children',this.associatedAccounts.get('children')?.value).subscribe({
      next: (response: any) => {
        console.log('Children associated successfully:', response);
      },
      error: (error) => {
        console.error('Association failed:', error);
      },
    });
  }

  exit(){
    console.log('exitting');   
    this.router.navigate(['pending-child-request']); 
  }

  /*
    <app-child-association
          *ngIf="linkChildren === true"
          [associatedAccounts]="associatedAccounts"
          [children]="children"
          [asFormGroup]="asFormGroup"
          (submitForm)="onSubmit()"
        ></app-child-association>
  */
}
