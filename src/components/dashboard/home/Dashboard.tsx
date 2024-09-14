"use client";

import React, { useState } from "react";

import Details from "./Details";
import Activity from "./activity/Activity";
import Statistics from "./statistics/Statistics";

const Dashboard = () => {
  const [state, setState] = useState<string>("Taraba");

  return (
    <div className="w-full flex flex-col">
      <div className="px-8 bg-white w-full h-[4.5rem]">
        <div className="w-full flex flex-col justify-around py-2">
          <h2 className="text-monokai font-semibold text-dash-intro-header">
            Welcome to {state} State Revenue Board Admin Portal
          </h2>
          <h3 className="text-primary text-reg-caption">
            Manage all transactions and data on the Revco service
          </h3>
        </div>
      </div>
      <div className="py-5 px-10 w-full flex flex-col gap-2.5">
        <Details />
        <Statistics />
        <Activity />
      </div>
    </div>
  );
};

export default Dashboard;
