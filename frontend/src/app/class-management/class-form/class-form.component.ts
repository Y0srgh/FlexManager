import { Component , Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.css']
})
export class ClassFormComponent {
  @Output() closeModal = new EventEmitter<void>();
  courseForm: FormGroup;
 

  constructor(private fb: FormBuilder) {
    this.courseForm = this.fb.group(
      {
        title: ['', Validators.required],
        description: ['', Validators.required],
        date: [null, [Validators.required, this.dateValidator.bind(this)]], 
        startTime: [null, Validators.required],
        endTime: [null, Validators.required],
      },
      {
        validators: this.timeValidator.bind(this)
      }
    );
  }

 
  dateValidator(control: any) {
    const date = control.value;
    console.log('Date:', date);
    if (date) {
      const isValid = !isNaN(Date.parse(date));
      if (!isValid) {
        return { matDatepicker: true }; 
      }
    }
    return null;
  }

 
  timeValidator(group: FormGroup) {
    const startTime = group.get('startTime')?.value;
    const endTime = group.get('endTime')?.value;
    console.log('Start Time:', startTime);

    if (startTime && endTime) {
      const start = this.timeToMinutes(startTime);
      const end = this.timeToMinutes(endTime);
      if (start >= end) {
        group.get('endTime')?.setErrors({ invalidTime: true });
      } else {
        group.get('endTime')?.setErrors(null);
      }
    }
    return null;
  }

  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(num => parseInt(num, 10));
    return hours * 60 + minutes;
  }

 
  onSubmit() {
    this.courseForm.reset();
    
  }

  
  onCancel() {
    this.courseForm.reset();
   
  }
  

 
  get isFormValid() {
    return this.courseForm.valid && 
           !this.courseForm.get('endTime')?.hasError('invalidTime');

  }


    
  
}
