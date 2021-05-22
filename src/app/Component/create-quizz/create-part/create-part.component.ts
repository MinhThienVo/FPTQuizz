import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { CollectionService } from '../../../Service/Collection/collection.service';
import { QuizzService } from 'src/app/Service/Quizz/quizz.service';
import { CreateQuizzComponent } from '../create-quizz.component';
@Component({
  selector: 'app-create-part',
  templateUrl: './create-part.component.html',
  styleUrls: ['./create-part.component.scss'],
})
export class CreatePartComponent implements OnInit {
  part = '';

  constructor(
    public createPart: MatDialogRef<CreatePartComponent>,
    public createquizz: QuizzService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private quizzService: QuizzService
  ) {}
  userID = '';
  token = '';
  datapart;
  quizid = this.data.IdQuizz;
  ngOnInit(): void {}

  onCancelClick() {
    this.createPart.close();
  }
  // getListPart(quizid) {
  //   this.quizzService.getMyPart(quizid).subscribe((partqs) => {
  //     this.datapart = partqs.Data.Parks;
  //     console.log('list part', this.datapart);
  //   });
  // }
  onCreateClick() {
    const createParts = {
      next: (x) => console.log('create-part successfully'),
      error: (err) => console.log(err),
    };
    let PartSubmit = {
      Name: this.part,
      NumberQuestion: 1000,
      QuizzID: this.data.IdQuizz,
    };
    this.createquizz.createPartservice(PartSubmit).subscribe((createParts) => {
      console.log('create part: ', createParts);
      this.createPart.close({
        ID: createParts.Data.Part.ID,
        Name: createParts.Data.Part.Name,
      });
    });
    console.log('Part: ', PartSubmit);

    // this.getListPart(this.quizid);
  }
}
