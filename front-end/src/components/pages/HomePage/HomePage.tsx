import React, { useState, useEffect } from "react";
import axios from "axios";
import { CheckStatus, EPI, EpiCheck, EpiType } from "@/types/type";
import { Typography } from "@/components/atoms/Typography";
import { DashboardLayout } from "@/components/templates/DashboardLayout";
import StatCardGrid from "@/components/molecules/StatCardGrid/StatCardGrid";

import { TbHexagonLetterE, TbTool } from "react-icons/tb";

export const HomePage = () => {
  const [epiTypes, setEpiTypes] = useState<EpiType[]>([]);
  const [epiChecks, setEpiChecks] = useState<EpiCheck[]>([]);
  const [epiList, setEpiList] = useState<EPI[]>([]);
  useEffect(() => {
    const fetchEpiList = async () => {
      try {
        const response = await axios.get("http://localhost:5500/epi");
        setEpiList(response.data);
        console.log("EpiList récupérés:", response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération de la liste des epis");
      }
    };
    fetchEpiList();

    const fetchEpiTypes = async () => {
      try {
        const response = await axios.get("http://localhost:5500/types");
        setEpiTypes(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des types d'EPI");
      }
    };

    fetchEpiTypes();

    const fetchEpiChecks = async () => {
      try {
        const response = await axios.get("http://localhost:5500/checks");
        setEpiChecks(response.data);
        console.log("EpiChecks récupérés:", response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des epiChecks");
      }
    };
    fetchEpiChecks();
  }, []);

  const today = new Date();
  const thisMonth = today.getMonth();
  const thisYear = today.getFullYear();
  const checksThisMonth = epiChecks.filter(
    (check) =>
      new Date(check.checkDate).getMonth() === thisMonth &&
      new Date(check.checkDate).getFullYear() === thisYear
  );

  const monthName = new Intl.DateTimeFormat("fr-FR", { month: "long" }).format(
    today
  );

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
        icon={<TbHexagonLetterE />}
        stats={[
          {
            title: "Types de matériel au total",
            value: epiTypes.length,
            color: "text-green-600",
          },
          {
            title: "Équipements au total",
            value: epiList.length,
            color: "text-green-600",
          },
        ]}
      />

      <StatCardGrid
        title="Contrôle des EPI"
        icon={<TbTool />}
        stats={[
          {
            title: "Réalisés au total",
            value: epiChecks.length,
            color: "text-green-600",
          },
          {
            title: "Réalisés en " + monthName,
            value: checksThisMonth.length,
            color: "text-green-600",
          },
          {
            title: "Contrôles conforme",
            value: epiChecks.filter(
              (check) => check.checkStatus === CheckStatus.CONFORME
            ).length,
            suffix: "/" + epiChecks.length,
            suffixColor: "text-gray-400",
            color: "text-green-600",
          },
        ]}
      />
    </DashboardLayout>
  );
};
