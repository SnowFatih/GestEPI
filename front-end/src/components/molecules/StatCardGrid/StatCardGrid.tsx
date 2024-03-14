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
        <div className="flex gap-2 w-fit items-center mt-10 border-gray-100 m-auto bg-white px-10 pt-2 rounded-t-3xl shadow-lg">
          {icon && <div className="text-2xl">{icon}</div>}
          <Typography variant="h4" weight="semibold">
            {title}
          </Typography>
        </div>
      )}

      <div className="relative">
        <div className="mx-auto max-w-4xl">
          <dl className="rounded-3xl overflow-auto bg-white shadow-lg sm:grid sm:grid-cols-3">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`flex flex-col border-gray-100 p-6 text-center ${
                  index !== 0 && "sm:border-l"
                } ${
                  index < stats.length - 1 ? "border-b sm:border-r" : "border-t"
                }`}
              >
                <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
                  {stat.title}
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
