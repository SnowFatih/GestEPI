import React from "react";
import { Route, Routes } from "react-router-dom";
import { TbHome, TbTool } from "react-icons/tb";
import { HomePage } from "@/components/pages/HomePage";
import { ErrorLayout } from "@/components/templates/ErrorLayout";
import { Button } from "@/components/molecules/Button";
import { EpiTypeListPage } from "@/components/pages/EpiTypeListPage";
import { SidebarLink } from "@/components/molecules/SideNavigation";
import { EpiCheckListPage } from "@/components/pages/EpiCheckListPage";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/epi/types" element={<EpiTypeListPage />} />
      <Route path="/epi/checks" element={<EpiCheckListPage />} />

      <Route
        path="*"
        element={
          <ErrorLayout>
            Désolé, cette page n'existe pas
            <Button href="/" label="Retour à l'accueil" marginClass="mt-4" />
          </ErrorLayout>
        }
      />
    </Routes>
  );
};

export const SIDEBAR_LINKS: SidebarLink[] = [
  {
    name: "Page d'accueil",
    to: "/",
    icon: <TbHome />,
    id: 1,
  },
  {
    name: "Liste d'équipements",
    to: "/epi/types",
    icon: <TbTool />,
    id: 2,
  },
  {
    name: "Contrôle des EPI",
    to: "/epi/checks",
    icon: <TbTool />,
    id: 3,
  },
];
