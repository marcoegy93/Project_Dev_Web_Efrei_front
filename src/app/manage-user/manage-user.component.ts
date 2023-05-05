import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../Services/User.service';
import { User } from '../Modele/User';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {

  listUser: User [] = []
  userToAdd= new User()
  userToModify: User= null

  constructor(
    readonly _userService : UserService,
    readonly  router: Router
    ) { }


    isSame(user:User){
      if(this.userToModify && this.userToModify.idUtilisateur === user.idUtilisateur)
        return true 
      else 
        return false 
    }

  async ngOnInit(){
    AppComponent.showContent = true ;

    this.listUser = await this._userService.getListUser()
    this.userToAdd = new User()

  }

  modify(user: User){
    this.userToModify = user;
  }

  async delete (user: User){
    await this._userService.deleteUser(user).then(  async () => {
      this.listUser = await this._userService.getListUser()
    })
  }


  async addUser(){
    console.log(this.userToAdd)
    await this._userService.addUser(this.userToAdd).then(  async () => {
      this.listUser = await this._userService.getListUser()
      this.userToAdd = new User()
    })
  }


  async saveModif(){
    await this._userService.modifyUser(this.userToModify).then(() => this.userToModify = null)
  }


  cancelModif(){
    this.userToModify = null
  }


  
}
