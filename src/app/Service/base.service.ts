import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable()

export class BaseService {
  private emailLogin$ = new BehaviorSubject<any>('Vui long dang nhap');
  changeEmail(emailLogin) {
    this.emailLogin$.next(emailLogin);
}

getEmailLogin() {
    return this.emailLogin$.asObservable();
}
}
