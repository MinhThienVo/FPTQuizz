import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    }),
  };

  // // API
  // getAllCollection of User
  getCollection(id): Observable<any> {
    return this.http.get(
      'https://localhost:44323/Collection/GetCollectionByUserID?UserID=' + id,
      this.httpOptions
    );
  }

  // getCollection by ID
  getCollectionById(id): Observable<any> {
    return this.http.get(
      'https://localhost:44323/Collection/GetByID?IDCollect=' + id,
      this.httpOptions
    );
  }

  // Delete collection
  deleteCollection(id): Observable<any> {
    return this.http.delete(
      'https://localhost:44323/Collection/DeletecollectionByID?collectionID=' +
        id,
      this.httpOptions
    );
  }

  // Create collection
  postCollection(data): Observable<any> {
    return this.http.post(
      'https://localhost:44323/Collection/AddCollection',
      data,
      this.httpOptions
    );
  }

  // Edit Collection
  editCollection(id,data): Observable<any> {
    return this.http.put('https://localhost:44323/Collection/UpdateCollection?ColectionID=' + id,data, this.httpOptions);
  }
}
