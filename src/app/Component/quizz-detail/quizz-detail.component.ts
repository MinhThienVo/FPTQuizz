import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizzService } from 'src/app/Service/Quizz/quizz.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-quizz-detail',
  templateUrl: './quizz-detail.component.html',
  styleUrls: ['./quizz-detail.component.scss'],
})
export class QuizzDetailComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private QuizzService: QuizzService,
    private location: Location
  ) {}
  ChoosePart: any;
  ckAnswer: boolean = true;
  progress_load: boolean = true;
  disableButtonStart: boolean = true;
  CheckTrueAnswer: boolean;
  listAnserTrue: any = [];
  scoreHide: boolean = false;
  score: number = 0;
  disableRadio: boolean = true;
  progress_bar_answer: boolean;
  parram;
  Description: any;
  NumberQuestion: any;
  numberQuestioninPart: any;
  Time: any;
  Tags: any[];
  dataQuestion: any[];
  nameQuizz: any;
  idQuizz: any;
  dataPart: any[];
  idPart: any;
  dataquestion: any[];
  ngOnInit(): void {
    this.parram = this.router.params.subscribe((params) => {
      this.idQuizz = params['item.ID'];
      // this.nameQuizz = params['item.Name'];
      console.log(this.idQuizz);
    });

    this.QuizzService.getMyPart(this.idQuizz).subscribe((data) => {
      this.dataPart = data.Data.Parks;
      console.log(data);
    });
    // this.QuizzService.getQuestionbyIDQuizz(this.idQuizz).subscribe((data) => {
    //   this.progress_bar_answer = false;
    //   this.dataQuestion = data.Data.ListQuestion;
    //   console.log('data Question', this.dataQuestion);
    // });
    this.QuizzService.getQuizzbyIDQuizz(this.idQuizz).subscribe((quizz) => {
      // console.log(quizz);
      this.progress_load = false;
      this.NumberQuestion = quizz.Data.QuizDetail.NumberQuestion;
      this.Time = quizz.Data.QuizDetail.Time;
      this.Description = quizz.Data.QuizDetail.Description;
      this.Tags = quizz.Data.QuizDetail.Tags;
      this.nameQuizz = quizz.Data.QuizDetail.Name;
      // console.log(this.Tags);
    });
  }
  ScrollQuestion() {
    var elmnt = document.getElementById('scroll');
    elmnt.scrollIntoView();
  }
  StartExam() {
    this.disableRadio = false;
    this.scoreHide = false;
    this.score = 0;
    let allInp = document.getElementsByTagName('input');
    for (let i = 0; i < allInp.length; i++) {
      if (allInp[i].type == 'radio') {
        allInp[i].checked = false;
        this.listAnserTrue = [''];
      }
    }
  }
  CheckAnswer() {
    // this.disableRadio = true;
    this.disableButtonStart = true;
  }
  getNumberbyPartId() {
    this.QuizzService.getPartbyID(this.idPart).subscribe((data) => {
      this.numberQuestioninPart = data.Data.ListPart.NumberQuestion;
      console.log(data);
    });
  }
  changeIPart(iD) {
    this.scoreHide = false;
    this.progress_bar_answer = true;
    this.idPart = iD;
    console.log(this.idPart);
    this.QuizzService.getQuestionbyPartId(this.idPart).subscribe((data) => {
      this.dataquestion = data.Data.Question;
      this.progress_bar_answer = false;
      this.disableButtonStart = false;
    });
    this.getNumberbyPartId();
  }
  changeCheckbox(istrue) {
    console.log(this.listAnserTrue);
    this.score = this.listAnserTrue.filter((item) => item == true).length;
    console.log(this.score);
    // if (istrue === true) {
    //   this.score++;
    // }
  }
  submitQuizz() {
    this.disableRadio = true;
    this.scoreHide = true;
    this.ckAnswer = false;
  }
  againQuizz() {
    this.disableButtonStart = false;
    // this.disableRadio = false;
    this.scoreHide = false;
    this.score = 0;
    let allInp = document.getElementsByTagName('input');
    for (let i = 0; i < allInp.length; i++) {
      if (allInp[i].type == 'radio') {
        allInp[i].checked = false;
        this.listAnserTrue = [''];
      }
    }
  }
  back() {
    this.location.back();
  }
}
