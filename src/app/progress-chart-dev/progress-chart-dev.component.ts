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

  constructor( private route: ActivatedRoute, private readonly _devService : DevService) { }

  async ngOnInit() {
    this.user = UserService._user; 
    await this._devService.getListUser(this.user.idUtilisateur).then((data) => {
      this.listTicket = data
    })
  }

}
