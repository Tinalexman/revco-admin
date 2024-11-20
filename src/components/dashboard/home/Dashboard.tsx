"use client";

import React from "react";

import Details from "@/components/dashboard/home/Details";
import Activity from "@/components/dashboard/home/Activity";
import Statistics from "@/components/dashboard/home/statistics/Statistics";
import { canViewCommissions } from "@/functions/navigationFunctions";
import { useRevcoUserStore } from "@/stores/userStore";

const Dashboard = () => {
  const role = useRevcoUserStore((state) => state.role);
  const isSuperUser = canViewCommissions(role);

  return (
    <div className="w-full flex flex-col">
      <div className="px-8 bg-white w-full h-[4.5rem]">
        <div className="w-full flex flex-col justify-around py-2">
          <h2 className="text-monokai font-semibold text-dash-intro-header">
            Welcome to Taraba State Board of Internal Revenue Admin Portal
          </h2>
          <h3 className="text-primary text-reg-caption">
            Manage all transactions and data on the Revco service
          </h3>
        </div>
      </div>
      <div className="py-5 px-10 w-full flex flex-col gap-2.5">
        <Details mode={null} isSuperUser={isSuperUser} />
        <Statistics mode={null} isSuperUser={isSuperUser} />
        {isSuperUser && <Activity mode={null} />}
      </div>
    </div>
  );
};

export default Dashboard;
