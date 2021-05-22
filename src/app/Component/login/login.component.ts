import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';
import { AuthenService } from 'src/app/Service/auth_login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from 'angularx-social-login'
import { HttpParams } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { join } from '@angular/compiler-cli/src/ngtsc/file_system';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    email: '';
  errorUsername="UserName is required !";
  errorPassword="Password is required !";
  erroLogin="Incorrect username/password";
  constructor(private authService: AuthenService, private route: Router,
   private socialAuthService:SocialAuthService
    ) {
      if(localStorage.getItem('userid') != null){
        this.route.navigate(['/admin']);
      }
    }
    loginwithGmail():void{
      this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
      this.socialAuthService.authState.subscribe((user) => {
        this.socialUser = user;
        this.isLoggedin = (user != null);
        console.log(this.socialUser);
    const register={
     next:x =>console.log("register successfully"),
    error: err=>console.log(err)
  };
    let accountGG={
         "Email":this.socialUser.email,
          "lastname":this.socialUser.lastName,
          "Firstname":this.socialUser.firstName,
    }
    this.authService.register(accountGG)
    .subscribe(register)
        console.log(accountGG);
        this.usergoogle()
      });
      // this.route.navigate(['/admin']);
    }

    socialUser: SocialUser;
    isLoggedin: boolean;
  ngOnInit(): void {
  }
  loginmodel = {
    Username: '',
    Password: '',
    grant_type :"password"
  };
  usergoogle(){
    let params = new HttpParams({
      fromObject: {username:this.socialUser.email, grant_type: 'password' },
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
        this.showMessage = true;
        console.log(error);
      }
    );
  }
  body = new URLSearchParams();

  jwtHelper = new JwtHelperService();

  userLogin() {
    let params = new HttpParams({
      fromObject: { username: this.loginmodel.Username, password: this.loginmodel.Password, grant_type: 'password' },
    });
    this.authService.userLogin(params.toString()).subscribe(
      (value: boolean) => {
        var token = localStorage.getItem('access_token');
        const decryptedUser = this.jwtHelper.decodeToken(token);
        console.log('role', decryptedUser.role);

        if (value) {
          if(decryptedUser.role === 'teacher' ){
            this.route.navigate(['/admin']);
          }
          if(decryptedUser.role === 'student'){
            this.route.navigate(['/join']);
          }
        } else {
          alert('failed');
        }
      },
      (error) => {
        this.showMessage = true;
        console.log(error);
      }
    );
  }
  showMessage = false;



}
