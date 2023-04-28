import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'; 
import { ActivatedRoute } from '@angular/router';
import { User } from '../Modele/User';
import { UserService } from '../Services/User.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user?: User

  constructor( private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user = UserService._user; 
  }

}
