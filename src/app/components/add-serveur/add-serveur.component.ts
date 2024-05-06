import { Component } from '@angular/core';
import { Serveur } from "src/app/models/serveur.model";
import { ServeurService } from "src/app/services/serveur.service";

@Component({
  selector: 'app-add-serveur',
  templateUrl: './add-serveur.component.html',
  styleUrls: ['./add-serveur.component.css']
})
export class AddServeurComponent {

  serveur: Serveur = {
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
  submitted = false;
  selectedType: string = 'APP';
  idNumber: number = 1; // Initialize with a default value, could be updated based on the logic
  prefixMapping: { [key: string]: number } = { 'APP': 1, 'BDD': 2, 'ADM': 3 };
  minValue: number = 1;


  constructor(private serveurService: ServeurService) { }
  onTypeChange(): void {
    // Adjust the minimum value based on the selectedType
    this.minValue = this.selectedType === 'APP' ? 1 :
                    this.selectedType === 'BDD' ? 2 :
                    this.selectedType === 'ADM' ? 3 : 1000;
    // Reset idNumber to reflect the change in type
    this.idNumber = this.minValue;
  }

  saveServeur(): void {
    this.serveur.id = `${this.selectedType}-${this.idNumber.toString()}`;
    const data = {
      id: this.serveur.id,
      app: this.serveur.app,
      bdd: this.serveur.bdd,
      adm: this.serveur.adm,
      statut: this.serveur.statut,
    
        ip: this.serveur.ip,
        dns: this.serveur.dns,
        hostname: this.serveur.hostname,
        nature: this.serveur.nature,
        phy_vm: this.serveur.phy_vm,
        prod_int_pca: this.serveur.prod_int_pca,
       
      cpu: this.serveur.cpu,
      ram: this.serveur.ram,
      disc: this.serveur.disc,
      carte_rsx: this.serveur.carte_rsx,
      os: this.serveur.os,
    
        version: this.serveur.version,
        port: this.serveur.port,
        path: this.serveur.path,
      
      services_a_demarrer: this.serveur.services_a_demarrer,
      flux_entrant: this.serveur.flux_entrant,
      flux_sortant: this.serveur.flux_sortant,
      acces: this.serveur.acces
    };

    this.serveurService.create(data)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e: any) => console.error(e)
      });
  }

  newServeur(): void {
    this.submitted = false;
    this.serveur = {
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
  }

}
