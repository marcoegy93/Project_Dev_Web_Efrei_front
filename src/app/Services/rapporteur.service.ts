import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '../Modele/Ticket';

@Injectable({
  providedIn: 'root'
})
export class RapporteurService {
  readonly ApiUrl = "https://localhost:7043/api/Rapporteur/"

  constructor(private http: HttpClient) { }

  async createTicket(ticket: Ticket, idRapporteur: number){
    await this.http.post(this.ApiUrl+'createTicket/'+idRapporteur,ticket).toPromise().then(() => {} )
  }
  
}
