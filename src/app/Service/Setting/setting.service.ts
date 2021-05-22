import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  private Url = 'https://localhost:44323/join/setting';
  private Url1 = 'https://localhost:44323/join/setting/edit/';
  private Url2 = 'https://localhost:44323/api/Account/';
  constructor(private _http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    }),
  };
  loadInfouser(accountID) {
    return this._http.get<any>(
      this.Url + '/get?userid=' + accountID,
      this.httpOptions
    );
  }
  updateInfo(any): Observable<any> {
    return this._http.put<any>(this.Url1, any, this.httpOptions);
  }
  checkPass(any): Observable<any> {
    return this._http.post<any>(
      this.Url2 + 'CheckPassword',
      any,
      this.httpOptions
    );
  }
  changePass(any): Observable<any> {
    return this._http.post<any>(
      this.Url2 + 'ChangePassword',
      any,
      this.httpOptions
    );
  }
  changeAccountType(any): Observable<any> {
    return this._http.put<any>(
      this.Url2 + 'ChangRoleUser',
      any,
      this.httpOptions
    );
  }
  deleteInfo(accountID): Observable<any> {
    return this._http.delete<any>(
      this.Url + '/delete/?userid=' + accountID,
      this.httpOptions
    );
  }
}
