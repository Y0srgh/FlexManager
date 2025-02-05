import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Course } from '../../models/course.model';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.css']
})
export class ClassFormComponent implements OnInit, OnDestroy {
  @Output() closeModal = new EventEmitter<void>();
  @Output() courseAdded = new EventEmitter<any>()
  courseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private overlayContainer: OverlayContainer,
    private snackBar: MatSnackBar
  ) {
    this.courseForm = this.fb.group(
      {
        title: ['', Validators.required],
        description: ['', Validators.required],
        date: [null, [Validators.required, this.dateValidator.bind(this)]], 
        capacity: ['', Validators.required] ,
        startTime: [null, Validators.required],
        endTime: [null, Validators.required],
      },
      {
        validators: this.timeValidator.bind(this)
      }
    );
  }

  ngOnInit(): void {
  
    const formContainer = document.querySelector('.form-container');
    if (formContainer) {
      this.overlayContainer.getContainerElement().classList.add('form-container');
    }
  }

  ngOnDestroy(): void {
  
    this.overlayContainer.getContainerElement().classList.remove('form-container');
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
      const courseData = this.courseForm.value;

      this.http.post('http://localhost:3000/courses', courseData).subscribe(
        (response) => {

          console.log('Course submitted successfully:', response);
          this.snackBar.open('Class added successfully!', 'close', {
            duration: 3000, 
            verticalPosition: 'top', 
            horizontalPosition: 'right',  
            panelClass: 'custom-snackbar',
          });
          this.courseAdded.emit(response);
          this.courseForm.reset();
          this.closeModal.emit(); 
        },
        (error) => {
          console.error('Error submitting course:', error);
          this.snackBar.open('Error adding class', 'close', {
            duration: 3000, 
            verticalPosition: 'top', 
            horizontalPosition: 'right',  
            panelClass: 'custom-snackbar',
          });
        
        }
      );
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