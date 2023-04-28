import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { ProgressChartDevComponent } from './progress-chart-dev/progress-chart-dev.component';

const routes: Routes = [
  { path: '', redirectTo: 'Authentification', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent,canActivate: [AuthGuardGuard],data:{type:'Auth'}  },
  { path: 'Authentification', component: AuthentificationComponent },
  { path: 'ManageUser', component: ManageUserComponent, canActivate: [AuthGuardGuard], data:{type:'Admin'} },
  { path: 'ProgessChartDev', component: ProgressChartDevComponent, canActivate: [AuthGuardGuard], data:{type:'Dev'} },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
