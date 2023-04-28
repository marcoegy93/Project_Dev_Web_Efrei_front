import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '../Modele/Ticket';

@Injectable({
  providedIn: 'root'
})
export class DevService {

  readonly ApiUrl = "https://localhost:7043/api/Dev/"

  constructor(private http: HttpClient) { }

  
  async getListUser(idDev: number): Promise<Ticket[]>{
    let ticketList: Ticket [] = []
    await this.http.get<Ticket []>(this.ApiUrl+'listTicket/'+idDev).toPromise().then((data: any) =>{
      ticketList = data 
    } )
    return ticketList
  }

}
