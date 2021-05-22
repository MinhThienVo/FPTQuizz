import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyLibraryService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    }),
  };

  getMyLibrary(id): Observable<any> {
    return this.http.get(
      'https://localhost:44323/Quizz/GetListByUserID?UserID=' + id,
      this.httpOptions
    );
  }
}
