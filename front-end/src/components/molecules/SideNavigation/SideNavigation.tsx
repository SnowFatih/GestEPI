import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import {
  TbBuilding,
  TbFlagExclamation,
  TbHome,
  TbPlane,
  TbTool,
  TbUsers,
  TbX,
} from "react-icons/tb";

import { Logo } from "@/components/atoms/Logo";
import { NavLink } from "@/components/molecules/NavLink";
import { NavMenu } from "@/components/molecules/NavMenu";

type SidebarLink = {
  name: string;
  to: string;
  icon: React.ReactNode;
  id: number;
  admin?: boolean;
};

const SIDEBAR_LINKS: SidebarLink[] = [
  {
    name: "Page d'accueil",
    to: "/",
    icon: <TbHome />,
    id: 1,
  },
  {
    name: "Avions",
    to: "/avions",
    icon: <TbPlane />,
    id: 2,
  },
  {
    name: "Mécaniciens",
    to: "/mecaniciens",
    icon: <TbUsers />,
    id: 3,
  },
  {
    name: "Entretiens",
    to: "/entretiens",
    icon: <TbTool />,
    id: 4,
  },
];

interface Props {
  sidebarOpen: boolean;
  onChangeSidebar: (value: boolean) => void;
  isAdmin?: boolean;
  navigationGroup?: string;
}

const getSidebarLinks = (links: SidebarLink[], isAdmin?: boolean) => {
  return isAdmin ? links : links.filter((link) => !link.admin);
};

export const SideNavigation = ({
  sidebarOpen,
  onChangeSidebar,
  isAdmin = false,
  navigationGroup,
}: Props) => {
  const links = getSidebarLinks(SIDEBAR_LINKS, isAdmin);
  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-[3000] md:hidden"
          onClose={() => onChangeSidebar(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-400 bg-opacity-70 backdrop-blur-sm" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-12 pb-small bg-white">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-10 -right-2 -mr-12 pt-2">
                  <button
                    type="button"
                    className="flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => onChangeSidebar(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <TbX
                      className="border border-gray-300 rounded-full w-10 h-10 p-1 bg-white/70 backdrop-blur-lg"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 flex items-center px-5 self-center">
                <Logo />
              </div>
              <div className="mt-base flex-1 overflow-y-auto border-t">
                <nav className="px-2 space-y-1">
                  {links.map((link) => (
                    <NavLink
                      link={link.to}
                      title={link.name}
                      icon={link.icon}
                      key={link.name}
                    />
                  ))}
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>
      <NavMenu links={links} currentPath={navigationGroup} />
    </>
  );
};
