import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-progress-form-dialog',
  template: `
    <h2 mat-dialog-title>Add New {{ data.metricName }} Record</h2>
    <mat-dialog-content>
      <form [formGroup]="progressForm">
        <mat-form-field appearance="fill">
          <mat-label>Value</mat-label>
          <input matInput type="number" formControlName="value">
          <mat-error *ngIf="progressForm.get('value')?.hasError('required')">
            Value is required
          </mat-error>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" (click)="onSubmit()" [disabled]="!progressForm.valid">
        Save
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-form-field {
      width: 100%;
      margin-bottom: 1rem;
    }
    form {
      min-width: 300px;
    }
  `]
})
export class ProgressFormDialogComponent {
  progressForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProgressFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { metricName: string }
  ) {
    this.progressForm = this.fb.group({
      value: [0, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.progressForm.valid) {
      console.log(this.progressForm.value, this.data);
      const metric = {value : this.progressForm.value, name : this.data}
      this.dialogRef.close(metric);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
