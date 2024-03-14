import React from "react";
import { Route, Routes } from "react-router-dom";

import { HomePage } from "@/components/pages/HomePage";
import { ErrorLayout } from "@/components/templates/ErrorLayout";
import { AvionListPage } from "@/components/pages/AvionListPage";
import { Button } from "@/components/molecules/Button";
import { MecanicienListPage } from "@/components/pages/MecanicienListPage";
import { EntretienListPage } from "@/components/pages/EntretienListPage";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/avions" element={<AvionListPage />} />
      <Route path="/mecaniciens" element={<MecanicienListPage />} />
      <Route path="/entretiens" element={<EntretienListPage />} />

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
