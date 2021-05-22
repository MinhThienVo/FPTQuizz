import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    }),
  };

  getListClassesByUserID(userID): Observable<any> {
    return this.http.get(
      'https://localhost:44323/class/getclass?UserID=' + userID,
      this.httpOptions
    );
  }

  createClasses(body): Observable<any> {
    return this.http.post(
      'https://localhost:44323/class/create',
      body,
      this.httpOptions
    );
  }

  addListStudenToClass(body): Observable<any> {
    return this.http.post(
      'https://localhost:44323/api/Account/SerialRegister',
      body,
      this.httpOptions
    );
  }

  checkExitsUser(body): Observable<any> {
    return this.http.post(
      'https://localhost:44323/api/Account/CheckExistedEmail',
      body,
      this.httpOptions
    );
  }

  serialRegister(body: any) {
    return this.http.post(
      'https://localhost:44323/api/Account/SerialRegister',
      body,
      this.httpOptions
    );
  }

  addListStudentToClass(body: any, classID: any) {
    return this.http.post(
      'https://localhost:44323/class/addListStudentToClass?classID=' + classID,
      body,
      this.httpOptions
    );
  }

  deleteClass(idClass: any) {
    return this.http.delete(
      'https://localhost:44323/class/delete?classID=' + idClass,
      this.httpOptions
    );
  }

  deleteStudent(idDetail: any) {
    return this.http.delete(
      'https://localhost:44323/class/deletestudent?detailID=' + idDetail,
      this.httpOptions
    );
  }
}
