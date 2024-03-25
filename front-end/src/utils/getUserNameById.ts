import { User } from "@/types/type";

export const getUserNameById = (users: User[], userId: number) => {
  const user = users.find((user) => user.id === userId);
  return user ? `${user.firstName} ${user.lastName}` : "Utilisateur inconnu";
};


