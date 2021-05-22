import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDialogComponent } from './mat-dialog/mat-dialog.component';
import { NameDialogComponent } from './name-dialog/name-dialog.component';
import { GradeDialogComponent } from './grade-dialog/grade-dialog.component';
import { GetProfileService } from 'src/app/Service/SettingJoin/get-profile.service';
import { PasswordDialogComponent } from './password-dialog/password-dialog.component';
import { DeleteaccDialogComponent } from './deleteacc-dialog/deleteacc-dialog.component';


@Component({
  selector: 'app-setting-join',
  templateUrl: './setting-join.component.html',

  styleUrls: ['./setting-join.component.scss']
})




export class SettingJoinComponent implements OnInit {
  // Test thử sau login lấy thông tin từ local storage
  userid=localStorage.getItem('userid');
  animal: string;
  name: string;
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
  public usernameModel: string;

  constructor(
    public dialog: MatDialog,
    public getProfileHttp: GetProfileService
    ) { }

  ngOnInit(): void {
    this.getProfileHttp.getProfile(this.userid).subscribe((data)=>{
      console.log(data);
      this.user=data.Data.userInfor;
    });
    // this.getProfileHttp.getProfile(this.userid).subscribe(data => {
    //   if(data.succes === 1){
    //     this.user = data.Data.userInfor;
    //     this.usernameModel = this.user.UserName
    //     localStorage.setItem('IdUserName', this.user.Id)
    //     localStorage.setItem('user', JSON.stringify(this.user))
    //   }
    //   else {
    //     console.log('api lỗi');
    //   }
    // })
  }

  username_openDialog(): void {
    var nameP = this.user.UserName;
    const dialogRef = this.dialog.open(MatDialogComponent, {
      width: '400px',
      data: {UserName: nameP}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }

  name_openDialog(): void {
    var fullName = document.getElementById('name').innerText;

    const dialogRef = this.dialog.open(NameDialogComponent, {
      width: 'auto',
      data: {name: fullName}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }

  grade_openDialog(): void {
    const dialogRef = this.dialog.open(GradeDialogComponent, {
      width: 'auto',
      data: {firstname: this.animal, lastname: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  delete_openDialog(): void {
    const dialogRef = this.dialog.open(DeleteaccDialogComponent, {
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }



 password_openDialog(): void {
    const dialogRef = this.dialog.open(PasswordDialogComponent, {
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }


  updateFile(event) {
    let typeFile = event.target.files[0].type;
    if (!typeFile.match('image.*')){
      alert("Hãy chọn file ảnh");
      return;
    }
  }

  selectInput() : void {
    document.getElementById('selectInput').click();
  }
}


