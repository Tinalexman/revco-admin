import React, { FC, useEffect, useState } from "react";

import Image, { StaticImageData } from "next/image";
import TaxPayersImage from "@/assets/dashboard/tax payers.png";
import {
  useGetStatisticsSummary,
  useGetUserActivity,
  useInformalRemittance,
  useInformalRemittanceSummary,
} from "@/hooks/dashboardHooks";
import { Loader } from "@mantine/core";
import { IoEye, IoReceiptSharp } from "react-icons/io5";
import { PiWalletFill, PiUsersFill } from "react-icons/pi";
import { AiOutlineFileDone } from "react-icons/ai";
import { FaHandshakeSimple } from "react-icons/fa6";
import Activity from "../../common/Activity";
import { getDateRange, iDateRange } from "@/functions/dateFunctions";
import Filters from "../../common/Filters";
import Paginator from "@/components/reusable/paginator/Paginator";
import { IoIosArrowDown } from "react-icons/io";
import StatusContainer, {
  STATE_SUCCESS,
  STATE_PENDING,
} from "@/components/reusable/StatusContainer";
import { useInformalSector } from "@/stores/informalSector";

interface iRevenueItem {
  value: number;
  title: string;
  subtitle: number;
  icon: any;

  sub?: {
    title: string;
    value: number;
  };
}

const Remittance = () => {
  const range = useInformalSector((state) => state.range);
  const currentDate = getDateRange("Today");
  const [dateRange, setDateRange] = useState<iDateRange>({
    start: currentDate[0],
    end: currentDate[0],
  });

  const {
    loading: loadingSummary,
    data: summary,
    getRemittanceSummary,
  } = useInformalRemittanceSummary();

  const [expanded, setExpanded] = useState<boolean>(false);

  const revenueItems: iRevenueItem[] = [
    {
      title: "Total amount of Cash Remittance Collected",
      value: summary.totalCollectedAmount,
      subtitle: 3000,
      icon: <PiWalletFill size={20} className="text-primary" />,
      sub: {
        title: "Total number of Cash Remittance collected",
        value: summary.collectedCount,
      },
    },
    {
      title: "Total Cash Remittance on Invoice Generated",
      value: summary.totalGeneratedAmount,
      subtitle: 3000,
      icon: <IoReceiptSharp size={20} className="text-primary" />,
      sub: {
        title: "Total number of Cash Remittance",
        value: summary.generatedCount,
      },
    },
    {
      title: "Total amount of Pending Cash Remittance ",
      value: summary.totalPendingAmount,
      subtitle: 3000,
      icon: <AiOutlineFileDone size={20} className="text-primary" />,
      sub: {
        title: "Total number of Pending Cash Remittance",
        value: summary.pendingCount,
      },
    },
    {
      title: "Total Comission (10%)",
      value: summary.totalComission,
      subtitle: 3000,
      icon: <FaHandshakeSimple size={20} className="text-primary" />,
    },
  ];

  const { loading, data, getRemittance } = useInformalRemittance();

  useEffect(() => {
    getRemittanceSummary(dateRange.start, dateRange.end);
  }, [range]);

  return (
    <div className="w-full flex flex-col gap-2.5">
      <div className="w-full grid grid-cols-4 gap-2.5">
        {revenueItems.map((it, i) => (
          <div
            className="bg-white w-full rounded-xl px-6 py-3 gap-6 h-[14rem] flex flex-col justify-between items-start"
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
            {it.sub !== undefined && (
              <div className="w-full flex flex-col">
                <h3 className="text-small text-[#9EA4AA]">{it.sub!.title}</h3>
                {loadingSummary ? (
                  <Loader color="primary.6" size={24} />
                ) : (
                  <h2 className="text-[1rem] leading-[1.2rem] font-semibold text-gray-5">
                    {it.sub!.value.toLocaleString("en-US")}
                  </h2>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="w-full bg-white p-5 flex flex-col gap-3 rounded-xl">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-black text-med-button">List of Remittance</h2>
          <h2
            onClick={() => setExpanded(!expanded)}
            className="cursor-pointer text-med-button text-[#007AFF]"
          >
            {expanded ? "View Less" : "View All"}
          </h2>
        </div>
        <div className="w-full justify-between items-center flex">
          <Filters
            onDatesChanged={(start: string, end: string) => {
              setDateRange({
                start,
                end,
              });
              getRemittance(start, end);
            }}
          />
          <button className="bg-[#F0E6FC] rounded text-primary flex gap-3 items-center px-3 h-10">
            <p className="text-[0.815rem] leading-[0.975rem]">Export</p>
            <IoIosArrowDown />
          </button>
        </div>
        <div className="relative overflow-x-auto scrollbar-thin scrollbar-webkit w-full">
          <table className="w-[150%] ">
            <thead className=" bg-[#F3F7FC] h-14">
              <tr className="text-[#3A3A3A] font-medium text-[0.75rem] leading-[1.125rem] text-left">
                <th scope="col" className="px-4">
                  S/N
                </th>
                <th scope="col" className="px-4">
                  Client Name
                </th>
                <th scope="col" className="px-4">
                  Total Collected Amount
                </th>
                <th scope="col" className="px-4">
                  Collected Count
                </th>
                <th scope="col" className="px-4">
                  Total Pending Amount
                </th>
                <th scope="col" className="px-4">
                  Pending Count
                </th>
                <th scope="col" className="px-4">
                  Total Generated Amount
                </th>
                <th scope="col" className="px-4">
                  Generated Count
                </th>
                <th scope="col" className="px-4">
                  Total Commission
                </th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                data.map((txn, i) => (
                  <tr
                    key={i}
                    className="odd:bg-white even:bg-slate-50 text-[#3A3A3A] text-[0.75rem] leading-[1.125rem] justify-around max-h-[15rem]"
                  >
                    <td className="p-4">{i + 1}</td>
                    <td className="p-4">{txn.clientName}</td>
                    <td className="p-4">
                      ₦{txn.totalCollectedAmount.toLocaleString("en-US")}
                    </td>
                    <td className="p-4">{txn.collectedCount}</td>
                    <td className="p-4">
                      ₦{txn.totalPendingAmount.toLocaleString("en-US")}
                    </td>
                    <td className="p-4">{txn.pendingCount}</td>
                    <td className="p-4">
                      ₦{txn.totalGeneratedAmount.toLocaleString("en-US")}
                    </td>
                    <td className="p-4">{txn.generatedCount}</td>
                    <td className="p-4">
                      ₦{txn.totalCommission.toLocaleString("en-US")}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {loading && (
            <div className="w-full h-60 grid place-content-center">
              <Loader color="primary.6" />
            </div>
          )}
          {!loading && data.length === 0 && (
            <div className="w-full h-60 grid place-content-center text-[#3A3A3A] font-medium text-[1rem] leading-[1.125rem]">
              No remmitances available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Remittance;
