import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthenService } from '../Service/auth_login.service'


@Injectable()

export class AuthInterceptor implements HttpInterceptor{
  constructor(private authService: AuthenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var userData=this.authService.userInfo.getValue();
    if(userData && userData.email){
     const newReq=req.clone({
          headers: req.headers.set("Authorization",`bearer ${userData.access_token}`)
        });
        return next.handle(newReq);
    }
    return next.handle(req);
  }

}
