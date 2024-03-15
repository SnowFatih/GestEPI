import React, { useState, useEffect } from "react";
import axios from "axios";
import { EpiType } from "@/types/type";
import { Typography } from "@/components/atoms/Typography";
import { DashboardLayout } from "@/components/templates/DashboardLayout";
import StatCardGrid from "@/components/molecules/StatCardGrid/StatCardGrid";

import { TbTool } from "react-icons/tb";

export const HomePage = () => {
  const [epiTypes, setEpiTypes] = useState<EpiType[]>([]);
  useEffect(() => {
    const fetchAvions = async () => {
      try {
        const response = await axios.get("http://localhost:5500/types");
        setEpiTypes(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des types d'EPI");
      }
    };

    fetchAvions();
  }, []);

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
    </DashboardLayout>
  );
};
