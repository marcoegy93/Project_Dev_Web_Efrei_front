import { Component } from '@angular/core';
import { UserService } from './Services/User.service';
import { User } from './Modele/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-webProject-2023';
  static showContent = true;

  showContent(){
    return AppComponent.showContent
  }
}
