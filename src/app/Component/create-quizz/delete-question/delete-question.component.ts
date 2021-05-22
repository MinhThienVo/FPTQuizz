import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuizzService } from 'src/app/Service/Quizz/quizz.service';
@Component({
  selector: 'app-delete-question',
  templateUrl: './delete-question.component.html',
  styleUrls: ['./delete-question.component.scss'],
})
export class DeleteQuestionComponent implements OnInit {
  datapart = [];
  name: any;
  idQuestion: any;
  idquizz: any;
  constructor(
    public delQuestion: MatDialogRef<DeleteQuestionComponent>,
    public deletequestion: QuizzService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    console.log('Get ID question', this.data);
    this.idQuestion = this.data.id;
    this.deletequestion.getQuestionbyID(this.idQuestion).subscribe((result) => {
      this.name = result.Data.Question.Content;
      // this.idquizz = result.Data.ListPart.QuizzID;
      console.log(result);
    });
  }
  onCancelClick(): void {
    this.delQuestion.close();
  }
  onDeleteClick(id): void {
    this.deletequestion.deleteQuestion(this.idQuestion).subscribe((data) => {});
    console.log('Da xoa question la ' + this.idQuestion);
    this.delQuestion.close();
  }
}
