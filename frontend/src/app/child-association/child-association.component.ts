import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-child-association',
  templateUrl: './child-association.component.html',
  styleUrls: ['./child-association.component.css'],
})
export class ChildAssociationComponent {
  @Input() associatedAccounts!: FormGroup;
  @Input() children!: FormArray;
  @Input() asFormGroup!: (control: AbstractControl) => FormGroup;
  linkChildren : boolean = true;

  @Output() buttonClick = new EventEmitter<void>(); 

  onSubmit() {
    this.buttonClick.emit();
  }
}

  