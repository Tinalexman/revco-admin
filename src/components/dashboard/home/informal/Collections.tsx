import React, { useEffect } from "react";

import { useGetStatisticsSummary } from "@/hooks/dashboardHooks";
import { Loader } from "@mantine/core";
import { IoReceiptSharp } from "react-icons/io5";
import { PiWalletFill, PiUsersFill } from "react-icons/pi";
import { AiOutlineFileDone } from "react-icons/ai";
import { FaHandshakeSimple } from "react-icons/fa6";
import Activity from "../../common/Activity";
import { useInformalSector } from "@/stores/informalSector";

interface iRevenueItem {
  value: number;
  title: string;
  subtitle: number;
  icon: any;
}

const Collections = () => {
  const range = useInformalSector((state) => state.range);
  const {
    loading: loadingSummary,
    data: statsSummary,
    getStatisticsSummary,
  } = useGetStatisticsSummary("informal");

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

  useEffect(() => {
    getStatisticsSummary(range.start, range.end);
  }, [range]);

  return (
    <div className="w-full flex flex-col gap-2.5">
      <div className="w-full grid grid-cols-4 gap-2.5">
        {revenueItems.map((it, i) => (
          <div
            className="bg-white w-full rounded-xl px-6 py-3 gap-6 h-44 flex flex-col justify-end items-start"
            key={i}
          >
            <div className="bg-primary-accent rounded-full p-2">{it.icon}</div>
            <div className="w-full flex flex-col">
              <h3 className="text-small text-[#9EA4AA]">{it.title}</h3>
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
      <Activity mode={"informal"} />
    </div>
  );
};

export default Collections;
