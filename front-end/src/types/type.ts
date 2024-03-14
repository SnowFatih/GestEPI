export interface Avion {
  id: number;
  immatriculation: string;
  marque: string;
  modele: string;
  statut: string;
  heuresDeVol: number;
  logoUrl?: string;
}


export interface Mecanicien {
  id: number;
  nom: string;
  prenom: string;
  idAvion: number;
}

export interface Entretien {
  id: number;
  idAvion: number;
  idMecanicien: number;
  debutDate: string;
  finDate: string;
  description?: string;
}
