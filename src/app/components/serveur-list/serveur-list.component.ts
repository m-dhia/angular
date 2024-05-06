import { Component, OnInit } from '@angular/core';
import { Serveur } from 'src/app/models/serveur.model';
import { ServeurService } from 'src/app/services/serveur.service';



@Component({
  selector: 'app-serveurs-list',
  templateUrl: './serveur-list.component.html',
  styleUrls: ['./serveur-list.component.css']
})
export class ServeurListComponent implements OnInit {

  serveurs: Serveur[] = []; 
  currentServeur: Serveur = {};
  currentIndex = -1;
  id = '';
  showDeleteButton: boolean = false;
  showCheckboxes: boolean = false;

  constructor(private serveurService: ServeurService) { }

  ngOnInit(): void {
    this.retrieveServeurs();
  }

  retrieveServeurs(): void {
    this.serveurService.getAll()
      .subscribe({
        next: (data) => {
          this.serveurs = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveServeurs();
    this.currentServeur = {};
    this.currentIndex = -1;
  }

  setActiveServeur(serveur: Serveur, index: number): void {
    this.currentServeur = serveur;
    this.currentIndex = index;
  }

  removeSelectedServeurs(): void {
    // Filter out servers that are checked for deletion
    const serversToDelete = this.serveurs.filter(serveur => serveur['checked']);
  
    // Loop through the list of servers to delete
    serversToDelete.forEach(serveur => {
      this.serveurService.delete(serveur.id).subscribe({
        next: (res) => {
          console.log('Server deleted:', res);
          // Optionally, refresh the list of servers here or navigate away
        },
        error: (e) => console.error(e)
      });
    });
  
    // Update the local list to remove the deleted servers
    // This can be moved inside the `subscribe` block to ensure it only happens after successful deletion
    // However, for a better user experience, you might want to optimistically remove the server from the view
    this.serveurs = this.serveurs.filter(serveur => !serveur['checked']);
  
    // Reset checkboxes state if needed
    this.showCheckboxes = false;
  }

  searchID(): void {
    this.currentServeur = {};
    this.currentIndex = -1;

    this.serveurService.findById(this.id)
      .subscribe({
        next: (data: Serveur[] | undefined) => {
          this.serveurs = data || [];;
          console.log(data);
        },
        error: (e: any) => console.error(e)
      });
  }

}
