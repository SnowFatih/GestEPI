import { CheckStatus } from '@/types/type';


export const getStatusLabel = (status: number) => {
  switch (status) {
    case CheckStatus.CONFORME:
      return "Conforme";
    case CheckStatus.AREPARER:
      return "À réparer";
    case CheckStatus.AMETTREAUREBUT:
      return "À mettre au rebut";
    default:
      return "Statut inconnu";
  }
};

export const getStatusStyle = (status: number) => {
  switch (status) {
    case CheckStatus.CONFORME:
      return "text-green-500";
    case CheckStatus.AREPARER:
      return "text-yellow-500";
    case CheckStatus.AMETTREAUREBUT:
      return "text-red-500";
    default:
      return "text-gray-500";
  }
};

export const checkStatusOptions = [
  { id: "1", name: "Conforme" },
  { id: "2", name: "Non conforme" },
  { id: "3", name: "À réviser" },
];


// export enum FormattedEPIType {
//   "Corde" = 1,
//   "Sangle" = 2,
//   "Harnais" = 3,
//   "Casque" = 4,
//   "Mousqueton" = 5,
//   "Système d'assurage" = 6,
// }

