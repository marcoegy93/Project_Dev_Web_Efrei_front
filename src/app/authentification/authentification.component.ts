import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/User.service';
import { Route, Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit {

  login: string  = ''
  password: string  = ''
  errorLogin?: string  = ''
  isLoading?: boolean = false 

  constructor(
    readonly _userService : UserService,
    readonly  router: Router,
    
    ) { }

  ngOnInit(): void {
    AppComponent.showContent = false;
  }

  async submit(){
    this.isLoading = true 
    let user = await this._userService.authentification(this.login,this.password)
    if(user == null){
      this.errorLogin = 'Incorrect login or password.'
    } else {
      const navigationExtras = {
        state: {
          data: user
        }
      };
      this.router.navigate(['Home'], navigationExtras);
    }
    this.isLoading = false  
  }

}
