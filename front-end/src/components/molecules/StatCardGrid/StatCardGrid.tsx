import { Typography } from "@/components/atoms/Typography";
import React from "react";

interface Stat {
  title: string;
  value: number | string;
  color: string;
  suffix?: string;
  suffixColor?: string;
}

interface StatCardGridProps {
  title?: string;
  icon?: React.ReactNode;
  stats: Stat[];
}

const StatCardGrid: React.FC<StatCardGridProps> = ({ title, stats, icon }) => {
  return (
    <div>
      {title && (
        <div className="flex gap-2 w-fit items-center mt-10 py-2 border-gray-800 bg-[#131D25] px-10 rounded-t-3xl shadow-lg">
          {icon && <div className="text-2xl text-[#F9C900]">{icon}</div>}
          <Typography
            variant="h4"
            weight="semibold"
            customColor="text-[#F9C900]"
          >
            {title}
          </Typography>
        </div>
      )}

      <div className="relative">
        <div className="mx-auto max-w-4xl">
          <dl className="rounded-3xl rounded-tl-none overflow-auto border-gray-800 bg-[#131D25] shadow-lg sm:grid sm:grid-cols-3">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`flex flex-col border-gray-800 p-6 text-center ${
                  index !== 0 && "sm:border-l"
                } ${
                  index < stats.length - 1 ? "border-b sm:border-r" : "border-t"
                }`}
              >
                <dt className="order-2 mt-2">
                  <Typography variant="h6" weight="semibold" color="white">
                    {stat.title}
                  </Typography>
                </dt>
                <span className="flex gap-2 justify-center items-end">
                  <dd
                    className={`order-1 text-5xl font-bold tracking-tight ${stat.color}`}
                  >
                    {stat.value}
                  </dd>
                  {stat.suffix && (
                    <dd
                      className={`order-1 text-2xl font-bold tracking-tight ${stat.suffixColor}`}
                    >
                      {stat.suffix}
                    </dd>
                  )}
                </span>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default StatCardGrid;
