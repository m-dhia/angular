import { Component, Input, OnInit } from '@angular/core';
import { ServeurService } from 'src/app/services/serveur.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Serveur } from 'src/app/models/serveur.model';

@Component({
  selector: 'app-serveur-details',
  templateUrl: './serveur-details.component.html',
  styleUrls: ['./serveur-details.component.css']
})
export class ServeurDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentServeur: Serveur = {
    id: '',
    app: '',
    bdd: '',
    adm: '',
    statut: '',
    ip: '',
    dns: '',
    hostname: '',
    nature: '',
    phy_vm: '',
    prod_int_pca: '',
    cpu: 0,
    ram: 0,
    disc: 0,
    carte_rsx: '',
    os: '',
    version: '',
    port: 0,
    path: '',
    services_a_demarrer: [],
    flux_entrant: '',
    flux_sortant: '',
    acces: ''
  };
  
  message = '';
  constructor(
    private serveurService: ServeurService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getServeur(this.route.snapshot.params["id"]);
    }
  }

  getServeur(id: string): void {
    this.serveurService.get(id)
      .subscribe({
        next: (data) => {
          this.currentServeur = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateServeur(): void {
    this.message = '';

    this.serveurService.update(this.currentServeur.id, this.currentServeur)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This serveur was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteServeur(): void {
    this.serveurService.delete(this.currentServeur.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/serveurs']);
        },
        error: (e) => console.error(e)
      });
  }

}
