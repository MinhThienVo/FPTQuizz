import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable()
export class AuthenService {
  constructor(private http: HttpClient) {}
  userInfo: BehaviorSubject<any> = new BehaviorSubject(null);
  jwtHelper = new JwtHelperService();

  userLogin(userPayload: any): Observable<boolean> {
    return this.http
      .post('https://localhost:44323/api/Account/Login', userPayload, {
        headers: new HttpHeaders().set('Content-Type', 'x-www-form-urlencoded'),
      })
      .pipe(
        map((value: any) => {
          if (value) {
            localStorage.setItem('access_token', value.access_token);
            const decryptedUser = this.jwtHelper.decodeToken(
              value.access_token
            );
            localStorage.setItem('userid', decryptedUser.id);
            const data = {
              access_token: value.access_token,
              //  refresh_tokn: value.refresh_tokn,
              username: decryptedUser.username,
              userid: decryptedUser.id,
              tokenExpiration: decryptedUser.exp,
              role: decryptedUser.role,
            };
            console.log(data);
            this.userInfo.next(data);
            return true;
          }
          return false;
        })
      );
  }

  //register
  register(model: any) {
    return this.http.post(
      'https://localhost:44323/api/Account/Register',
      model
    );
  }
}
