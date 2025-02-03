import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrl: './details-modal.component.css'
})
export class DetailsModalComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }
  ngOnInit(): void {
    console.log(this.data)
  }
  closeDetailsModal(): void {
    this.dialogRef.close();
  }
}
