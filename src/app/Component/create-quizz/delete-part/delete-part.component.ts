import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuizzService } from 'src/app/Service/Quizz/quizz.service';
@Component({
  selector: 'app-delete-part',
  templateUrl: './delete-part.component.html',
  styleUrls: ['./delete-part.component.scss'],
})
export class DeletePartComponent implements OnInit {
  datapart = [];
  name: any;
  idpart: any;
  idquizz: any;
  constructor(
    public delPart: MatDialogRef<DeletePartComponent>,
    public deletepart: QuizzService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    console.log('Get ID Part', this.data);
    this.idpart = this.data.id;
    this.deletepart.getPartbyID(this.idpart).subscribe((result) => {
      this.name = result.Data.ListPart.Name;
      this.idquizz = result.Data.ListPart.QuizzID;
      console.log(result);
    });
    // this.deletepart.getMyPart(this.idquizz).subscribe((a) => {});
  }
  onCancelClick(): void {
    this.delPart.close();
  }
  onDeleteClick(id): void {
    this.deletepart.deletePart(this.idpart).subscribe((data) => {
      alert('Delete part successfully !!!');
      console.log(data);
    });
    console.log('Da xoa part ID la ' + this.idpart);

    // this.deletepart.getMyPart(this.idquizz);
    this.delPart.close();
  }
}
