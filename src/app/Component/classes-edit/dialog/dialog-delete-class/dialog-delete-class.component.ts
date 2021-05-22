import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClassesService } from 'src/app/Service/Classes/classes.service';

@Component({
  selector: 'app-dialog-delete-class',
  templateUrl: './dialog-delete-class.component.html',
  styleUrls: ['./dialog-delete-class.component.scss'],
})
export class DialogDeleteClassComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteClassComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ClassesService
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteClass(): void {
    console.log(this.data);

    this.api.deleteClass(this.data).subscribe(
      (resuft) => {
        console.log(resuft);
        this.dialogRef.close(1);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
