"use client";

import React, { useState } from "react";
import Dropdown from "../reusable/Dropdown";

import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FaReceipt } from "react-icons/fa6";

interface iDashboardItem {
  value: number;
  title: string;
  subtitle: number;
  icon: any;
}

const Dashboard = () => {
  const [state, setState] = useState<string>("");
  const [filter, setFilter] = useState<string>("");

  const [revenueItems, setRevenueItems] = useState<iDashboardItem[]>([
    {
      title: "Total Revenue",
      value: 1450000,
      subtitle: 3000,
      icon: <RiMoneyDollarCircleFill size={20} className="text-primary" />,
    },
    {
      title: "Total Invoice Generated",
      value: 1450000,
      subtitle: 3000,
      icon: <RiMoneyDollarCircleFill size={20} className="text-primary" />,
    },
    {
      title: "Total Commission",
      value: 1450000,
      subtitle: 3000,
      icon: <RiMoneyDollarCircleFill size={20} className="text-primary" />,
    },
    {
      title: "Total Amount Remitted",
      value: 1450000,
      subtitle: 3000,
      icon: <RiMoneyDollarCircleFill size={20} className="text-primary" />,
    },
  ]);

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
      <div className="py-5 px-10 w-full flex flex-col gap-2.5">
        <div className="h-14 bg-white rounded-xl w-full flex items-center justify-between px-7">
          <p className="font-semibold text-dash-header text-gray-5">
            Dashboard Overview
          </p>
          <div className="w-[90px]">
            <Dropdown
              menus={["Daily", "Monthly", "Yearly"].map((v, i) => ({
                name: v,
                onClick: () => setFilter(v),
              }))}
              value={filter}
              hint={"Select"}
            />
          </div>
        </div>
        <div className="w-full grid grid-cols-4 gap-2.5">
          {revenueItems.map((it, i) => (
            <div
              className="bg-white w-full rounded-2xl px-6 py-3 gap-6 h-44 flex flex-col justify-end items-start"
              key={i}
            >
              <div className="bg-primary-accent rounded-full p-2">
                {it.icon}
              </div>
              <div className="w-full flex flex-col">
                <h3 className="text-med-button text-[#9EA4AA]">{it.title}</h3>
                <h2 className="text-dash-intro-header font-semibold text-gray-5">
                  ₦{it.value.toLocaleString("en-US")}
                </h2>
                <h6 className="text-[#615E83] text-[0.865rem] leading-[0.975rem] text-end">
                  {it.subtitle}
                </h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
