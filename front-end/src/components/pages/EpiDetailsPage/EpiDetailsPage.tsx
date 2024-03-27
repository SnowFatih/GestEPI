import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { Typography } from "@/components/atoms/Typography";
import {
  CheckFrequencyUnit,
  CheckStatus,
  EPI,
  EpiCheck,
  EpiType,
  User,
} from "@/types/type";
import { getEpiTypeName } from "@/utils/getEpiTypeName";
import { DashboardLayout } from "@/components/templates/DashboardLayout";
import {
  TbBuildingFactory2,
  TbCalendarTime,
  TbColorFilter,
  TbEdit,
  TbRocket,
  TbSettings,
  TbShoppingCart,
  TbTool,
  TbTrash,
  TbUser,
  TbX,
  TbZoomIn,
} from "react-icons/tb";
import { Spinner } from "@/components/atoms/Spinner";

import { Button } from "@/components/molecules/Button";
import { IconEPI } from "@/components/atoms/IconEPI";
import { formatDateString } from "@/utils/date";
import { getUserNameById } from "@/utils/getUserNameById";
import { EpiListDeleteModal } from "@/components/molecules/EpiListDeleteModal";
import toast from "react-hot-toast";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export const EpiDetailsPage = () => {
  const [epi, setEpi] = useState<EPI | null>(null);
  const [epiChecks, setEpiChecks] = useState<EpiCheck[]>([]);
  const [epiList, setEpiList] = useState<EPI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { epiId } = useParams<{ epiId: string }>();
  const [epiTypes, setEpiTypes] = useState<EpiType[]>([]);
  const [epiUsers, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const [modalState, setModalState] = useState({ delete: false });

  useEffect(() => {
    const fetchEpiDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5500/epi?id=${epiId}`
        );
        console.log("EPI récupéré:", response.data);

        setEpi(response.data[0]);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails de l'EPI:",
          error
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchEpiDetails();

    const fetchEpiTypes = async () => {
      try {
        const response = await axios.get("http://localhost:5500/types");
        setEpiTypes(response.data);
        console.log("Epi type récupérés:", response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des epiTypes", error);
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

    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5500/users");
        setUsers(response.data);
        console.log("Users récupérés:", response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des users");
      }
    };
    fetchUsers();
  }, [epiId]);

  if (isLoading || !epi) {
    return (
      <DashboardLayout>
        <div className="flex m-auto justify-center mt-80">
          <Spinner />
        </div>
      </DashboardLayout>
    );
  }

  const rawPurchaseDate = epi.purchaseDate;
  const formattedPurchaseDate = rawPurchaseDate
    ? formatDateString(rawPurchaseDate)
    : "en attente";
  const rawManufactureDate = epi.manufactureDate;
  const formattedManufactureDate = rawManufactureDate
    ? formatDateString(rawManufactureDate)
    : "en attente";
  const rawInServiceDate = epi.inServiceDate;
  const formattedInServiceDate = rawInServiceDate
    ? formatDateString(rawInServiceDate)
    : "en attente";

  const timeline = [
    {
      id: 1,
      target: "Fabrication",
      date: formattedManufactureDate,
      icon: TbBuildingFactory2,
      iconBackground: epi.manufactureDate ? "bg-green-500" : "bg-gray-400",
    },
    {
      id: 2,
      target: "Achat",
      date: formattedPurchaseDate,
      icon: TbShoppingCart,
      iconBackground: epi.purchaseDate ? "bg-green-500" : "bg-gray-400",
    },
    {
      id: 3,
      target: "Mise en service",
      date: formattedInServiceDate,
      icon: TbRocket,
      iconBackground: epi.inServiceDate ? "bg-green-500" : "bg-gray-400",
    },
  ];

  const totalChecks = epiChecks.filter(
    (check) => check.epiId === epi.id
  ).length;

  const isEpiOperational = epiChecks.some(
    (check) =>
      check.epiId === epi.id &&
      check.checkStatus === CheckStatus.CONFORME &&
      check.checkDate > (epi.inServiceDate ?? "")
  );

  const stats = [
    {
      label: totalChecks > 1 ? "Contrôles effectués" : "Contrôle effectué",
      value: totalChecks,
    },
    {
      label: epi.inServiceDate ? "EPI en service" : "EPI pas en service",
      value: epi.inServiceDate ? "✅" : "❌",
    },
    {
      label: isEpiOperational ? "EPI Conforme" : "EPI non conforme",
      value: isEpiOperational ? "✅" : "❌",
    },
  ];

  const actions = [
    {
      icon: TbSettings,
      name: "Informations générales",
      description: `Numéro de série : ${epi.serialNumber}`,
      secondDescription: `ID interne : ${epi.innerId}`,
      iconForeground: "text-teal-700",
      iconBackground: "bg-teal-50",
    },
    {
      icon: TbColorFilter,
      name: "Matériaux",
      color: true,
      description: `Taille : ${epi.size}m`,
      secondDescription: `Couleur : ${epi.color}`,
      iconForeground: "text-purple-700",
      iconBackground: "bg-purple-50",
    },
    {
      icon: TbCalendarTime,
      name: "Fréquence de contrôle",
      description: `${epi.checkFrequency} fois par ${
        epi.checkFrequencyUnit === CheckFrequencyUnit.MONTH
          ? "mois"
          : `${epi.checkFrequency > 1 ? "ans" : "an"}`
      }`,
      secondDescription: `${totalChecks} ${
        totalChecks > 1 ? "contrôles effectués" : "contrôle effectué"
      }`,
      iconForeground: "text-sky-700",
      iconBackground: "bg-sky-50",
    },
    {
      icon: TbUser,
      name: "Dernier contrôle",
      description: `Effectué par ${getUserNameById(
        epiUsers,
        epiChecks[0].userId
      )}`,
      iconForeground: "text-sky-700",
      iconBackground: "bg-sky-50",
    },
  ];

  const handleOpenDeleteModal = () => {
    setModalState({ ...modalState, delete: true });
  };

  const handleCloseModal = () => {
    setModalState({ delete: false });
  };

  const afterDeletionSuccess = async () => {
    toast.success("Suppression réussie", {
      duration: 4000,
      position: "bottom-right",
    });
    navigate(`/epi`);
  };

  return (
    <>
      <DashboardLayout>
        <div className="mt-10 flex items-center m-auto gap-5 border rounded-full bg-white px-6 py-2">
          <TbZoomIn size={30} />
          <Typography variant="h1" weight="semibold" align="center">
            Détails de l'équipement {getEpiTypeName(epiTypes, epi.epiType)} [
            {epi.innerId}]
          </Typography>
        </div>

        <div className="min-h-full mt-10">
          <main>
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              {/* Main 3 column grid */}
              <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
                {/* Left column */}
                <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                  {/* Welcome panel */}
                  <section aria-labelledby="profile-overview-title">
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                      <div className="bg-white p-6">
                        <div className="sm:flex sm:items-center sm:justify-between">
                          <div className="sm:flex sm:space-x-5">
                            <div className="flex-shrink-0">
                              <IconEPI
                                type={
                                  epiTypes.find(
                                    (type) => type.id === epi.epiType
                                  )?.label || ""
                                }
                                width={40}
                                height={40}
                                className="mx-auto h-20 w-20"
                              />
                            </div>
                            <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                              <p className="text-sm font-medium text-gray-600">
                                Équipement :
                              </p>
                              <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                                {getEpiTypeName(epiTypes, epi.epiType)} [
                                {epi.innerId}]
                              </p>
                              <p className="text-sm font-medium text-gray-600">
                                par {epi.brand} {epi.model}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <div className="mt-5 flex justify-center sm:mt-0 gap-2">
                              <Button
                                onClick={handleOpenDeleteModal}
                                icon={<TbTrash size={17} />}
                                label="Supprimer"
                                color="alert"
                              />
                              <Button
                                onClick={() => console.log("Modifier")}
                                icon={<TbEdit size={17} />}
                                label="Modifier"
                                color="primary"
                              />
                            </div>
                            <Button
                              href="/checks"
                              color="grey"
                              icon={<TbTool size={17} />}
                              label="Effectuer un contrôle"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-100/80 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                        {stats.map((stat) => (
                          <div
                            key={stat.label}
                            className="px-6 py-5 text-center text-sm font-medium"
                          >
                            <span className="text-gray-900">{stat.value}</span>{" "}
                            <span className="text-gray-600">{stat.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Actions panel */}
                  <section aria-labelledby="quick-links-title">
                    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
                      {actions.map((action, actionIdx) => (
                        <div
                          key={action.name}
                          className={classNames(
                            actionIdx === 0
                              ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
                              : "",
                            actionIdx === 1 ? "sm:rounded-tr-lg" : "",
                            actionIdx === actions.length - 2
                              ? "sm:rounded-bl-lg"
                              : "",
                            actionIdx === actions.length - 1
                              ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                              : "",
                            "group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500"
                          )}
                        >
                          <div>
                            <span
                              className={classNames(
                                action.iconBackground,
                                action.iconForeground,
                                "inline-flex rounded-lg p-3 ring-4 ring-white"
                              )}
                            >
                              <action.icon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                          <div className="mt-4">
                            <h3 className="text-lg font-medium">
                              <a className="focus:outline-none">
                                {action.name}
                              </a>
                            </h3>
                            <div className="mt-1 ml-2 text-sm text-gray-500 flex flex-col gap-1">
                              <p>{action.description}</p>
                              <div className="flex items-center gap-2">
                                <p>{action.secondDescription}</p>
                                {action.color && (
                                  <div
                                    style={{
                                      backgroundColor: epi.color,
                                    }}
                                    className="w-8 h-8 rounded-full border border-black/70"
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                {/* Right column */}
                <div className="grid grid-cols-1 gap-4">
                  <section>
                    <div className="rounded-lg bg-white shadow">
                      <div className=" p-5">
                        <h2 className="text-base font-medium text-gray-900">
                          Les dernières dates
                        </h2>
                        <ul className="-mb-8 mt-6">
                          {timeline.map((event, eventIdx) => (
                            <li key={event.id}>
                              <div className="relative pb-8">
                                {eventIdx !== timeline.length - 1 ? (
                                  <span
                                    className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                                    aria-hidden="true"
                                  />
                                ) : null}
                                <div className="relative flex space-x-3">
                                  <div>
                                    <span
                                      className={classNames(
                                        event.iconBackground,
                                        "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                                      )}
                                    >
                                      <event.icon
                                        className="h-5 w-5 text-white"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  </div>
                                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                    <div>
                                      <p className="text-sm text-gray-500">
                                        <a className="font-medium text-gray-900">
                                          {event.target}
                                        </a>
                                      </p>
                                    </div>
                                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                      {event.date}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </main>
          <footer className="mt-10">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="border-t border-gray-200 py-8 text-center text-sm text-gray-500 sm:text-left">
                <div className="w-fit">
                  <Button href="/epi" label="Retour aux EPI" />
                </div>
              </div>
            </div>
          </footer>
        </div>
      </DashboardLayout>

      {modalState.delete && epi && (
        <EpiListDeleteModal
          isOpen={modalState.delete}
          onClose={handleCloseModal}
          epi={epi}
          epiTypes={epiTypes}
          onSuccess={afterDeletionSuccess}
        />
      )}
    </>
  );
};
