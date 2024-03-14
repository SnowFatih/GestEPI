import React, { Fragment, useState } from "react";
import { useLocation } from "react-router-dom";
import { DashboardHeader } from "@/components/molecules/DashboardHeader/DashboardHeader";
import { SideNavigation } from "@/components/molecules/SideNavigation";

type Props = {
  children: React.ReactNode | React.ReactNode[];
  headerTitle?: string;
};

export const DashboardLayout = ({
  children = <Fragment />,
  headerTitle,
}: Props): JSX.Element => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();
  const sideNavigationGroup = location.pathname.split("/").filter((x) => x)[0];

  return (
    <>
      <div className="bg-[#F9F9F9] min-h-screen h-full overflow-x-clip">
        <DashboardHeader
          onChangeSidebar={(value) => setSidebarOpen(value)}
          headerTitle={headerTitle}
        />

        <SideNavigation
          sidebarOpen={sidebarOpen}
          onChangeSidebar={(value) => setSidebarOpen(value)}
          navigationGroup={`/${sideNavigationGroup}`}
        />
        <div className="md:pl-64 flex flex-col flex-1 -z-50">
          <main className="flex-1 w-full ">
            <div className="py-text">
              <div className="p-6">
                <div className="flex flex-col">{children}</div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
