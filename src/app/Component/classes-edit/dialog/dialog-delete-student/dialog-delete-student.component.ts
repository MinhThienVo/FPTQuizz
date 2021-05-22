import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClassesService } from 'src/app/Service/Classes/classes.service';

@Component({
  selector: 'app-dialog-delete-student',
  templateUrl: './dialog-delete-student.component.html',
  styleUrls: ['./dialog-delete-student.component.scss'],
})
export class DialogDeleteStudentComponent implements OnInit {
  firstName: any;
  lastName: any;
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ClassesService
  ) {
    this.firstName = data['account']['FirstName'];
    this.lastName = data['account']['LastName'];
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  removeStudent(): void {
    this.api.deleteStudent(this.data['ID']).subscribe(
      (result) => {
        console.log(result);
        this.dialogRef.close(this.data);
      },
      (error) => {
        this.dialogRef.close();
      }
    );
  }
}
