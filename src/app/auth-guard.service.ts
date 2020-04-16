import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AppAuthService} from './app-auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate,CanActivateChild {
  constructor(private appAuthService: AppAuthService, private router: Router ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.appAuthService.isAuthenticated()
      .then(
        (authenticate: boolean) => {
          if (authenticate) {
            return true;
          } else {
            this.router.navigate(['/']);
          }
        }
      );
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   return this.canActivate(childRoute, state);
  }
}
