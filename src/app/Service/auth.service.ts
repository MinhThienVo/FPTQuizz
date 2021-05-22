import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { faLessThanEqual } from '@fortawesome/free-solid-svg-icons';

@Injectable()
export class AuthenService {
  constructor(private http: HttpClient) {
    this.loadUserInfo();
  }
  userInfo: BehaviorSubject<any> = new BehaviorSubject(null);
  jwtHelper = new JwtHelperService();

  // tslint:disable-next-line:typedef
  loadUserInfo() {
    const userdata = this.userInfo.getValue();
    if (!userdata) {
      const accesstoken = localStorage.getItem('access_token');
      const decryptedUser = this.jwtHelper.decodeToken(accesstoken);
      if (accesstoken) {
        const data = {
          access_token: accesstoken,
          refresh_token: localStorage.getItem('refresh_token'),
          username: decryptedUser.username,
          userid: decryptedUser.sub,
          tokenExpiration: decryptedUser.exp,
        };
        this.userInfo.next(data);
      }
    }
  }
  //
  userLogin(userPayload: any): Observable<boolean> {
    return this.http.post('http://localhost:3000/auth/login', userPayload).pipe(
      map((value: any) => {
        if (value) {
          localStorage.setItem('access_token', value.access_token);
          localStorage.setItem('refresh_tokn', value.refresh_tokn);
          const decryptedUser = this.jwtHelper.decodeToken(value.access_token);
          const data = {
            access_token: value.access_token,
            refresh_tokn: value.refresh_tokn,
            username: decryptedUser.username,
            userid: decryptedUser.sub,
            tokenExpiration: decryptedUser.exp,
          };
          this.userInfo.next(data);
          return true;
        }
        return false;
      })
    );
  }
}
