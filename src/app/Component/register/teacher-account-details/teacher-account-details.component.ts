import { Component, OnInit } from '@angular/core';
import { AuthenService } from 'src/app/Service/auth_login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-teacher-account-details',
  templateUrl: './teacher-account-details.component.html',
  styleUrls: ['./teacher-account-details.component.scss'],
})
export class TeacherAccountDetailsComponent implements OnInit {
  hide = true;
  //required
  errorLastName = 'Last Name is required';
  errorFristName = 'Frist Name is required';
  //
  password = '';
  email: any;
  lastname: '';
  firstname: '';
  role: '';
  teacher;
  constructor(
    private authService: AuthenService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.teacher = this.route.params.subscribe((params) => {
      this.role = params['role'];
    });
    console.log(this.role);
    this.teacher = this.route.params.subscribe((params) => {
      this.email = params['email'];
    });
    console.log(this.email);
  }
  onStrengthChanged($event: number) {}
  SubmitTeacher() {
    const register = {
      next: (x) => console.log('register successfully'),
      error: (err) => console.log(err),
    };
    let TeacherSubmit = {
      email: this.email,
      lastname: this.lastname,
      firstname: this.firstname,
      password: this.password,
      // "DateOfBirth":this.DateOfBirth,
      role: 'teacher',
    };
    this.authService.register(TeacherSubmit).subscribe((register: any) => {
      this._snackBar.open('Register successfully !!!', 'End now', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      this.router.navigate(['/login']);
    });
    console.log(TeacherSubmit);
  }
}
