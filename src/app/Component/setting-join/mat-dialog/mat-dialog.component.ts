import { Router } from '@angular/router';
import { Inject, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetProfileService } from 'src/app/Service/SettingJoin/get-profile.service';
import { Output, EventEmitter } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-mat-dialog',
  templateUrl: './mat-dialog.component.html',
  styleUrls: ['./mat-dialog.component.scss']
})

export class MatDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private putProfile: GetProfileService, private router:Router,
    private _snackBar: MatSnackBar) { }
    userID: any;
    user = {
      Id: localStorage.getItem('userid'),
      UserName: '',
      Email: '',
      Password: '',
      FirstName: '',
      LastName: '',
      Avatar: '',
      DateOfBirth: '1999-10-15T00:00:00',
      Grade: null,
    };
    durationInSeconds = 5;
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.userID = localStorage.getItem('userid');
  }
  saveUserName(): void {
    this.putProfile.editProfile(this.user).subscribe((data: any) => {
      console.log(data);
      this.router.navigate(['/setting-join']);
      this.dialogRef.close();
      this._snackBar.openFromComponent(SnackBarComponent,{
        duration: this.durationInSeconds * 1000,
      });
    })
  //   var userName = (<HTMLInputElement>document.getElementById('update-settings-username')).value;
  //   var userNameTemp = userName;
  //   var userNow = JSON.parse(localStorage.getItem('user'));
  //   userNow['UserName'] = userName;
  //   this.putProfile.editProfile(userNow).subscribe(data => {
  //     if(data.succes == 1){
  //       this.dialogRef.close();
  //       (<HTMLInputElement>document.getElementById('username')).innerHTML = userName;
  //       userName = userNow['UserName'];
  //       localStorage.setItem('user', JSON.stringify(userNow))
  //       this._snackBar.openFromComponent(SnackBarComponent, {
  //         duration: this.durationInSeconds * 1000,
  //       });
  //     }
  //     else {
  //       userNow['UserName'] = userNameTemp;
  //     }
  //   })
  // }


}
}
@Component({
  selector: 'snack-bar',
  templateUrl: '../snack-bar.html',
  styles: [`
    .example-pizza-party {
      color: #fff;
    }
  `],
})
export class SnackBarComponent {
}
