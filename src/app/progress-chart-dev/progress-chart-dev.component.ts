import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../Modele/User';
import { DevService } from '../Services/dev.service';
import { UserService } from '../Services/User.service';
import { Ticket } from '../Modele/Ticket';

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
               private readonly _userService: UserService) { }

  async ngOnInit() {
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
    console.log(this.listProjet)
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

  async updateTicket(){
  
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

}
