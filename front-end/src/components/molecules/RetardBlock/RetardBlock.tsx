import classNames from "classnames";
import React from "react";

type Props = {
  title: string;
  noRetard?: boolean;
};

export const RetardBlock: React.FC<Props> = ({
  title,
  noRetard = true,
}: Props) => {
  return (
    <div className="relative">
      <div className="mx-auto w-fit">
        <dl
          className={classNames(
            "rounded-3xl overflow-auto border-b-4 border bg-white shadow-lg",
            noRetard ? "border-red-400" : "border-green-400"
          )}
        >
          <div className="flex flex-col border-gray-100 p-6 text-centersm:border-l">
            <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
              en retard
            </dt>
            <span className="flex justify-center items-end">
              <dd className="order-1 text-xl font-bold tracking-tight">
                {title}
              </dd>
            </span>
          </div>
        </dl>
      </div>
    </div>
  );
};
