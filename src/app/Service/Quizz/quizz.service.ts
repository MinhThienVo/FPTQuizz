import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaderResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuizzService {
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': 'localhost:4200',
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    }),
  };
  url = '';
  getMySubject(): Observable<any> {
    return this.http.get(
      'https://localhost:44323/subject/getallsubjects',
      // 'https://localhost:44323/Subject/GetRootSubjects',
      this.httpOptions
    );
  }
  //get list by userid
  getListQuizzbyUserID(id): Observable<any> {
    return this.http.get(
      'https://localhost:44323/Quizz/GetListByUserID=' + id,
      this.httpOptions
    );
  }
  //get part by quizz id de dc id part h ca2n la2m la lay' idquizz => add part
  getMyPart(quizzID): Observable<any> {
    return this.http.get(
      'https://localhost:44323/Part/GetPartsByQuizzID?QuizzID=' + quizzID,
      this.httpOptions
    );
  }
  EditQuestion(model: any) {
    return this.http.put(
      'https://localhost:44323/Question/EditQuestion',
      model,
      this.httpOptions
    );
  }

  getQuestionbyIdQuestion(idquestion) {
    return this.http.get(
      'https://localhost:44323/Question/GetQuestionByID?questionID=' +
        idquestion,
      this.httpOptions
    );
  }
  createQuestionToPart(partid, model) {
    return this.http.post(
      'https://localhost:44323/Question/AddQuestionToPart?ParkID=' + partid,
      model,
      this.httpOptions
    );
  }
  createQuestion(model: any) {
    return this.http.post(
      'https://localhost:44323/Question/AddQuestion',
      model,
      this.httpOptions
    );
  }
  createPartservice(model: any): Observable<any> {
    return this.http.post(
      'https://localhost:44323/Part/AddPart',
      model,
      this.httpOptions
    );
  }
  createQuizz(model: any): Observable<any> {
    {
      return this.http.post(
        'https://localhost:44323/quizz/AddQuizz',
        model,
        this.httpOptions
      );
    }
  }
  //// delete Part
  deletePart(id): Observable<any> {
    return this.http.delete(
      'https://localhost:44323/Part/DeletePart?PartID=' + id,
      this.httpOptions
    );
  }

  // edit Part
  editPart(model: any): Observable<any> {
    return this.http.put(
      'https://localhost:44323/Part/EditPart',
      model,
      this.httpOptions
    );
  }
  getPartbyID(id): Observable<any> {
    return this.http.get(
      'https://localhost:44323/part/getpartbypartid?PartID=' + id,
      this.httpOptions
    );
  }
  deleteQuestion(id): Observable<any> {
    return this.http.delete(
      'https://localhost:44323/Question/DeleteQuestion?questionID=' + id,
      this.httpOptions
    );
  }
  getQuestionbyID(id): Observable<any> {
    return this.http.get(
      'https://localhost:44323/Question/GetQuestionByID?questionID=' + id,
      this.httpOptions
    );
  }
  getQuestionbyPartId(id): Observable<any> {
    return this.http.get(
      'https://localhost:44323/Question/GetQuestionByPartID?partID=' + id,
      this.httpOptions
    );
  }
  getQuestionbySubjectId(id): Observable<any> {
    return this.http.get(
      'https://localhost:44323/Question/GetQuestionBySubjectID?SubjectID=' + id,
      this.httpOptions
    );
  }
  createQuestionbypool(idquestion, idpart): Observable<any> {
    return this.http.post(
      'https://localhost:44323/question/AddQuestionFromPool?questionID=' +
        idquestion +
        '&partID=' +
        idpart,
      this.httpOptions
    );
  }

  //detail quizz
  getQuestionbyIDQuizz(id): Observable<any> {
    return this.http.get(
      'https://localhost:44323/Quizz/GetQuestionsByQuizzID?QuizzID=' + id,
      this.httpOptions
    );
  }

  getQuizzbyIDQuizz(id): Observable<any> {
    return this.http.get(
      'https://localhost:44323/Quizz/GetQuizByQuizID?quizID=' + id,
      this.httpOptions
    );
  }
  //register
  CheckUserName(user): Observable<any> {
    return this.http.get(
      'https://localhost:44323/user/checkusername?userName=' + user,
      this.httpOptions
    );
  }
}
