import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { AuthentificationComponent } from './authentification/authentification.component';
import { HttpClientModule } from '@angular/common/http';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ProgressChartDevComponent } from './progress-chart-dev/progress-chart-dev.component';
import { ProgessChartRapporteurComponent } from './progess-chart-rapporteur/progess-chart-rapporteur.component';
import { ModalClientComponent } from './modal-client/modal-client.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddTicketComponent } from './add-ticket/add-ticket.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthentificationComponent,
    ManageUserComponent,
    ProgressChartDevComponent,
    ProgessChartRapporteurComponent,
    ModalClientComponent,
    AddTicketComponent,
    DeleteModalComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
