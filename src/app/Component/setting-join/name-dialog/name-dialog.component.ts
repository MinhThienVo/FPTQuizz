import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { GetProfileService } from 'src/app/Service/SettingJoin/get-profile.service';
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  selector: 'app-name-dialog',
  templateUrl: './name-dialog.component.html',
  styleUrls: ['./name-dialog.component.scss']
})
export class NameDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private router:Router,
    private putProfile: GetProfileService,
    private _snackBar: MatSnackBar
  ) { }
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

  }

  saveName(): void {
    this.putProfile.editProfile(this.user).subscribe((data: any) => {
      console.log(data);
      this.router.navigate(['/setting-join']);
      this.dialogRef.close();
      this._snackBar.openFromComponent(SnackBarComponent,{
        duration: this.durationInSeconds * 1000,
      });
    });
  //   var fName = (<HTMLInputElement>document.getElementById('update-settings-first-name')).value;
  //   var lName = (<HTMLInputElement>document.getElementById('update-settings-last-name')).value;
  //   var fNameTemp = fName;
  //   var lNameTemp = lName;
  //   var userNow = JSON.parse(localStorage.getItem('user'));
  //   userNow['FirstName'] = fName;
  //   userNow['LastName'] = lName;
  //   this.putProfile.editProfile(userNow).subscribe(data => {
  //     if(data.succes == 1){
  //       this.dialogRef.close();
  //       (<HTMLInputElement>document.getElementById('name')).innerText = userNow['FirstName'] + ' ' +userNow['LastName'];
  //       localStorage.setItem('user', JSON.stringify(userNow))
  //       this._snackBar.openFromComponent(SnackBarComponent, {
  //         duration: this.durationInSeconds * 1000,
  //       });
  //     }
  //     else {
  //       userNow['FirstName'] = fNameTemp;
  //       userNow['LastName'] = lNameTemp;
  //     }
  //   })
  //   this.dialogRef.close()
  // }
}}

@Component({
  selector: 'snack-bar',
  templateUrl: '../snack-bar.html',
  styles: [`
    .example-pizza-party {
      color: #fff;
    }
  `],
})
export class SnackBarComponent {}
