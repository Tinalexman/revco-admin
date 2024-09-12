"use client";

import React, { useState } from "react";

const Dashboard = () => {
  const [state, setState] = useState<string>("");

  return (
    <div className="w-full flex flex-col">
      <div className="px-8 bg-white w-full h-[4.5rem]">
        <div className="w-full flex flex-col justify-around border-t border-gray-4 py-2">
          <h2 className="text-monokai font-semibold text-dash-intro-header">
            Welcome to {state} State Revenue Board Admin Portal
          </h2>
          <h3 className="text-primary text-reg-caption">
            Manage all transactions and data on the Revco service
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
