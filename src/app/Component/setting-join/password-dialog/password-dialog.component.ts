import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { GetProfileService } from 'src/app/Service/SettingJoin/get-profile.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss']
})
export class PasswordDialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<PasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private putProfile: GetProfileService,
    private _snackBar: MatSnackBar) { }
    userid=localStorage.getItem('userid');
    user1 = {
      userid: this.userid,
      ConfirmPassword: '',
      NewPassword: '',
      OldPassword: '',
    };
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
    check: boolean;
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }
  ChangePass() {
    if (this.user1.NewPassword != this.user1.ConfirmPassword) {
      this._snackBar.openFromComponent(SnackBarComponentPassFalse,{
        duration: this.durationInSeconds *1000,
      });
      return;
    } else {
      this.putProfile.checkPass(this.user1).subscribe((data) => {
        this.check = data.Data.userInfor;
      });
      if (this.check == false) {
       this._snackBar.openFromComponent(SnackBarComponentOldPassword,{
         duration:this.durationInSeconds *1000,
       });
        return;
      } else {
        this.putProfile.changePass(this.user1).subscribe((data) => {
          this._snackBar.openFromComponent(SnackBarComponentTrue,{
            duration: this.durationInSeconds * 1000,
          });
        });
        (this.user1.ConfirmPassword = ''),
          (this.user1.NewPassword = ''),
          (this.user1.OldPassword = '');
      }
    }
  }
//   updatePassword(): void {
//     var passwordNew = (<HTMLInputElement>document.getElementById('update-settings-new-pass-1')).value;
//     var passwordCheck = (<HTMLInputElement>document.getElementById('update-settings-new-pass-2')).value;
//     var userNow = JSON.parse(localStorage.getItem('user'));
//     var passwordTemp = userNow['Password'];
//     userNow['Password'] = passwordNew;
//     if(passwordNew === passwordCheck){
//       document.getElementById('error').style.display = 'none'
//       this.putProfile.editProfile(userNow).subscribe(data => {
//         this.dialogRef.close();
//         if(data.succes == 1){
//           localStorage.setItem('user', JSON.stringify(userNow))
//           this._snackBar.openFromComponent(SnackBarComponent, {
//             duration: this.durationInSeconds * 1000,
//           });
//         }
//         else {
//           userNow['Password'] = passwordTemp;
//         }
//       })
//     }
//     else {
//       document.getElementById('error').style.display = 'block'
//     }
//   }

// }
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
export class SnackBarComponentPassFalse {
  messenger = 'Old Password is incorrect';
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
export class SnackBarComponentOldPassword {
  messenger = 'Old Password is incorrect';
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
export class SnackBarComponentTrue{
  messenger = 'Old Password is incorrect';
}

