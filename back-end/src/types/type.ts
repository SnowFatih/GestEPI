// AVION
export interface Avion {
  id: number;
  immatriculation: string;
  marque: string;
  modele: string;
  statut: string;
  heuresDeVol: number;
  logoUrl?: string;
}

export interface AvionFilters {
  immatriculation?: string;
  marque?: string;
  modele?: string;
  statut?: string;
  heuresDeVol?: number;
}

// MECANICIEN

export interface Mecanicien {
  id: number;
  nom: string;
  prenom: string;
  idAvion: number;
}

export interface MecanicienFilters {
  nom?: string;
  prenom?: string;
  idAvion?: number;
}

// ENTRETIEN
export interface Entretien {
  id: number;
  idAvion: number;
  idMecanicien: number;
  debutDate: string;
  finDate: string;
  description: string;
}

export interface EntretienFilters {
  idAvion?: number;
  idMecanicien?: number;
  debutDate?: string;
  finDate?: string;
  description?: string;
}