import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Modele/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly ApiUrl = "https://localhost:7043/api/User/"
  static _user: User

  constructor(private http: HttpClient) { 
   
   
  }
  
  static removeUserSession(){
    sessionStorage.removeItem('user')
    UserService._user= null
  }
  static getUserSession(){
    let userString = sessionStorage.getItem('user');
    console.log(userString)
 
    if(userString){
     let user = JSON.parse(userString) as User;
     console.log(user)
     UserService._user = user
    }
    
  }

  
  async authentification(login: string, mdp: string) {
   await this.http.get<User>(this.ApiUrl+'authentification/'+login+'/'+mdp).toPromise().then((data: any) =>{
    UserService._user = data 
    sessionStorage.setItem('user', JSON.stringify(UserService._user));
   } )
   console.log("sessionStorage.getItem('user')")
   
   return UserService._user 
  }

  async getListUser(): Promise<User[]>{
    let userList: User [] = []
    await this.http.get<User []>(this.ApiUrl+'listUsers/').toPromise().then((data: any) =>{
      userList = data 
    } )
    return userList
  }

  


  async getListDev(): Promise<User[]>{
    let devList: User [] = []
    await this.http.get<User []>(this.ApiUrl+'listDev/').toPromise().then((data: any) =>{
      devList = data 
    } )
    return devList
  }

  async getListRapporteur(): Promise<User[]>{
    let rapporteurList: User [] = []
    await this.http.get<User []>(this.ApiUrl+'listRapporteur/').toPromise().then((data: any) =>{
      rapporteurList = data 
    } )
    return rapporteurList
  }

  async getListClient(): Promise<User[]>{
    let clientList: User [] = []
    await this.http.get<User []>(this.ApiUrl+'listClient/').toPromise().then((data: any) =>{
      clientList = data 
    } )
    return clientList
  }


  async deleteUser(user: User){
   await this.http.get(this.ApiUrl+'deleteUser/' + user.idUtilisateur).toPromise().then()
  }

  async addUser(user: User ){
    await this.http.post(this.ApiUrl+'addUser/',user).toPromise().then()
  }

  async modifyUser(user: User){
    await this.http.post(this.ApiUrl+'modifyUser/',user).toPromise().then()
  }
}
