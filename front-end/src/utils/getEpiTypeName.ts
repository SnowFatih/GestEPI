import { EpiType } from "@/types/type";

export const getEpiTypeName = (types: EpiType[], id: number): string => {
  const epiType = types.find((type) => type.id === id);
  return epiType?.label || "";
};