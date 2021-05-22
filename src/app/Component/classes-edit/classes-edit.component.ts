import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ClassesService } from 'src/app/Service/Classes/classes.service';
import Handsontable from 'handsontable';
import { DataServiceService } from 'src/app/Service/data-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as XLSX from 'ts-xlsx';
import { DialogStudentDetailsComponent } from './dialog/dialog-student-details/dialog-student-details.component';
import { DialogDeleteClassComponent } from './dialog/dialog-delete-class/dialog-delete-class.component';
import { DialogDeleteStudentComponent } from './dialog/dialog-delete-student/dialog-delete-student.component';

@Component({
  selector: 'app-classes-edit',
  templateUrl: './classes-edit.component.html',
  styleUrls: ['./classes-edit.component.scss'],
})
export class ClassesEditComponent implements OnInit {
  constructor(
    private data: DataServiceService,
    public dialog: MatDialog,
    private api: ClassesService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
  ) {}

  listStudnet = [];
  selectIndex = 0;
  editClass = -1;
  editStudent = -1;
  nameStudent: any;
  listClass: [];
  listStudent: any;
  classID: any;
  className: any;
  listData: any;
  listMailAddClass: any;

  ngOnInit(): void {
    this.listClass = [];
    this.spinner.show();
    this.api.getListClassesByUserID(localStorage.getItem('userid')).subscribe(
      (result) => {
        this.listClass = result.Data.ListClass;
        this.listClass.map((item, index) => {
          if (index === 0) {
            this.setSelect(0, item['ID']);
          }
        });
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
    this.data.currentMessage.subscribe(
      (editClass) => (this.editClass = editClass)
    );
    this.data.currentMessage.subscribe(
      (editStudent) => (this.editStudent = editStudent)
    );
  }

  removeClass(idClass): void {
    const dialogDeleteClass = this.dialog.open(DialogDeleteClassComponent, {
      panelClass: 'custom-dialog-delete-class',
      data: idClass,
    });
    dialogDeleteClass.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.ngOnInit();
      }
    });
  }

  setSelect(value, idClass): void {
    this.selectIndex = value;
    this.classID = idClass;
    this.listClass.map((item) => {
      if (item['ID'] == idClass) {
        this.listStudnet = item['ListClass'];
      }
    });
  }

  handle(e) {
    this.listStudent = [];
    var validExts = new Array('.xlsx', '.xls', '.csv');
    var fileExt = e.target.files[0].name;
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
    if (validExts.indexOf(fileExt) < 0) {
      alert('Định dang file không phù hợp');
      return;
    } else {
      let workBook = null;
      let jsonData = null;
      const reader = new FileReader();
      const file = e.target.files[0];
      reader.onload = (event) => {
        const data = reader.result;
        workBook = XLSX.read(data, { type: 'binary' });
        jsonData = workBook.SheetNames.reduce((initial, name) => {
          const sheet = workBook.Sheets[name];
          initial[name] = XLSX.utils.sheet_to_json(sheet);
          return initial;
        }, {});
        const dataString = JSON.stringify(jsonData);
        this.listStudent = JSON.parse(dataString)['Sheet1'];
        let listMail: any;
        listMail = [];
        this.listStudent.map((item) => {
          listMail.push(item.Email);
        });
        this.listData = this.renderDataExcel(this.listStudent);
        this.checkExitsUser(listMail);
      };
      reader.readAsBinaryString(file);
    }
  }

  renderDataExcel(data): any {
    document.getElementById('excel').innerHTML = '';
    let hot = new Handsontable(document.getElementById('excel'), {
      data: data,
      rowHeaders: true,
      colHeaders: ['Name', 'DateOfBirth', 'Email', 'Status'],
      height: 260,
      columns: [
        { data: 'Name' },
        { data: 'DOB' },
        { data: 'Email' },
        { data: 'Status' },
      ],
    });
    document.getElementById('hot-display-license-info').style.display = 'none';
    return hot.getData();
  }

  checkExitsUser(listMail): void {
    this.spinner.show();
    this.api.checkExitsUser(listMail).subscribe(
      (result) => {
        let listStudentTemp = this.listStudent;
        this.listStudent = [];
        let listEmailTemp = [];
        listStudentTemp.map((value) => {
          if (result.length === 0) {
            const item = JSON.parse(
              JSON.stringify(value).split('}')[0] +
                ',"Status":"Không tồn tại" }'
            );
            this.listStudent.push(item);
          } else {
            listEmailTemp.push(value.Email);
            result.map((email) => {
              if (email === value.Email) {
                let item = JSON.parse(
                  JSON.stringify(value).split('}')[0] +
                    ',"Status":"Đã tồn tại" }'
                );
                this.listStudent.push(item);
              }
            });
            if (result.indexOf(value.Email) === -1) {
              if (value.Email === value.Email) {
                let item = JSON.parse(
                  JSON.stringify(value).split('}')[0] +
                    ',"Status":"Không tồn tại" }'
                );
                this.listStudent.push(item);
              }
            }
          }
        });
        this.spinner.hide();
        this.listData = this.renderDataExcel(this.listStudent);
      },
      (error) => {
        this.spinner.hide();
        console.log(error);
      }
    );
  }

  cancelExcel(): void {
    this.modalService.dismissAll();
    this.listStudent = [];
  }

  createStudents(): void {
    let listMail = [];
    let bodyStudent = [];
    this.listData.map((item) => {
      let DateOfBirth = null;
      if (item[1].length !== 0) {
        DateOfBirth = new Date(item[1].replace(/(\d+[/])(\d+[/])/, '$2$1'));
      }
      let fullName = item[0].split(' ');
      let FirstName = '';
      fullName.map((item, index) => {
        if (index !== fullName.length - 1) {
          FirstName += item + ' ';
        }
      });
      let LastName = fullName[fullName.length - 1];
      let Email = item[2];
      listMail.push(Email);
      bodyStudent.push({
        Email: Email,
        DateOfBirth: DateOfBirth,
        FirstName: FirstName,
        LastName: LastName,
      });
    });
    this.serialRegister(bodyStudent, listMail);
  }

  serialRegister(body, listMail): void {
    this.spinner.show();
    this.api.serialRegister(body).subscribe(
      (result) => {
        this.listMailAddClass = [];
        result['addList'].map((item) => this.listMailAddClass.push(item.Email));
        result['existList'].map((item) =>
          this.listMailAddClass.push(item.Email)
        );
        this.addStudentsToClass(this.listMailAddClass, this.classID);
      },
      (error) => {
        this.spinner.hide();
        console.log(error);
      }
    );
  }

  addStudents(): void {
    this.createStudents();
  }

  addStudentsToClass(body, classID): void {
    this.api.addListStudentToClass(body, classID).subscribe(
      (result) => {
        if (result['State'] === 1) {
          this.loadDataResult();
          this.ngOnInit();
          this.listClass.map((item, index) => {
            if (item['ID'] === classID) {
              this.setSelect(index, item['ID']);
            }
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadDataResult(): void {
    let listStudentTemp = this.listStudent;
    this.listStudent = [];
    listStudentTemp.map((value) => {
      const item = JSON.parse(
        JSON.stringify(value).split('}')[0] + ',"Status":"Thành công" }'
      );
      this.listStudent.push(item);
    });
    this.spinner.hide();
    this.listData = this.renderDataExcel(this.listStudent);
  }

  open(content, classID, className) {
    this.classID = classID;
    this.className = className;
    this.modalService.open(content);
    document.getElementById('fileLoader').click();
  }

  openEditStudent(value, e): void {
    this.editStudent = value;
    (e as Event).stopPropagation();
  }

  openEditClass(value): void {
    this.editClass = value;
  }

  openDialogAddStudent(IDClass): void {
    const dialogRefCreateClass = this.dialog.open(DialogAddStudent, {
      width: '30%',
      data: { classID: IDClass },
    });
  }

  deleteStudent(item): void {
    const dialogDeleteStudent = this.dialog.open(DialogDeleteStudentComponent, {
      width: '25%',
      data: item,
    });
    this.editStudent = -1;
    dialogDeleteStudent.afterClosed().subscribe((result) => {
      let listTemp = [];
      this.listClass.map((value, index) => {
        if (value['ID'] === this.classID) {
          listTemp.push(value['ListClass']);
        }
      });
      listTemp[0].map((student, index) => {
        if (student === result) {
          listTemp[0].splice(index, 1);
          this.listClass.map((item) => {
            if (item['ID'] === student['ID']) {
              JSON.parse(item['ListClass']) === listTemp[0];
            }
          });
        }
      });
    });
  }

  openDialogStudentDetail(e, item): void {
    (e as Event).stopPropagation();
    this.editStudent = -1;
    const dialogRefStudentDetail = this.dialog.open(
      DialogStudentDetailsComponent,
      {
        width: '25%',
        data: item,
      }
    );
    dialogRefStudentDetail.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  openCreateClass(): void {
    const dialogRefCreateClass = this.dialog.open(DialogCreateClass, {
      width: '25%',
    });

    dialogRefCreateClass.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }
}

@Component({
  selector: 'dialog-add-student',
  templateUrl: './dialog/dialog-add-student.html',
  styleUrls: ['./dialog/dialog-add-student.scss'],
})
export class DialogAddStudent {
  constructor(
    public dialogRef: MatDialogRef<DialogAddStudent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-create-class',
  templateUrl: './dialog/dialog-create-class.html',
  styleUrls: ['./dialog/dialog-create-class.scss'],
})
export class DialogCreateClass {
  durationInSeconds = 3;
  constructor(
    public dialogRef: MatDialogRef<DialogCreateClass>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ClassesService,
    private _snackBar: MatSnackBar
  ) {}

  hideClass = true;
  nameData = ' ';

  nameClasses(e): void {
    this.nameData = e.target.value;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createClaess(): void {
    if (this.nameData.length === 0) {
      alert('Class name not empty');
    } else {
      let body = {
        ID: 0,
        Name: this.nameData,
        UserID: localStorage.getItem('userid'),
      };
      this.api.createClasses(body).subscribe(
        () => {
          this.dialogRef.close();
          this._snackBar.openFromComponent(SnackBarComponentTrue, {
            duration: this.durationInSeconds * 1000,
          });
        },
        () => {
          this._snackBar.openFromComponent(SnackBarComponentFalse, {
            duration: this.durationInSeconds * 1000,
          });
        }
      );
    }
  }
}

@Component({
  selector: 'snack-bar',
  templateUrl: './notify.html',
  styles: [
    `
      .example-pizza-party {
        color: #fff;
      }
    `,
  ],
})
export class SnackBarComponentTrue {
  messenger = 'Tạo lớp học thành công';
}

@Component({
  selector: 'snack-bar',
  templateUrl: './notify.html',
  styles: [
    `
      .example-pizza-party {
        color: #fff;
      }
    `,
  ],
})
export class SnackBarComponentFalse {
  messenger = 'Tạo lớp học thất bại';
}
