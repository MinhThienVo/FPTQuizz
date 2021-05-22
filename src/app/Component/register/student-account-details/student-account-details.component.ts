import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenService } from 'src/app/Service/auth_login.service';

@Component({
  selector: 'app-student-account-details',
  templateUrl: './student-account-details.component.html',
  styleUrls: ['./student-account-details.component.scss'],
})
export class StudentAccountDetailsComponent implements OnInit {
  errorFristName = 'UserName is required';
  hide = true;
  minDate: Date;
  maxDate: Date;
  dateofbirth: '';
  dob = '';
  username = '';
  password = '';
  email: any;
  role = '';
  student;
  constructor(
    private authService: AuthenService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear - 3, 1, 31);
  }
  ngOnInit(): void {
    this.student = this.route.params.subscribe((params) => {
      this.role = params['role'];
    });
    console.log(this.role);
    this.student = this.route.params.subscribe((params) => {
      this.email = params['email'];
    });
    console.log(this.email);
  }
  onStrengthChanged($event: number) {}
  SubmitStudent() {
    const register = {
      next: (x) => console.log('register successfully'),
      error: (err) => console.log(err),
    };
    let StudentSubmit = {
      email: this.email,
      username: this.username,
      password: this.password,
      role: 'student',
      dateofbirth: this.dateofbirth,
    };
    this.authService.register(StudentSubmit).subscribe((data: any) => {
      this._snackBar.open('Register successfully !!!', 'End now', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      this.router.navigate(['/login']);
    });
    console.log(StudentSubmit);
  }
}
