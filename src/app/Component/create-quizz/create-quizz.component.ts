import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { QuizzService } from 'src/app/Service/Quizz/quizz.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { CreatePartComponent } from './create-part/create-part.component';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTableDataSource } from '@angular/material/table';
import { MatStepper } from '@angular/material/stepper';
import { EditPartComponent } from './edit-part/edit-part.component';
import { DeletePartComponent } from './delete-part/delete-part.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DeleteQuestionComponent } from './delete-question/delete-question.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AddQuestionPoolComponent } from './add-question-pool/add-question-pool.component';
export class Tables {
  id: '';
  Content: string;
  ListAnswer: [{}];
  symbol: string;
}
export class FoodNode {
  ID: string;
  Name: string;
  childNodes?: FoodNode[];
}
export class ExampleFlatNode {
  expandable: boolean;
  Name: string;
  level: number;
}
export class Fruit {
  Content: string;
}
@Component({
  selector: 'app-create-quizz',
  templateUrl: './create-quizz.component.html',
  styleUrls: ['./create-quizz.component.scss'],
})
export class CreateQuizzComponent implements OnInit {
  public files: any[];
  /////

  ////
  quizzstate: any;
  ///convert json listsubject
  listSubject = [];
  listNumber = ['5', '10', '15', '20', '25', '30', '60', '120', '180'];
  data = [];
  idquestion: any;
  idquizz: any;
  subject: '';
  IdSubject: '';
  userid = '';
  loaibai: any;
  fileImage: any;
  chipList: [];
  tieude: '';
  time: number;
  mota: '';
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  qaaaa = false;
  IsPrivate = false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: Fruit[] = [{ Content: 'toeic' }, { Content: 'thi thptqg' }];
  giaithich: '';
  nameSubject: '';
  hidediv = false;
  isLinear = true;
  hide = false;
  erromessagename: boolean = false;
  progress_bar: boolean = false;
  progress_bar_answer: boolean = false;
  //config của ngx-summernote
  config = {
    placeholder: '',
    tabsize: 2,
    height: '100px',
    // uploadImagePath: '/src/assets',
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
  ///steper
  IDSUB: any;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  idpart = '';
  datapart = [];
  datasub = [];
  dataTable: Tables[] = [];
  dataTree: FoodNode[] = [];
  ngOnInit(): void {
    this.userid = localStorage.getItem('userid');
    console.log('userid ', this.userid);
    this.quizzService.getMySubject().subscribe((subject) => {
      console.log('API get allsubject', subject);
      this.listSubject = subject.Data.listSubject;
      //gan datasub = list subjgect nè
      //build-tree-from-json-array-of-objects
      //https://stackoverflow.com/questions/60389393/build-tree-from-json-array-of-objects
      this.datasub = subject.Data.listSubject;
      const flatArray = (arr) => {
        return arr.reduce((flat, toFlatten) => {
          return flat.concat(
            Array.isArray(toFlatten) ? flatArray(toFlatten) : toFlatten
          );
        }, []);
      };
      const makeTree = (dataset) => {
        let hashTable = Object.create(null);
        dataset.forEach(
          (aData) => (hashTable[aData.ID] = { ...aData, childNodes: [] })
        );
        dataset.forEach((aData) => {
          if (aData.SubjectParent_ID)
            hashTable[aData.SubjectParent_ID].childNodes.push(
              hashTable[aData.ID]
            );
          else this.dataTree.push(hashTable[aData.ID]);
        });
        return this.dataTree;
      };
      this.dataTree = makeTree(flatArray(this.datasub));
      console.log('Data Tree ', this.dataTree);
      this.datasourceTree.data = this.dataTree;
    });
  }

  ///
  addQuestionInPool(id) {
    this.IDSUB = id;
    console.log(this.IDSUB);
  }
  ScrollQuestion() {
    var elmnt = document.getElementById('scroll');
    elmnt.scrollIntoView();
    this.GetQuestionbyPartId(this.idpart);
  }
  ScrollDetailQuestion() {
    var elmnt = document.getElementById('scrollDetail');
    elmnt.scrollIntoView();
  }
  //add remove tag
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push({ Content: value.trim() });
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  remove(fruit: Fruit): void {
    const index = this.tags.indexOf(fruit);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
  //load subject to form
  _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.childNodes && node.childNodes.length > 0,
      ID: node.ID,
      Name: node.Name,
      level: level,
    };
  };
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.childNodes
  );
  datasourceTree = new MatTreeFlatDataSource(
    this.treeControl,
    this.treeFlattener
  );
  /////////////////////////////////////////////////////////////////////////////////////////////////
  constructor(
    private quizzService: QuizzService,
    public http: HttpClient,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private _snackBar: MatSnackBar
  ) {
    this.files = [];
  }
  dataSource: any = [];
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  subjecterro = new FormControl('', [Validators.required]);
  tieudebaithi = new FormControl('', [Validators.required]);
  timeoftest = new FormControl('', [Validators.required]);
  tag = new FormControl('', [Validators.required]);
  indexEdit: any;
  step1Completed: boolean = false;
  step2Completed: boolean = false;
  nodeIsChoose: any;
  getErrorMessagetieudebaithi() {
    if (this.tieudebaithi.hasError('required')) {
      return 'You must enter a value';
    }
    return this.tieudebaithi.hasError('pattern')
      ? 'You must enter 5 to 30 characters'
      : '';
  }
  getErrorMessageTimeofTest() {
    if (this.timeoftest.hasError('required')) {
      return 'You must enter a value';
    }
  }
  getErrorMessage = 'You must enter a value';
  // get time
  getnumber(item) {
    this.time = item;
    console.log(this.time);
  }
  // getid
  getId() {
    console.log('subjectID là :', this.questionnew.SubjectID);
  }
  getIdPart(ID, stepper: MatStepper) {
    this.idpart = ID;
    this.step2Completed = true;
    this.changeDetectorRefs.detectChanges();
    stepper.next();
    console.log('idPart', this.idpart);
    console.log('subjectID là', this.questionnew.SubjectID);
  }
  //check checkbox
  checkIsPublic() {
    console.log(this.IsPrivate);
  }
  //them câu trả lời vào câu hỏi
  addAnswer() {
    this.questionnew.ListAnswer.push({
      Content: '',
      IsTrueAnswer: false,
      QuestionID: 0,
    });
  }
  removeAnswer(index) {
    this.questionnew.ListAnswer.splice(index, 1);
    console.log('delete success ');
  }
  //check true/false radio
  checkAnswerTrue(indexTrue) {
    this.questionnew.ListAnswer.map((item, index) => {
      if (index != indexTrue) {
        item.IsTrueAnswer = false;
      }
    });
  }
  //
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
  displayedColumns: string[] = ['No', 'Question', 'symbol'];
  //thêm câu hỏi
  addQuestion() {
    //progress bar
    const createQuestionPart = {
      next: (x) => console.log('create-question successfully'),
      error: (err) => console.log(err),
    };
    console.log('Click Add question ', this.questionnew);
    if (this.questionnew['ID'] == undefined) {
      this.progress_bar_answer = true;
      this.quizzService
        .createQuestionToPart(this.idpart, this.questionnew)
        .subscribe((createQuestionPart: any) => {
          this.idquestion = createQuestionPart.Data.Question.ID;
          console.log('Add question ID', this.idquestion);
          //
          // this.getQuestionbyID(this.idquestion);
          //
          this.GetQuestionbyPartId(this.idpart);
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
    }
    this.resetDataQuestion();
  }
  //reset lại form nhập
  resetDataQuestion() {
    this.questionnew = {
      Content: '',
      Image: 'image',
      Sound: 'sould',
      SubjectID: this.questionnew.SubjectID,
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
  // remove(fruit: Fruit): void {
  //   const index = this.tags.indexOf(fruit);
  //   if (index >= 0) {
  //     this.tags.splice(index, 1);
  //   }
  // }

  //thêm quizz
  addQuizz(stepper: MatStepper) {
    this.progress_bar = true;
    let QuizzSubmit = {
      SubjectID: this.questionnew.SubjectID,
      UserID: this.userid,
      Name: this.tieude,
      IsPublic: this.IsPrivate,
      Image: '',
      Time: this.time,
      Tags: this.tags,
      Description: this.mota,
    };
    const formData = new FormData();
    for (const file of this.files) {
      formData.append(file, file.name);
    }
    this.quizzService.createQuizz(QuizzSubmit).subscribe(
      (createQuizz) => {
        if (createQuizz.State > 0) {
          this.idquizz = createQuizz.Data.Quizz.ID;
          this.idpart = createQuizz.Data.Parts;
          console.log('part', this.idpart);
          console.log('id quizz', this.idquizz);
          this.getListPart(this.idquizz);
          this.step1Completed = true;
          //
          this.progress_bar = !this.progress_bar;
          //
          this.changeDetectorRefs.detectChanges();
          stepper.next();
        }
      },
      (error) => {
        this.erromessagename = true;
        this.progress_bar = false;
        this._snackBar.open(' Exam title already exist !!!', 'End now', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    );
    // console.log('addQuizz ', QuizzSubmit);
  }
  //lay dc danh sách list part
  getListPart(quizid) {
    this.quizzService.getMyPart(quizid).subscribe((partqs) => {
      this.datapart = partqs.Data.Parks;
      console.log('getListPart', this.datapart);
    });
  }
  // tạo thêm part
  createPart() {
    const createpart = this.dialog
      .open(CreatePartComponent, {
        width: '400px',
        data: { userID: this.userid, IdQuizz: this.idquizz },
      })
      .afterClosed()
      .subscribe((resPart) => {
        // this.datapart.push(resPart);
        this.getListPart(this.idquizz);
      });
  }
  ChooseSubject(ID, nameSubject) {
    // this.onChangeBgColor();
    this.questionnew.SubjectID = ID;
    this.nameSubject = nameSubject;
    this.hidediv = true;
    console.log(
      'subID',
      this.questionnew.SubjectID + '  ' + 'name:',
      this.nameSubject
    );
  }
  /////table
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
        this.changeDetectorRefs.detectChanges();
      });
  }
  //get list question to part id
  GetQuestionbyPartId(idpart) {
    this.quizzService.getQuestionbyPartId(this.idpart).subscribe((data) => {
      this.progress_bar_answer = false;

      this.dataSource = data.Data.Question;
      console.log('load ds questio', this.dataSource);
      this.changeDetectorRefs.detectChanges();
    });
  }
  detailQuestion(idquestion, index) {
    this.indexEdit = index;
    this.quizzService
      .getQuestionbyIdQuestion(idquestion)
      .subscribe((response: any) => {
        console.log('detail question', response.Data.Question);
        this.questionnew = response.Data.Question;
      });
  }
  //filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filter(filterValue.trim().toLowerCase());
  }

  //dialog
  openDialogEditPart(id): void {
    const editPart = this.dialog
      .open(EditPartComponent, {
        width: '500px',
        data: { id },
      })
      .afterClosed()
      .subscribe((respart) => {
        console.log('repart :', respart);
        this.getListPart(this.idquizz);
      });
  }
  openDialogDeletePart(id): void {
    const deletePart = this.dialog.open(DeletePartComponent, {
      width: '500px',
      data: { id },
    });
    this.changeDetectorRefs.detectChanges();
    deletePart.afterClosed().subscribe((data) => {
      // alert('Delete part successfully');
    });
    this.getListPart(this.idquizz);
  }
  openDialogDeleteQuestion(id): void {
    const deleteQuestion = this.dialog.open(DeleteQuestionComponent, {
      width: '500px',
      data: { id },
    });
    deleteQuestion.afterClosed().subscribe(() => {
      this.GetQuestionbyPartId(this.idpart);
      this.changeDetectorRefs.detectChanges();
    });
  }
  openDialogAddQuestionPool() {
    const QuestionPool = this.dialog
      .open(AddQuestionPoolComponent, {
        width: '100%',
        data: { idPart: this.idpart, idSubject: this.questionnew.SubjectID },
      })
      .afterClosed()
      .subscribe(() => {
        this.GetQuestionbyPartId(this.idpart);
      });
  }
  //drap and drop part
  ondrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.datapart, event.previousIndex, event.currentIndex);
  }

  selectedFile: File;
  onFileSelected(event) {
    console.log(event);
    this.files = event.target.files;
  }
}
