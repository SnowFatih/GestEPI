import React from "react";
import casqueSrc from "@/assets/icons/casque.png";
import cordeSrc from "@/assets/icons/corde.png";
import harnaisSrc from "@/assets/icons/harnais.png";
import mousquetonSrc from "@/assets/icons/mousqueton.png";
import sangleSrc from "@/assets/icons/sangle.png";
import systemeassurageSrc from "@/assets/icons/systemeassurage.png";
import classNames from "classnames";

export interface Props {
  type: string;
  width?: number;
  height?: number;
  className?: string;
}

const iconSrc: { [key: string]: string } = {
  Casque: casqueSrc,
  Corde: cordeSrc,
  Harnais: harnaisSrc,
  Mousqueton: mousquetonSrc,
  Sangle: sangleSrc,
  "Système d'assurage": systemeassurageSrc,
};

export const IconEPI = ({
  type,
  width = 150,
  height = 50,
  className,
}: Props) => {
  const src = iconSrc[type];

  if (!src) {
    return <div>N/C</div>;
  }

  return (
    <img
      src={src}
      alt={`${type} Icon`}
      className={classNames("h-full", className)}
      width={width}
      height={height}
    />
  );
};
