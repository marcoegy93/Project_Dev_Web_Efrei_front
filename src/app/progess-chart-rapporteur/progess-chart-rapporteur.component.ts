import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/User.service';
import { User } from '../Modele/User';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalClientComponent } from '../modal-client/modal-client.component';
import { Projet } from '../Modele/Projet';
import { FormControl } from '@angular/forms';
import { RapporteurService } from '../Services/rapporteur.service';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-progess-chart-rapporteur',
  templateUrl: './progess-chart-rapporteur.component.html',
  styleUrls: ['./progess-chart-rapporteur.component.scss']
})
export class ProgessChartRapporteurComponent implements OnInit {

  listClient: User []
  user: User
  newProjet: Projet 
  listDev: User []
  listUser: User []
  selectedDev: number
  selectedListClient: number[] = []
  toppings: any
  
  constructor( private readonly _userService: UserService,
    private readonly dialog: MatDialog,
    private readonly _rapporteurService : RapporteurService) { }

async ngOnInit() {
  AppComponent.showContent = true ;
  this.toppings = new FormControl('');
  this.user = UserService._user; 
  this.newProjet = new Projet()
  await this._userService.getListClient().then((data) => {
  this.listClient = data
  })

  await this._userService.getListClient().then((data) => {
    this.listClient = data
  })

  await this._userService.getListUser().then((data) => {
    this.listUser = data
  })
}

getUser(id: number){
  return this.listUser.find(user => user.idUtilisateur.toString() === id.toString());
}

getIdUser(nom: string, prenom: string){
  return this.listUser.find(user => user.nom === nom && user.prenom === prenom).idUtilisateur;
}

detailClient(client: User){
  const dialogRef: MatDialogRef<ModalClientComponent> = this.dialog.open(ModalClientComponent, {
    height:'700px',
    width: '1200px',
    data: { client : client }
  });
}

async createNewprojet(){
  this.newProjet.listClient = []
    this.toppings.value.forEach((idClient: number) => {
      this.newProjet.listClient.push(idClient)
    });



    await this._rapporteurService.createProjet(this.newProjet).then( async () => {
      this.toppings = new FormControl('');
      this.newProjet = new Projet()
    })
    
  }

}
