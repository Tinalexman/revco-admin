"use client";

import Dropdown from "@/components/reusable/Dropdown";
import { allFilters, getDateRange } from "@/functions/dateFunctions";
import React, { useState, ReactNode } from "react";
import Assessments from "./Assessments";
import Collections from "./Collections";
import Enumeration from "./Enumeration";
import GeneralOverview from "./GeneralOverview";
import Remittance from "./Remittance";
import { useInformalSector } from "@/stores/informalSector";

const InformalSector = () => {
  const modes: string[] = [
    "General Overview",
    "Enumeration",
    "Assessments",
    "Collections",
    "Cash Remittance",
  ];
  const [filter, setFilter] = useState<string>("Today");
  const [activeMode, setActiveMode] = useState<number>(0);

  const children: ReactNode[] = [
    <GeneralOverview />,
    <Enumeration />,
    <Assessments />,
    <Collections />,
    <Remittance />,
  ];

  return (
    <div className="w-full flex flex-col gap-6 py-5">
      <div className="w-full px-8">
        <div className="h-fit py-3 bg-white rounded-xl w-full flex flex-col gap-2 px-7">
          <div className="w-full flex items-center justify-between border-b border-[#D1D1D6] pb-2">
            <p className="font-semibold text-dash-header text-gray-5">
              Informal Sector Overview
            </p>
            <div className="w-[115px]">
              <Dropdown
                menus={allFilters.map((v, i) => ({
                  name: v,
                  onClick: () => {
                    setFilter(v);
                    const dates = getDateRange(v);
                    useInformalSector.setState({
                      range: { start: dates[0], end: dates[1] },
                    });
                  },
                }))}
                value={filter}
                hint={"Select"}
              />
            </div>
          </div>
          <div className="w-fit bg-[#F1F2F3] rounded-xl py-1 px-1 flex items-center">
            {modes.map((md, i) => {
              return (
                <div
                  onClick={() => {
                    setActiveMode(i);
                    setFilter(allFilters[0]);
                    const dates = getDateRange(allFilters[0]);
                    useInformalSector.setState({
                      range: { start: dates[0], end: dates[1] },
                    });
                  }}
                  key={i}
                  className={`${
                    i === activeMode
                      ? "text-primary bg-white"
                      : "text-[#A9A9A9]"
                  } cursor-pointer py-1 px-2 ${
                    i === 0
                      ? "rounded-l-lg"
                      : i === modes.length - 1
                      ? "rounded-r-lg"
                      : ""
                  } font-semibold text-reg-caption`}
                >
                  {md}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-full px-8">{children[activeMode]}</div>
    </div>
  );
};

export default InformalSector;
