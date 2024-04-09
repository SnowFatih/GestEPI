import React from "react";
import { TbExclamationCircle, TbChecklist } from "react-icons/tb";
import { Typography } from "@/components/atoms/Typography";
import { RetardBlock } from "@/components/molecules/RetardBlock";
import classNames from "classnames";
import { EPI } from "@/types/type";

interface Props {
  epiOverdue: EPI[];
}

export const RetardBlocks: React.FC<Props> = ({ epiOverdue }) => {
  return (
    <div className="relative items-center flex flex-col">
      <div className="bg-[#F9C900] rounded-full w-fit p-2 -mb-10 z-50">
        <TbExclamationCircle size={50} />
      </div>
      <div className="flex flex-col bg-[#131D25] rounded-b-2xl pb-6 rounded-t-[55px] p-3 px-6 items-center gap-2 justify-center text-center w-fit">
        <div className="pt-8">
          <Typography
            variant="h5"
            weight="semibold"
            align="center"
            customColor="text-[#F9C900]"
          >
            Contrôles en retard
          </Typography>
          <div
            className={classNames(
              "flex mt-4 flex-col gap-2 justify-center max-h-80",
              epiOverdue.length > 3 && "overflow-x-auto px-1 pt-14"
            )}
          >
            {epiOverdue.length > 0 ? (
              epiOverdue.map((epi: any) => (
                <RetardBlock
                  key={epi.id} // Assurez-vous que `epi` a une propriété `id` unique.
                  epi={epi}
                  lastControlDate={epi.inServiceDate}
                />
              ))
            ) : (
              <div className="max-w-[240px]">
                <dl className="rounded-xl overflow-auto border-b-4 border bg-white shadow-lg border-emerald-400">
                  <div className="flex border-gray-100 p-2 px-4 items-center gap-1 justify-center">
                    <TbChecklist className="w-8 h-8" />
                    <Typography variant="h4" weight="semibold">
                      Aucun retard
                    </Typography>
                  </div>
                </dl>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
