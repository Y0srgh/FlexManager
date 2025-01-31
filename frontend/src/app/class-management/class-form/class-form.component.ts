import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.css']
})
export class ClassFormComponent {
  courseForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.courseForm = this.fb.group(
      {
        title: ['', Validators.required],
        description: ['', Validators.required],
        duration: [null, [Validators.required, Validators.min(1)]],
        date: [null, Validators.required],
        startTime: [null, Validators.required],
        endTime: [null, Validators.required],
        coachName: ['', Validators.required],
        coachPhone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      },
      {
        validators: this.timeValidator.bind(this) 
      }
    );
  }

 
  timeValidator(group: FormGroup) {
    const startTime = group.get('startTime')?.value;
    const endTime = group.get('endTime')?.value;

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
    if (this.courseForm.valid) {
      console.log('Form Data:', this.courseForm.value);
    } else {
      console.error('Form is invalid');
    }
  }

 
  onCancel() {
    this.courseForm.reset();
  }

 
  get isFormValid() {
    return this.courseForm.valid && 
           !this.courseForm.get('endTime')?.hasError('invalidTime');
  }
}
