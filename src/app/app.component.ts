import { Component } from '@angular/core';
import { UserService } from './Services/User.service';
import { User } from './Modele/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-webProject-2023';
  static showContent = true;
  constructor(_userService: UserService,readonly router: Router){}

  getUser(){
    return UserService._user; 
  }

  showContent(){
    return AppComponent.showContent
  }
  canGo(loc: string ){
  

    if(UserService._user!= null){
      
      if(UserService._user.type === 'Admin')
        return true
      if(loc === 'home')
        return true 
      if(loc === 'manage user')
        return false 
      if(loc === 'Client Projects' && UserService._user.type === 'Rapporteur')
         return true
      if(loc === 'Project status' && UserService._user.type === 'Dev')
      return true
    }
   
    return false;
}


removeSessionUser(){
  UserService.removeUserSession()
  this.router.navigate(['/Authentification'])
}
}
