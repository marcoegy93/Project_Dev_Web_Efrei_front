import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../Modele/User';
import { DevService } from '../Services/dev.service';
import { UserService } from '../Services/User.service';
import { Ticket } from '../Modele/Ticket';
import { AppComponent } from '../app.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalClientComponent } from '../modal-client/modal-client.component';

@Component({
  selector: 'app-progress-chart-dev',
  templateUrl: './progress-chart-dev.component.html',
  styleUrls: ['./progress-chart-dev.component.scss']
})
export class ProgressChartDevComponent implements OnInit {

  user?: User
  listTicket : Ticket []
  listRapporteur : User []
  listClient : User []
  listUser: User []
  listProjet: string []
  ticketToEdit: Ticket 
  selectedClient: number
  selectedRapporteur: number
  selectedDev: number

  listDev: User []

  constructor( private route: ActivatedRoute, 
               private readonly _devService : DevService,
               private readonly _userService: UserService,
               private readonly dialog: MatDialog
               ) { }

  async ngOnInit() {
    AppComponent.showContent = true ;
    this.user = UserService._user; 
    await this._devService.getListTicket(this.user.idUtilisateur).then((data) => {
      this.listTicket = data
      this.initListProjet()
    })

    await this._userService.getListClient().then((data) => {
      this.listClient = data
    })

    await this._userService.getListRapporteur().then((data) => {
      this.listRapporteur = data
    })

    await this._userService.getListDev().then((data) => {
      this.listDev = data
    })
    await this._userService.getListUser().then((data) => {
      this.listUser = data
    })
  }

  initListProjet(){
    this.listProjet = []
    
    this.listTicket.forEach((item) => {
      if(!this.listProjet.includes(item.nomProjet))
        this.listProjet.push(item.nomProjet)
    })
  }

  editTicket(ticket: Ticket){
    this.ticketToEdit = ticket
    this.selectedClient = this.getIdUser(this.ticketToEdit.nomClient,this.ticketToEdit.prenomClient)
    this.selectedDev = this.getIdUser(this.ticketToEdit.nomDev,this.ticketToEdit.prenomDev)
    this.selectedRapporteur = this.getIdUser(this.ticketToEdit.nomRapporteur,this.ticketToEdit.prenomRapporteur)
  }

  getUser(id: number){
    return this.listUser.find(user => user.idUtilisateur.toString() === id.toString());
  }

  getIdUser(nom: string, prenom: string){
    return this.listUser.find(user => user.nom === nom && user.prenom === prenom).idUtilisateur;
  }

  annuleModif(){
    this.ticketToEdit = null
  }

  async updateTicket(ticket? : Ticket){
  
    if(ticket){
      await this._devService.updateTicket(ticket).then( async ()=> {
        await this._devService.getListTicket(this.user.idUtilisateur).then((data) => {
          this.listTicket = data
          this.initListProjet()
        })
      })
    }
    if(this.user.type==='Admin'){

    
    this.ticketToEdit.nomRapporteur = this.getUser(this.selectedRapporteur).nom
    this.ticketToEdit.prenomRapporteur = this.getUser(this.selectedRapporteur).prenom

    this.ticketToEdit.nomClient = this.getUser(this.selectedClient).nom
    this.ticketToEdit.prenomClient = this.getUser(this.selectedClient).prenom

    this.ticketToEdit.nomDev = this.getUser(this.selectedDev).nom
    this.ticketToEdit.prenomDev = this.getUser(this.selectedDev).prenom
  }
    
    await this._devService.updateTicket(this.ticketToEdit).then( async ()=> {
      await this._devService.getListTicket(this.user.idUtilisateur).then((data) => {
        this.listTicket = data
        this.initListProjet()
      })
    })
  }

  async deleteTicket(ticket: Ticket){
    await this._devService.deleteTicket(ticket.idTicket).then( async () => {
      await this._devService.getListTicket(this.user.idUtilisateur).then((data) => {
        this.listTicket = data
        this.initListProjet()
      })
    })
  }

  openModalDelete(ticket: Ticket){
    const dialogRef: MatDialogRef<DeleteModalComponent> = this.dialog.open(DeleteModalComponent, {
      height:'300px',
      width: '400px',
      data: { ticket : ticket }
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      await this._devService.getListTicket(this.user.idUtilisateur).then((data) => {
        this.listTicket = data
        this.initListProjet()
      })
    });
  }
  
  changeStateTicket(etat: string,ticket: Ticket){
    ticket.etat = etat
    this.updateTicket(ticket)
  }

}
