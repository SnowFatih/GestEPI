import e from "express";

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


// EPI TYPE

export interface EpiType {
  id: number;
  label: string;
}
export interface EpiTypeFilter {
  id: number;
  label: string;
}

