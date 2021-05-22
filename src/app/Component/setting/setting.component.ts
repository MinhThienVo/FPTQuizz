import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SettingService } from 'src/app/Service/Setting/setting.service';
import { DeleteAccountDialogComponent } from './delete-account-dialog/delete-account-dialog.component';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  animal: any;
  durationInSeconds = 3;
  constructor(private _auth: SettingService, public dialog: MatDialog,private router:Router,private _snackBar: MatSnackBar) {}
  erromessage = ' Please enter a valid';
  erromessage2 = ' this value is required';
  userid = localStorage.getItem('userid');
  check: boolean;
  user1 = {
    userid: this.userid,
    ConfirmPassword: '',
    NewPassword: '',
    OldPassword: '',
  };
  dataProfile: any;
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
  ngOnInit(): void {
    console.log(this.userid);

    this._auth.loadInfouser(this.userid).subscribe((data) => {
      console.log(data);

      this.user = data.Data.userInfor;
    });
  }
  saveUserName() {
    this._auth.updateInfo(this.user).subscribe((data: any) => {
      this._snackBar.openFromComponent(SnackBarComponentNameTrue,{
        duration: this.durationInSeconds * 1000,
      });
    });
  }
  ChangePass() {
    if (this.user1.NewPassword != this.user1.ConfirmPassword) {
      this._snackBar.openFromComponent(SnackBarComponentPassFalse,{
        duration: this.durationInSeconds *1000,
      });
      return;
    } else {
      this._auth.checkPass(this.user1).subscribe((data) => {
        this.check = data.Data.userInfor;
      });
      if (this.check == false) {
       this._snackBar.openFromComponent(SnackBarComponentOldPassword,{
         duration:this.durationInSeconds *1000,
       });
        return;
      } else {
        this._auth.changePass(this.user1).subscribe((data) => {
          console.log(data);
          
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
  ChangeAccountType() {
    this._auth.changeAccountType(this.user1).subscribe((data) => {
      this._snackBar.openFromComponent(SnackBarComponentConvert,{
        duration:this.durationInSeconds *1000,
      });
      this.router.navigate(['/join']);
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(DeleteAccountDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('closed');
    });
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
export class SnackBarComponentNameTrue {
  messenger = 'Succes Name and Email';
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
export class SnackBarComponentNameFalse {
  messenger = 'Error Name and Email';
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
export class SnackBarComponentOldPassword {
  messenger = 'Old Password is incorrect';
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
  messenger = 'Succes Password';
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
export class SnackBarComponentPassFalse {
  messenger = 'The new password and confirmation password do not match';
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
export class SnackBarComponentConvert {
  messenger = 'Succes Convert';
}