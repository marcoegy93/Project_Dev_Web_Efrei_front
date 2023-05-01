import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { AuthentificationComponent } from './authentification/authentification.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ProgressChartDevComponent } from './progress-chart-dev/progress-chart-dev.component';
import { ProgessChartRapporteurComponent } from './progess-chart-rapporteur/progess-chart-rapporteur.component';
import { ModalClientComponent } from './modal-client/modal-client.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddTicketComponent } from './add-ticket/add-ticket.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthentificationComponent,
    ManageUserComponent,
    ProgressChartDevComponent,
    ProgessChartRapporteurComponent,
    ModalClientComponent,
    AddTicketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
