
export enum CheckFrequencyUnit {
  YEAR = "year",
  MONTH = "month",
}


export enum CheckStatus {
  CONFORME = 1,
  AREPARER = 2,
  AMETTREAUREBUT = 3,
}

export interface Check {
  id: number;
  epiId: number;
  checkDate: string;
  checkStatus: CheckStatus;
  userId: number;
}

export enum EPIType {
  NONE = 0,
  CORDE = 1,
  SANGLE = 2,
  HARNAIS = 3,
  CASQUE = 4,
  MOUSQUETON = 5,
  SYSTEMEDASSURAGE = 6,
}

export interface EPI {
  id: number;
  brand?: string;
  model?: string;
  serialNumber?: string;
  innerId?: string;
  type: EPIType;
  size?: string;
  color?: string;
  purchaseDate?: string;
  manufactureDate?: string;
  inServiceDate?: string;
  checkFrequency: number;
  checkFrequencyUnit: CheckFrequencyUnit;
}

// EPI USER
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  mail: string;
  userPassword: string;
  userType: number;
}

export interface UserFilter {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  mail: string;
  userPassword: string;
  userType: UserType;
}


// USER TYPE
export enum UserType {
  ADMIN = 1,
  MANAGER = 2,
  USER = 3,
}

export enum UserTypeFilter {
  ADMIN = 1,
  MANAGER = 2,
  USER = 3,
}


// EPI


export interface Epi {
  id: number;
  brand: string;
  model: string;
  serialNumber: string;
  innerId: string;
  epiType: number;
  size: string;
  color: string;
  purchaseDate: string;
  manufactureDate: string;
  inServiceDate: string;
  checkFrequency: number;
  checkFrequencyUnit: CheckFrequencyUnit;
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

// EPI CHECK
export interface EpiCheck {
  id: number;
  epiId: number;
  checkDate: string;
  checkStatus: number;
  userId: number;
}

export interface EpiCheckFilter {
  id: number;
  epiId: number;
  checkDate: string;
  checkStatus: number;
  userId: number;
}

