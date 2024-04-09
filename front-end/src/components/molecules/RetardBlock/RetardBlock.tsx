import { Typography } from "@/components/atoms/Typography";
import { EPI } from "@/types/type";
import { formatDateString } from "@/utils/date";
import classNames from "classnames";
import React from "react";
import { TbExternalLink } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

type Props = {
  epi: EPI;
  lastControlDate?: string;
};

export const RetardBlock: React.FC<Props> = ({
  epi,
  lastControlDate,
}: Props) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/epi/details/${epi.id}`)}
      className="hover:cursor-pointer hover:scale-[102%] max-w-[240px] transform transition duration-300 ease-in-out"
    >
      <dl className="rounded-xl overflow-auto border-b-4 border bg-white shadow-lg border-[#F9C900]">
        <div className="flex flex-col border-gray-100 p-2 px-4">
          <Typography variant="h4" weight="semibold">
            {epi.brand} {epi.model} [{epi.innerId}]
          </Typography>

          <div className="mt-1">
            <Typography variant="small" color="gray" weight="medium">
              dernier contrôle effectué le
            </Typography>
            <Typography variant="smallParagraph" color="gray" weight="semibold">
              {formatDateString(lastControlDate || "N/C")}
            </Typography>
          </div>
        </div>
      </dl>
    </div>
  );
};
