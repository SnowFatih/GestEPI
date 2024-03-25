import React from "react";
import { Route, Routes } from "react-router-dom";
import { TbHexagonLetterE, TbHome, TbList, TbTool } from "react-icons/tb";
import { HomePage } from "@/components/pages/HomePage";
import { ErrorLayout } from "@/components/templates/ErrorLayout";
import { Button } from "@/components/molecules/Button";
import { EpiTypeListPage } from "@/components/pages/EpiTypeListPage";
import { SidebarLink } from "@/components/molecules/SideNavigation";
import { EpiCheckListPage } from "@/components/pages/EpiCheckListPage";
import { EpiListPage } from "@/components/pages/EpiListPage";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/epi" element={<EpiListPage />} />
      <Route path="/types" element={<EpiTypeListPage />} />
      <Route path="/checks" element={<EpiCheckListPage />} />

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

export const SIDEBAR_FIRST_LINKS: SidebarLink[] = [
  {
    name: "Page d'accueil",
    to: "/",
    icon: <TbHome />,
    id: 1,
  },
  {
    name: "EPI",
    to: "/epi",
    icon: <TbHexagonLetterE />,
    id: 2,
  },
  {
    name: "Contrôle des EPI",
    to: "/checks",
    icon: <TbTool />,
    id: 3,
  },
];

export const SIDEBAR_SECOND_LINKS: SidebarLink[] = [
  {
    name: "Types d'EPI",
    to: "/types",
    icon: <TbList />,
    id: 1,
  },
];
