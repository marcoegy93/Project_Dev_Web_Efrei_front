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
     if(!UserService._user)
        UserService.getUserSession()
    if(UserService._user){
      if(route.data['type'] === 'Auth'){
        console.log('ici')
        this.router.navigate(['/Home'])
      }
        if(route.data['type'] === 'Home'){
          return true
        }else if(route.data['type'] === 'Admin'){
          if(UserService._user.type === route.data['type'] )
            return true
          else {
            this.router.navigate(['/Home'])
        }
      } else if (route.data['type'] === 'Dev'){
        if(UserService._user.type === 'Dev' || UserService._user.type ==='Admin' || UserService._user.type ==='Client' )
          return true
        else {
          this.router.navigate(['/Home'])
      }
    } else if (route.data['type'] === 'Rapporteur'){
      if(UserService._user.type === 'Rapporteur' || UserService._user.type === 'Admin' )
        return true
    else {
      this.router.navigate(['/Home'])
    }
    }
  }

  if(!UserService._user && route.data['type'] === 'Auth')
    return true 
     
    return false;
  }
  
}
