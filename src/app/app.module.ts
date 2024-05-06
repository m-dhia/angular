import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddServeurComponent } from './components/add-serveur/add-serveur.component';
import { ServeurDetailsComponent } from './components/serveur-details/serveur-details.component';
import { ServeurListComponent } from './components/serveur-list/serveur-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    AddServeurComponent,
    ServeurDetailsComponent,
    ServeurListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
