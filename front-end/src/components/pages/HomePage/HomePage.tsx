import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CheckFrequencyUnit,
  CheckStatus,
  EPI,
  EpiCheck,
  EpiType,
} from "@/types/type";
import { Typography } from "@/components/atoms/Typography";
import { DashboardLayout } from "@/components/templates/DashboardLayout";
import StatCardGrid from "@/components/molecules/StatCardGrid/StatCardGrid";

import { TbHexagonLetterE, TbTool } from "react-icons/tb";
import moment from "moment";
import { RetardBlocks } from "@/components/molecules/RetardBlock/RetardBlocks";

export const HomePage = () => {
  const [epiTypes, setEpiTypes] = useState<EpiType[]>([]);
  const [epiChecks, setEpiChecks] = useState<EpiCheck[]>([]);
  const [epiList, setEpiList] = useState<EPI[]>([]);
  const [epiOverdue, setEpiOverdue] = useState<EPI[]>([]);

  useEffect(() => {
    const fetchEpiList = async () => {
      try {
        const response = await axios.get("http://localhost:5500/epi");
        setEpiList(response.data);
        checkForOverdueEpi(response.data, epiChecks);
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

  const checkForOverdueEpi = (epis: EPI[], epiChecks: EpiCheck[]) => {
    const today = moment();
    const overdueEpis = epis.filter((epi) => {
      // Trouver les contrôles pour cet EPI et prendre la date du dernier contrôle
      const epiChecksForEpi = epiChecks.filter(
        (check) => check.epiId === epi.id
      );
      let lastCheckDate = epi.inServiceDate;
      if (epiChecksForEpi.length > 0) {
        // Trier les contrôles par date dans l'ordre décroissant et prendre le premier
        const sortedChecks = epiChecksForEpi.sort(
          (a, b) =>
            moment(b.checkDate).valueOf() - moment(a.checkDate).valueOf()
        );
        lastCheckDate = sortedChecks[0].checkDate;
      }

      // Calculer la prochaine date de contrôle à partir de la dernière date de contrôle ou de la date de mise en service
      const nextCheckDate = moment(lastCheckDate).add(
        epi.checkFrequency,
        epi.checkFrequencyUnit === CheckFrequencyUnit.YEAR ? "years" : "months"
      );

      // Vérifier si cette date est passée
      return nextCheckDate.isBefore(today);
    });

    setEpiOverdue(overdueEpis);
  };

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

      <section className="flex m-auto w-full justify-around mt-14">
        <section>
          <StatCardGrid
            title="Équipements de Protection Individuel"
            icon={<TbHexagonLetterE />}
            stats={[
              {
                title: "Types de matériel au total",
                value: epiTypes.length,
                color: "text-emerald-400",
              },
              {
                title: "Équipements au total",
                value: epiList.length,
                color: "text-emerald-400",
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
                color: "text-emerald-400",
              },
              {
                title: "Réalisés en " + monthName,
                value: checksThisMonth.length,
                color: "text-emerald-400",
              },
              {
                title: "Contrôles conforme",
                value: epiChecks.filter(
                  (check) => check.checkStatus === CheckStatus.CONFORME
                ).length,
                suffix: "/" + epiChecks.length,
                suffixColor: "text-gray-400",
                color: "text-emerald-400",
              },
            ]}
          />
        </section>
        <div className=" border-l border-2 rounded-full border-[#F9C900] -my-5" />
        <section>
          <RetardBlocks epiOverdue={epiOverdue} />
        </section>
      </section>
    </DashboardLayout>
  );
};
