import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../Modele/User';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from '../Modele/Ticket';
import { UserService } from '../Services/User.service';
import { DevService } from '../Services/dev.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddTicketComponent } from '../add-ticket/add-ticket.component';
import { RapporteurService } from '../Services/rapporteur.service';
import { Projet } from '../Modele/Projet';

@Component({
  selector: 'app-modal-client',
  templateUrl: './modal-client.component.html',
  styleUrls: ['./modal-client.component.scss']
})
export class ModalClientComponent implements OnInit {

  user:User
  listProjet: Projet []
  listTicket :Ticket []
  client: User
  constructor( private route: ActivatedRoute, 
    private readonly _devService : DevService,
    private readonly _userService: UserService,
    private readonly dialog: MatDialog,
    private readonly _rapporteurService:RapporteurService,
    @Inject(MAT_DIALOG_DATA) public data: { client: User }) { }

async ngOnInit() {
this.user = UserService._user; 
this.client = this.data.client
  await this._devService.getListTicket(this.user.idUtilisateur).then((data) => {
  this.listTicket = data
  this.initListProjet()
  })
}


initListProjet(){
  this._rapporteurService.getListProjet(this.client.idUtilisateur).then((data) => {
    this.listProjet = data
  })
  
}

async addTicket(projet: Projet ){
  const dialogRef: MatDialogRef<AddTicketComponent> = this.dialog.open(AddTicketComponent, {
    height:'420px',
    width: '600px',
    data: { idProjet:projet.idProjet,
    client: this.data.client }
  });

  dialogRef.afterClosed().subscribe(async (result) => {
    await this._devService.getListTicket(this.user.idUtilisateur).then((data) => {
      this.listTicket = data
      this.initListProjet()
      })
  });
}
}
