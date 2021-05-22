import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuizzService } from 'src/app/Service/Quizz/quizz.service';

@Component({
  selector: 'app-edit-part',
  templateUrl: './edit-part.component.html',
  styleUrls: ['./edit-part.component.scss'],
})
export class EditPartComponent implements OnInit {
  partname: any;
  idPart: any;
  idquizz: any;
  name: any;
  constructor(
    public editPart: MatDialogRef<EditPartComponent>,
    public edtPart: QuizzService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    console.log('Get ID Part', this.data.id);
    this.idPart = this.data.id;
    this.edtPart.getPartbyID(this.idPart).subscribe((result) => {
      this.name = result.Data.ListPart.Name;
      this.idquizz = result.Data.ListPart.QuizzID;
      console.log(result);
    });
  }
  onCancelClick(): void {
    this.editPart.close();
  }
  onUpdateClick(): void {
    const editpart = {
      next: (x) => console.log('create-part successfully'),
      error: (err) => console.log(err),
    };
    let PartSubmit = {
      ID: this.idPart,
      Name: this.partname,
      NumberQuestion: 1000,
      Order: 1,
      QuizzID: this.idquizz,
    };
    this.edtPart.editPart(PartSubmit).subscribe((data) => {
      console.log('edit part', data);
      this.editPart.close({
        Name: data.Data.Part.Name,
      });
    });
  }
}
