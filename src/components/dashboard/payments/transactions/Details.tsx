import React, { useState } from "react";

import Dropdown from "@/components/reusable/Dropdown";
import { useGetStatisticsSummary } from "@/hooks/dashboardHooks";
import { Loader } from "@mantine/core";
import { allFilters, getDateRange } from "@/functions/dateFunctions";

import { IoReceiptSharp } from "react-icons/io5";
import { PiWalletFill } from "react-icons/pi";
import { AiOutlineFileDone } from "react-icons/ai";
import { FaHandshakeSimple } from "react-icons/fa6";

interface iRevenueItem {
  value: number;
  title: string;
  subtitle: number;
  icon: any;
}

const Details = () => {
  const [filter, setFilter] = useState<string>("Today");

  const {
    loading: loadingSummary,
    getStatisticsSummary,
    data: statsSummary,
  } = useGetStatisticsSummary();

  const revenueItems: iRevenueItem[] = [
    {
      title: "Total Amount on Invoice Generated",
      value: statsSummary.totalInvoiceGeneratedInNaira,
      subtitle: 3000,
      icon: <PiWalletFill size={20} className="text-primary" />,
    },
    {
      title: "Total Amount on Invoice Collected",
      value: statsSummary.totalRevenue,
      subtitle: 3000,
      icon: <IoReceiptSharp size={20} className="text-primary" />,
    },
    {
      title: "Total Amount Remitted",
      value: statsSummary.totalAmountRemitted,
      subtitle: 3000,
      icon: <AiOutlineFileDone size={20} className="text-primary" />,
    },
    {
      title: "Total Comission (10%)",
      value: statsSummary.totalCommissionInNaira.total,
      subtitle: 3000,
      icon: <FaHandshakeSimple size={20} className="text-primary" />,
    },
  ];

  return (
    <div className="w-full flex flex-col gap-2.5">
      <div className="h-14 bg-white rounded-xl w-full flex items-center justify-between px-7">
        <p className="font-semibold text-dash-header text-gray-5">
          Transactions
        </p>
        <div className="w-[110px]">
          <Dropdown
            menus={allFilters.map((v, i) => ({
              name: v,
              onClick: () => {
                setFilter(v);
                const dateRange = getDateRange(v);
                getStatisticsSummary(dateRange[0], dateRange[1]);
              },
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
              {loadingSummary ? (
                <Loader color="primary.6" size={24} />
              ) : (
                <h2 className="text-dash-intro-header font-semibold text-gray-5">
                  ₦{it.value.toLocaleString("en-US")}
                </h2>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;
