"use client";

import React from "react";

import Details from "@/components/dashboard/home/Details";
import Activity from "@/components/dashboard/home/Activity";
import Statistics from "@/components/dashboard/home/statistics/Statistics";

const FormalSector = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="py-5 px-10 w-full flex flex-col gap-2.5">
        <Details isSuperUser={true} mode={"formal"} />
        <Statistics isSuperUser={true} mode={"formal"} />
        <Activity showModePicker={true} mode={"formal"} />
      </div>
    </div>
  );
};

export default FormalSector;
