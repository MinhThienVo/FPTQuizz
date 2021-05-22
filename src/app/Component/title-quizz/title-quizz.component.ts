import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExploreService } from 'src/app/Service/Explore/explore.service';

@Component({
  selector: 'app-title-quizz',
  templateUrl: './title-quizz.component.html',
  styleUrls: ['./title-quizz.component.scss'],
})
export class TitleQuizzComponent implements OnInit {
  durationInSeconds = 3;
  constructor(
    private explore: ExploreService,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar
  ) {}

  public dataSubjects: any[];

  ngOnInit(): void {
    this.spinner.show();
    this.explore.getExplore().subscribe(
      (data) => {
        this.dataSubjects = data.Data.listSubject;
        console.log(this.dataSubjects);

        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        this._snackBar.openFromComponent(SnackBarComponent, {
          duration: this.durationInSeconds * 1000,
        });
      }
    );
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
