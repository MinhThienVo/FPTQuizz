import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExploreService {
  constructor(private http: HttpClient) {}

  getExplore(): Observable<any> {
    return this.http.get('https://localhost:44323/Subject/GetRootSubjects');
  }
}
