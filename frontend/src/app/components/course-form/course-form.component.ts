import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css'], // Add style file if needed
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
