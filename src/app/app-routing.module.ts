import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServeurListComponent } from './components/serveur-list/serveur-list.component';
import { ServeurDetailsComponent } from './components/serveur-details/serveur-details.component';
import { AddServeurComponent } from './components/add-serveur/add-serveur.component';

const routes: Routes = [
  { path: '', redirectTo: 'serveurs', pathMatch: 'full' },
  { path: 'serveurs', component: ServeurListComponent },
  { path: 'serveurs/:id', component: ServeurDetailsComponent },
  { path: 'add', component: AddServeurComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }