import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from '../Modele/User';
import { UserService } from '../Services/User.service';
import { ModalClientComponent } from '../modal-client/modal-client.component';
import { Ticket } from '../Modele/Ticket';
import { RapporteurService } from '../Services/rapporteur.service';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.scss']
})
export class AddTicketComponent implements OnInit {


  listClient : User []
  listDev: User []
  listUser: User []
  selectedDev : number
  user: User
  ticket :Ticket = new Ticket()
  client: User 
  constructor( private readonly _userService: UserService,
    private dialogRef: MatDialogRef<AddTicketComponent>,
    private readonly _rapporteurService: RapporteurService,
    @Inject(MAT_DIALOG_DATA) public data: { idProjet: number,client : User }) { }

    async ngOnInit() {
    this.user = UserService._user;
    this.client = this.data.client
  
    await this._userService.getListDev().then((data) => {
      this.listDev = data
    }) 

    await this._userService.getListUser().then((data) => {
      this.listUser = data
    })

    this.ticket.nomRapporteur = this.user.nom
    this.ticket.prenomRapporteur = this.user.prenom

    }

    
  annuleAdd(){
    this.dialogRef.close()
  }

  addTicket(){
  

    this.ticket.nomClient = this.client.nom
    this.ticket.prenomClient = this.client.prenom

    this.ticket.nomDev = this.getUser(this.selectedDev).nom
    this.ticket.prenomDev = this.getUser(this.selectedDev).prenom

    console.log(this.ticket)
    // probleme avce acces a lapi !!!!!!!!
    this.ticket.dateCreation = new Date()
    this.ticket.idProjet = this.data.idProjet
    this._rapporteurService.createTicket(this.ticket, this.user.idUtilisateur).then(() => this.dialogRef.close())
  }

    getUser(id: number){
      return this.listUser.find(user => user.idUtilisateur.toString() === id.toString());
    }
  
    getIdUser(nom: string, prenom: string){
      return this.listUser.find(user => user.nom === nom && user.prenom === prenom).idUtilisateur;
    }

}


