import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuizzService } from 'src/app/Service/Quizz/quizz.service';

@Component({
  selector: 'app-add-question-pool',
  templateUrl: './add-question-pool.component.html',
  styleUrls: ['./add-question-pool.component.scss'],
})
export class AddQuestionPoolComponent implements OnInit {
  constructor(
    public addQuestionPoll: MatDialogRef<AddQuestionPoolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public poolsv: QuizzService
  ) {}
  dataQuestion: [];
  rdDataQuestion: any;
  number: any;
  progress: boolean = true;
  idpart: any;
  idsubject: any;
  idquestion: any = [];
  ngOnInit(): void {
    console.log('add questionpool', this.data);
    this.idpart = this.data.idPart;
    this.idsubject = this.data.idSubject;
    this.poolsv.getQuestionbySubjectId(this.idsubject).subscribe((respone) => {
      console.log('list question ', respone);
      this.dataQuestion = respone.Data.Questions;
      this.progress = false;
      console.log('dataquestion', this.dataQuestion);
    });
  }
  onCancelClick() {
    this.addQuestionPoll.close();
  }
  checkIdQuestion(item) {
    this.idquestion.push(item);

    console.log('Idquestion', this.idquestion);
  }
  getQuestionbyID(idqs) {
    this.idquestion.map((idqs) => {
      this.poolsv.getQuestionbyID(idqs).subscribe((respone) => {
        this.poolsv
          .createQuestionbypool(idqs, this.idpart)
          .subscribe((data) => {
            console.log('aa', data);
          });
      });
    });
  }
  //ramdom
  RandomQuestion() {
    if (this.number < this.dataQuestion.length) {
      for (let i = 1; i <= this.number; i++) {
        let rdDataQuestion = this.dataQuestion[
          (Math.random() * this.dataQuestion.length) | this.number
        ];
        console.log('add', rdDataQuestion);
        this.poolsv
          .createQuestionbypool(rdDataQuestion['ID'], this.idpart)
          .subscribe((data) => {
            console.log(data);
          });
      }
    }
  }
  AddQuestionPool() {
    this.getQuestionbyID(this.idquestion);
    this.RandomQuestion();
    this.addQuestionPoll.close();
  }
}
