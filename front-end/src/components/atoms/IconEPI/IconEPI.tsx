import React from "react";
import casqueSrc from "@/assets/icons/casque.png";
import cordeSrc from "@/assets/icons/corde.png";
import harnaisSrc from "@/assets/icons/harnais.png";
import mousquetonSrc from "@/assets/icons/mousqueton.png";
import sangleSrc from "@/assets/icons/sangle.png";
import systemeassurageSrc from "@/assets/icons/systemeassurage.png";

export interface Props {
  type: string;
}

const iconSrc: { [key: string]: string } = {
  Casque: casqueSrc,
  Corde: cordeSrc,
  Harnais: harnaisSrc,
  Mousqueton: mousquetonSrc,
  Sangle: sangleSrc,
  "Système d'assurage": systemeassurageSrc,
};

export const IconEPI = ({ type }: Props) => {
  const src = iconSrc[type];

  if (!src) {
    return <div>N/C</div>;
  }

  return <img src={src} alt={`${type} Icon`} className="h-full" />;
};
