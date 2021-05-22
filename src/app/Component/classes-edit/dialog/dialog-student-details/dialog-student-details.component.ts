import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-student-details',
  templateUrl: './dialog-student-details.component.html',
  styleUrls: ['./dialog-student-details.component.scss'],
})
export class DialogStudentDetailsComponent implements OnInit {
  firstName: any;
  lastName: any;
  constructor(
    public dialogRef: MatDialogRef<DialogStudentDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.firstName = data['account']['FirstName'].trim();
    this.lastName = data['account']['LastName'].trim();
  }

  ngOnInit(): void {}
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
