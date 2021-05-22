import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenService } from 'src/app/Service/auth_login.service';

@Injectable()
export class AuthRouteGuard implements CanActivate {
  constructor(private authService: AuthenService, private route: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const userData = this.authService.userInfo.getValue();

    //
    // if (userData && userData.userid) {
    //   if (state.url.indexOf('login') > -1) {
    //     this.route.navigate(['/dashboard']);
    //     return false;
    //   }
    // } else {
    //   if (state.url.indexOf('dashboard') > -1) {
    //     this.route.navigate(['/login']);
    //     return false;
    //   }
    // }
//
    return true;
  }
}
