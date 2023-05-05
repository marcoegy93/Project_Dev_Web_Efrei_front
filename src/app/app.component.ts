import { Component } from '@angular/core';
import { UserService } from './Services/User.service';
import { User } from './Modele/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-webProject-2023';
  static showContent = true;
  constructor(_userService: UserService){}

  getUser(){
    return UserService._user; 
  }

  showContent(){
    return AppComponent.showContent
  }
  canGo(loc: string ){
    console.log(UserService._user)
    console.log(loc)

    if(UserService._user!= null){
      
      if(UserService._user.type === 'Admin')
        return true
      if(loc === 'home')
        return true 
      if(loc === 'manage user')
        return false 
      if(loc === 'Client Projects' && UserService._user.type === 'Rapporteur')
         return true
      if(loc === 'Project status' && UserService._user.type === 'Dev'  || UserService._user.type ==='Client')
      return true
    }
   
    return false;
}
}
