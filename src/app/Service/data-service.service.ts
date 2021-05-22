import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor() { }
  private messageSource = new BehaviorSubject(-1);
  currentMessage = this.messageSource.asObservable();
  changeMessage(editClass: any) {
    this.messageSource.next(editClass);
  }
}
