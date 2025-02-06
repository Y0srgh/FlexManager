import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.css']
})
export class ClassFormComponent implements OnInit, OnDestroy {
  @Output() closeModal = new EventEmitter<void>();
  @Output() courseAdded = new EventEmitter<any>();

  courseForm: FormGroup;
  isDropdownOpen = false;
  selectedDays: string[] = [];
  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private overlayContainer: OverlayContainer,
              private snackBar: MatSnackBar) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      daysOfWeek: [[], Validators.required],
      capacity: ['', Validators.required],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required],
    }, {
      validators: this.timeValidator.bind(this)
    });
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

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleDaySelection(day: string): void {
    const index = this.selectedDays.indexOf(day);
    if (index === -1) {
      this.selectedDays.push(day);
    } else {
      this.selectedDays.splice(index, 1);
    }
    this.courseForm.patchValue({ daysOfWeek: this.selectedDays });
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
      console.log('Data to be sent:', courseData);

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
