import { SnackBarComponent } from './../../title-quizz/title-quizz.component';
import { from } from 'rxjs';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SettingService } from 'src/app/Service/Setting/setting.service';
import { NavigationEnd, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-delete-account-dialog',
  templateUrl: './delete-account-dialog.component.html',
  styleUrls: ['./delete-account-dialog.component.scss']
})
export class DeleteAccountDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteAccountDialogComponent>,private _snackBar: MatSnackBar,
    private _auth: SettingService,private router:Router,
  @Inject(MAT_DIALOG_DATA) public data: any) { }
  durationInSeconds = 3;
  userid = localStorage.getItem('userid')
  againPassword = "";
  user = {
    UserName: '',
    Email: '',
    Password: '',
    FirstName: "",
    LastName: "",
    Avatar: "",
    DateOfBirth: "1999-10-15T00:00:00",
    Grade: null
  };
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }
  deleteClick():void {
    this._auth.deleteInfo(this.userid).subscribe(data => {
      console.log(data.data);
      this.router.navigate(['/homepage']);
      this.dialogRef.close();
      this._snackBar.openFromComponent(SnackBarComponentDelete,{
        duration:this.durationInSeconds *1000,
      })
    })
  }
}
@Component({
  selector: 'snack-bar',
  templateUrl: '../notify.html',
  styles: [
    `
      .example-pizza-party {
        color: #fff;
      }
    `,
  ],
})
export class SnackBarComponentDelete {
  messenger = 'Succes Delete';
}
