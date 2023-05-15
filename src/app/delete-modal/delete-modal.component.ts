import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from '../Modele/User';
import { UserService } from '../Services/User.service';
import { DevService } from '../Services/dev.service';
import { RapporteurService } from '../Services/rapporteur.service';
import { Ticket } from '../Modele/Ticket';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
  providers: [DatePipe] 
})
export class DeleteModalComponent implements OnInit {

  ticket: Ticket
  user: User
  
  constructor( private route: ActivatedRoute, 
    private readonly _devService : DevService,
    private readonly _userService: UserService,
    private readonly dialog: MatDialog,
    private readonly _rapporteurService:RapporteurService,
    private dialogRef: MatDialogRef<DeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { ticket?: Ticket, user?:User }) { }

  ngOnInit(): void {
    if(this.data.ticket)
     this.ticket = this.data.ticket
    if(this.data.user)
      this.user = this.data.user

      console.log(this.user)
  }

  async deleteTicket(){
    await this._devService.deleteTicket(this.ticket.idTicket).then( () => {
      this.dialogRef.close()
    })
  }

  close(){
    this.dialogRef.close()
  }

  async deleteUser (){
    await this._userService.deleteUser(this.user).then(  async () => {
    })
  }
}
