import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { GetProfileService } from 'src/app/Service/SettingJoin/get-profile.service';
@Component({
  selector: 'app-deleteacc-dialog',
  templateUrl: './deleteacc-dialog.component.html',
  styleUrls: ['./deleteacc-dialog.component.scss']
})
export class DeleteaccDialogComponent implements OnInit {

  constructor(    public dialogRef: MatDialogRef<DeleteaccDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router:Router,
    private deleteProfile: GetProfileService) { }

    userid = localStorage.getItem('userid');
    onNoClick(): void {
      this.dialogRef.close();
    }
  ngOnInit(): void {

  }

  deleteAccount(): void {
    this.deleteProfile.deleteProfile(this.userid).subscribe(data => {
      console.log(data.data);
      this.router.navigate(['/homepage']);
      this.dialogRef.close();
      
    })
  }

}
