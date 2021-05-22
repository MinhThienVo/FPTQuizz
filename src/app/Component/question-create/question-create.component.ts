import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { QuizzService } from 'src/app/Service/Quizz/quizz.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DeleteQuestionComponent } from '../create-quizz/delete-question/delete-question.component';
import { AddQuestionPoolComponent } from '../create-quizz/add-question-pool/add-question-pool.component';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.scss'],
})
export class QuestionCreateComponent implements OnInit {
  data = [];
  ScrollDetailQuestion() {
    var elmnt = document.getElementById('scrollDetail');
    elmnt.scrollIntoView();
  }
  ScrollQuestion() {
    var elmnt = document.getElementById('scroll');
    elmnt.scrollIntoView();
    this.GetQuestionByQuestionID();
    this.progress_bar_answer = true;
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
  constructor(
    private route: ActivatedRoute,
    private quizzService: QuizzService,
    public http: HttpClient,
    public dialog: MatDialog
  ) {}
  IDSUB: any;
  nameSub: any;
  ngOnInit(): void {
    this.truyen = this.route.params.subscribe((params) => {
      this.IDSUB = params['node.ID'];
      this.nameSub = params['node.Name'];
      this.questionnew.SubjectID = params['node.ID'];
    });
    console.log('Id: ', this.IDSUB, 'name', this.nameSub);
  }
  questionnew = {
    Content: '',
    Image: 'image',
    Sound: 'sould',
    SubjectID: '',
    ListAnswer: [
      {
        Content: '',
        IsTrueAnswer: false,
        QuestionID: 0,
      },
      {
        Content: '',
        IsTrueAnswer: false,
        QuestionID: 0,
      },
      {
        Content: '',
        IsTrueAnswer: false,
        QuestionID: 0,
      },
      {
        Content: '',
        IsTrueAnswer: false,
        QuestionID: 0,
      },
    ],
  };
  // table
  tblquestion: any;
  openDialogAddQuestionPool() {
    const QuestionPool = this.dialog
      .open(AddQuestionPoolComponent, {
        width: '100%',
        data: { idSubject: this.questionnew.SubjectID },
      })
      .afterClosed()
      .subscribe(() => {
        // this.GetQuestionbyPartId(this.idpart);
      });
  }
  displayedColumns: string[] = ['No', 'Question', 'symbol'];
  // dataSource = new MatTableDataSource(this.table);
  applyFilter(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  config = {
    placeholder: '',
    tabsize: 2,
    height: '100px',
    uploadImagePath: '/api/upload',
    toolbar: [
      // ['misc', ['codeview', 'undo', 'redo']],
      ['style', ['bold', 'italic', 'underline', 'clear']],
      // [
      //   'font',
      //   [
      //     'bold',
      //     'italic',
      //     'underline',
      //     'strikethrough',
      //     'superscript',
      //     'subscript',
      //     'clear',
      //   ],
      // ],
      // ['fontsize', ['fontname', 'fontsize', 'color']],
      // ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['picture', 'link', 'video']],
    ],
    fontNames: [
      'Helvetica',
      'Arial',
      'Arial Black',
      'Comic Sans MS',
      'Courier New',
      'Roboto',
      'Times',
    ],
  };
  indexEdit: any;
  dataSource: any[];
  progress_bar_answer: boolean = false;
  tieude: any;
  truyen: any;
  questionerro = new FormControl('', [Validators.required]);
  idquestion: any;
  fileImage: any;
  fileaudio: any;
  question: '';
  ErroMessage = 'You must enter a value';
  ErroMessages() {
    if (this.questionerro.hasError('required')) {
      return 'You must enter a value';
    }
  }
  checkAnswerTrue(indexTrue) {
    this.questionnew.ListAnswer.map((item, index) => {
      if (index != indexTrue) {
        item.IsTrueAnswer = false;
      }
    });
  }
  removeAnswer(index) {
    this.questionnew.ListAnswer.splice(index, 1);
    console.log('delete success ');
  }
  addQuestion() {
    const createQuestions = {
      next: (x) => console.log('create-question successfully'),
      error: (err) => console.log(err),
    };
    console.log('Submit', this.questionnew);
    if (this.questionnew['ID'] == undefined) {
      this.progress_bar_answer = true;
      this.quizzService
        .createQuestion(this.questionnew)
        .subscribe((res: any) => {
          console.log(res);
          this.GetQuestionByQuestionID();
        });
    } else {
      this.quizzService
        .EditQuestion(this.questionnew)
        .subscribe((createQuestionPart: any) => {
          this.idquestion = createQuestionPart.Data.Question.ID;
          this.dataSource[this.indexEdit] = createQuestionPart.Data.Question;
          //
          this.dataSource = [...this.dataSource];
          this.progress_bar_answer = false;
        });
      //
    }
    this.resetDataQuestion();
  }
  //resetdata
  resetDataQuestion() {
    this.questionnew = {
      Content: '',
      Image: 'image',
      Sound: 'sould',
      SubjectID: this.IDSUB,
      ListAnswer: [
        {
          Content: '',
          IsTrueAnswer: false,
          QuestionID: 0,
        },
        {
          Content: '',
          IsTrueAnswer: false,
          QuestionID: 0,
        },
        {
          Content: '',
          IsTrueAnswer: false,
          QuestionID: 0,
        },
        {
          Content: '',
          IsTrueAnswer: false,
          QuestionID: 0,
        },
      ],
    };
  }
  addAnswer() {
    this.questionnew.ListAnswer.push({
      Content: '',
      IsTrueAnswer: false,
      QuestionID: 0,
    });
  }
  getQuestionbyID(idquestion) {
    this.quizzService
      .getQuestionbyIdQuestion(idquestion)
      .subscribe((response: any) => {
        //
        this.progress_bar_answer = false;
        // this.dataTable = question.Data.Question;
        console.log('getQuestionbyID', response.Data.Question);
        this.dataSource.push(response.Data.Question);
        console.log('getQuestionbyID', this.dataSource);
        this.dataSource = [...this.dataSource];
        // this.changeDetectorRefs.detectChanges();
      });
  }
  detailQuestion(id, index) {
    this.indexEdit = index;
    this.quizzService.getQuestionbyIdQuestion(id).subscribe((response: any) => {
      console.log('detail question', response.Data.Question);
      this.questionnew = response.Data.Question;
    });
  }
  GetQuestionByQuestionID() {
    this.quizzService
      .getQuestionbySubjectId(this.IDSUB)
      .subscribe((respone: any) => {
        console.log('list question ', respone);
        this.dataSource = respone.Data.Questions;
        this.progress_bar_answer = false;
      });
  }
  openDialogDeleteQuestion(id): void {
    const deleteQuestion = this.dialog.open(DeleteQuestionComponent, {
      width: '500px',
      data: { id },
    });
    deleteQuestion.afterClosed().subscribe(() => {
      this.GetQuestionByQuestionID();
    });
  }
}
