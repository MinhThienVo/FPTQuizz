import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenService } from 'src/app/Service/auth_login.service';
import { SocialAuthService } from 'angularx-social-login';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { QuizzService } from 'src/app/Service/Quizz/quizz.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  checkUserName: boolean = false;
  email: '';
  role: '';
  formel = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    if (this.formel.hasError('required')) {
      return 'You must enter a value';
    }
    return this.formel.hasError('email') ? 'Not a valid email' : '';
  }
  constructor(
    private authService: AuthenService,
    private route: Router,
    private routeActived: ActivatedRoute,
    private socialAuthService: SocialAuthService,
    private service: QuizzService,
    private _snackBar: MatSnackBar
  ) {
    if (localStorage.getItem('userid') != null) {
      this.route.navigate(['/admin']);
    }
  }
  ngOnInit() {}
  socialUser: SocialUser;
  isLoggedin: boolean;
  Signupwithgoogle() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log(this.socialUser);
      const register = {
        next: (x) => console.log('register successfully'),
        error: (err) => console.log(err),
      };
      let accountGG = {
        Email: this.socialUser.email,
        lastname: this.socialUser.lastName,
        Firstname: this.socialUser.firstName,
      };
      this.authService.register(accountGG).subscribe(register);
      console.log(accountGG);
      this.usergoogle();
    });
  }
  usergoogle() {
    let params = new HttpParams({
      fromObject: { username: this.socialUser.email, grant_type: 'password' },
    });
    console.log(this.socialUser.email);
    this.authService.userLogin(params.toString()).subscribe(
      (value: boolean) => {
        if (value) {
          this.route.navigate(['/admin']);
        } else {
          alert('failed');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  signup() {
    this.service.CheckUserName(this.email).subscribe(
      (data) => {
        console.log(data);
        if (data.State > 0) {
          this.route.navigate(['/choose-roll' + '/' + this.email]);
        }
      },
      (error) => {
        this._snackBar.open('Email already exists !!!', 'End now', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    );
  }
}
undefined;
