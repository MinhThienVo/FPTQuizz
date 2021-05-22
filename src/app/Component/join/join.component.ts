import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExploreService } from 'src/app/Service/Explore/explore.service';
// import { SnackBarComponent } from '../title-quizz/title-quizz.component';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {

  userid = localStorage.getItem('userid');
  durationInSeconds = 3;
  constructor(private explore: ExploreService,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar) { }

  public dataSubjects: any[];

  ngOnInit(): void {
    this.spinner.show();
      this.explore.getExplore().subscribe(data => {
        this.dataSubjects = data.Data.listSubject
        this.spinner.hide();
      }, (error) => {
        this.spinner.hide();
        this._snackBar.openFromComponent(SnackBarComponent, {
          duration: this.durationInSeconds * 1000
        });
      });
  }

  logout(): void {
    localStorage.clear();
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
export class SnackBarComponent {}