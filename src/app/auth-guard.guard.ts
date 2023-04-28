import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './Services/User.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(readonly router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(UserService._user){
        console.log(route)
        if(route.data['type'] === 'Auth'){
          return true
        }else if(route.data['type'] === 'Admin'){
          if(UserService._user.type === route.data['type'] )
            return true
          else {
            this.router.navigate(['/Authentification'])
        }
      } else if (route.data['type'] === 'Dev'){
        if(UserService._user.type === route.data['type'] )
          return true
        else {
          this.router.navigate(['/Authentification'])
      }
    }
    }
     
    return false;
  }
  
}
