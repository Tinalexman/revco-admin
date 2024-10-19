import React, { useState } from "react";

import { RiMoneyDollarCircleFill } from "react-icons/ri";
import Dropdown from "@/components/reusable/Dropdown";
import { useGetStatisticsSummary } from "@/hooks/dashboardHooks";
import { Loader } from "@mantine/core";

interface iRevenueItem {
  value: number;
  title: string;
  subtitle: number;
  icon: any;
}

const Details = () => {
  const [filter, setFilter] = useState<string>("Yearly");

  const {
    loading: loadingSummary,
    getStatisticsSummary,
    data: statsSummary, } = useGetStatisticsSummary();
  const revenueItems: iRevenueItem[] = [
    {
      title: "Total Revenue",
      value: statsSummary?.totalRevenue || 0,
      subtitle: 3000,
      icon: <RiMoneyDollarCircleFill size={20} className="text-primary" />,
    },
    {
      title: "Total Invoice Generated",
      value: statsSummary?.totalInvoiceGeneratedInNaira || 0,
      subtitle: 3000,
      icon: <RiMoneyDollarCircleFill size={20} className="text-primary" />,
    },
    {
      title: "Total Commission",
      value: statsSummary?.totalCommissionInNaira || 0,
      subtitle: 3000,
      icon: <RiMoneyDollarCircleFill size={20} className="text-primary" />,
    },
    {
      title: "Total Amount Remitted",
      value: statsSummary?.totalAmountRemitted || 0,
      subtitle: 3000,
      icon: <RiMoneyDollarCircleFill size={20} className="text-primary" />,
    },
  ];

  return (
    <div className="w-full flex flex-col gap-2.5">
      <div className="h-14 bg-white rounded-xl w-full flex items-center justify-between px-7">
        <p className="font-semibold text-dash-header text-gray-5">
          Transactions
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
            className="bg-white w-full rounded-xl px-6 py-3 gap-6 h-44 flex flex-col justify-end items-start"
            key={i}
          >
            <div className="bg-primary-accent rounded-full p-2">{it.icon}</div>
            <div className="w-full flex flex-col">
              <h3 className="text-med-button text-[#9EA4AA]">{it.title}</h3>
              {
                loadingSummary ? <Loader color="primary.6" size={24} /> : <h2 className="text-dash-intro-header font-semibold text-gray-5">
                  ₦{it.value.toLocaleString("en-US")}
                </h2>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;
