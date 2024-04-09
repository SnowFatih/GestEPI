import { UserType } from "@/types/type";

export const getUserTypeLabel = (userType: number | string): string => {
  switch(userType) {
    case UserType.ADMIN:
      return "Admin";
    case UserType.MANAGER:
      return "Manager";
    case UserType.USER:
      return "Utilisateur";
    default:
      return "Inconnu";
  }
};
