import React, { useState, useEffect } from "react";
import axios from "axios";
import { Entretien, EpiType, Mecanicien } from "@/types/type";
import { Typography } from "@/components/atoms/Typography";
import { DashboardLayout } from "@/components/templates/DashboardLayout";
import StatCardGrid from "@/components/molecules/StatCardGrid/StatCardGrid";

import { TbTool, TbUsers } from "react-icons/tb";

export const HomePage = () => {
  const [epiTypes, setEpiTypes] = useState<EpiType[]>([]);
  useEffect(() => {
    const fetchAvions = async () => {
      try {
        const response = await axios.get("http://localhost:5500/epi-types");
        setEpiTypes(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des types d'EPI");
      }
    };

    fetchAvions();
  }, []);

  const [mecaniciens, setMecaniciens] = useState<Mecanicien[]>([]);
  useEffect(() => {
    const fetchMecaniciens = async () => {
      try {
        const response = await axios.get("http://localhost:5500/mecaniciens");
        setMecaniciens(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des mecaniciens");
      }
    };

    fetchMecaniciens();
  }, []);

  const [entretiens, setEntretiens] = useState<Entretien[]>([]);
  useEffect(() => {
    const fetchEntretiens = async () => {
      try {
        const response = await axios.get("http://localhost:5500/entretiens");
        setEntretiens(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des entretiens");
      }
    };

    fetchEntretiens();
  }, []);

  const mecanicienAvecAvion = mecaniciens.filter(
    (mecanicien) => mecanicien.idAvion !== null
  );

  const mecanicienSansAvion = mecaniciens.filter(
    (mecanicien) => mecanicien.idAvion === null
  );

  const entretiensEnCours = entretiens.length;

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl text-center mt-10">
        <Typography variant="h1" weight="semibold" align="center">
          Bienvenue sur le back-office GestEPI
        </Typography>
        <Typography variant="h3" marginClass="mt-4" align="center" color="gray">
          Ayez un aperçu de l'ensemble des différentes sections
        </Typography>
      </div>

      <StatCardGrid
        title="Équipements de Protection Individuel"
        icon={<TbTool />}
        stats={[
          {
            title: "Types de matériel au total",
            value: epiTypes.length,
            color: "text-green-600",
          },
        ]}
      />

      <StatCardGrid
        title="Mécaniciens"
        icon={<TbUsers />}
        stats={[
          {
            title: "Mécaniciens au total",
            value: mecaniciens.length,
            color: "text-green-600",
          },
          {
            title: "Mécaniciens avec avion",
            value: mecanicienAvecAvion.length,
            suffix: `/ ${mecaniciens.length}`,
            suffixColor: "text-green-300",
            color: "text-green-600",
          },
          {
            title: "Mécaniciens sans avion",
            value: mecanicienSansAvion.length,
            suffix: `/ ${mecaniciens.length}`,
            color: "text-red-600",
            suffixColor: "text-red-300",
          },
        ]}
      />

      <StatCardGrid
        title="Entretiens"
        icon={<TbTool />}
        stats={[
          {
            title: "Entretiens au total",
            value: entretiensEnCours,
            color: "text-green-600",
          },
          {
            title: "Entretiens en cours",
            value: mecanicienAvecAvion.length,
            color: "text-orange-600",
            suffixColor: "text-orange-300",
            suffix: `/ ${entretiens.length}`,
          },
          {
            title: "Entretiens terminés",
            value: mecanicienSansAvion.length,
            color: "text-green-600",
            suffixColor: "text-green-300",
            suffix: `/ ${entretiens.length}`,
          },
        ]}
      />
    </DashboardLayout>
  );
};
