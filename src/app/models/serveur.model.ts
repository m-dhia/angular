import { isPlatformBrowser } from "@angular/common";

export class Serveur {
[x: string]: any;
    id?: any;
    app?: string;
    bdd?: string;
    adm?: string;
    statut?: string;
    
      ip?: string;
      dns?: string;
      hostname?: string;
      nature?: string;
      phy_vm?: string;
      prod_int_pca?: string;
    
    cpu?: number;
    ram?: number;
    disc?: number;
    carte_rsx?: string;
    os?: string;
  
      version?: string;
      port?: number;
      path?: string;
    
    services_a_demarrer?: string[];
    flux_entrant?: string;
    flux_sortant?: string;
    acces?: string;
  }  