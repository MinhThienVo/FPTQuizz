import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetProfileService {
  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    }),
  };

  private getURL = 'https://localhost:44323/join/setting';
  private putURL = 'https://localhost:44323/join/setting/edit/';
  private URL =   'https://localhost:44323/api/Account/';

  getProfile(UserName): Observable<any> {
    return this.http.get(this.getURL + '/get?userid=' + UserName, this.httpOptions);
  }

  editProfile(any): Observable<any> {
    return this.http.put(this.putURL, any, this.httpOptions);
  }

  deleteProfile(accountID): Observable<any> {
    return this.http.delete<any>(
      this.getURL + '/delete/?userid=' + accountID,
      this.httpOptions
    );
  }
  checkPass(any): Observable<any> {
    return this.http.post<any>(
      this.URL + 'CheckPassword',
      any,
      this.httpOptions
    );
  }
  changePass(any): Observable<any> {
    return this.http.post<any>(
      this.URL + 'ChangePassword',
      any,
      this.httpOptions
    );
  }
}
