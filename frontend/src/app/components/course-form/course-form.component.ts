import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './course-form.component.html',
})
export class CourseFormComponent {
  @Output() create = new EventEmitter<Course>();
  @Output() update = new EventEmitter<Course>();

  courseForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.courseForm = this.fb.group({
      id: [null],
      title: [''],
      description: [''],
      duration: [0],
    });
  }

  onSubmit(): void {
    const courseData = this.courseForm.value;
    if (this.courseForm.valid) {
      if (courseData.id) {
        this.update.emit(courseData);
      } else {
        this.create.emit(courseData);
      }
      this.courseForm.reset();
    }
  }
}
