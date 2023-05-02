import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '../Modele/Ticket';
import { Projet } from '../Modele/Projet';

@Injectable({
  providedIn: 'root'
})
export class RapporteurService {
  readonly ApiUrl = "https://localhost:7043/api/Rapporteur/"

  constructor(private http: HttpClient) { }

  async createTicket(ticket: Ticket, idRapporteur: number){
    await this.http.post(this.ApiUrl+'createTicket/'+idRapporteur,ticket).toPromise().then(() => {} )
  }
  
  async createProjet(projet: Projet){
    await this.http.post(this.ApiUrl+'createProject/',projet).toPromise().then(() => {} )
  }

  async getListProjet(idClient : number): Promise<Projet[]>{
    let projetList: Projet [] = []
    await this.http.get<Projet []>(this.ApiUrl+'listProjet/'+idClient).toPromise().then((data: any) =>{
      projetList = data 
    } )
    return projetList
  }
}
