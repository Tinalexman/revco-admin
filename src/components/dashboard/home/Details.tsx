import React, { useState } from "react";
import Dropdown from "../../reusable/Dropdown";

import { Profile } from "iconsax-react";

import Image, { StaticImageData } from "next/image";
import TaxPayersImage from "@/assets/dashboard/tax payers.png";
import {
  useGetStatisticsSummary,
  useGetUserActivity,
} from "@/hooks/dashboardHooks";
import { Loader } from "@mantine/core";
import { allFilters, getDateRange } from "@/functions/dateFunctions";
import { IoReceiptSharp } from "react-icons/io5";
import { PiWalletFill, PiUsersFill } from "react-icons/pi";
import { AiOutlineFileDone } from "react-icons/ai";
import { FaHandshakeSimple } from "react-icons/fa6";
import { MdGroupAdd } from "react-icons/md";

interface iRevenueItem {
  value: number;
  title: string;
  subtitle: number;
  icon: any;
}

interface iPersonItem {
  value: number;
  title: string;
  icon: any;
  individual: number;
  corporate: number;
  background: StaticImageData;
}

interface iDateRange {
  start: string;
  end: string;
}

const Details = () => {
  const [filter, setFilter] = useState<string>("Today");
  const overviewModes: string[] = [
    "General Overview",
    "Informal Sector",
    "Formal Sector",
  ];
  const [activeMode, setActiveMode] = useState<string>(overviewModes[0]);

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
      title: "Total Amount due to State Government",
      value: statsSummary.totalAmountRemitted,
      subtitle: 3000,
      icon: <AiOutlineFileDone size={20} className="text-primary" />,
    },
    {
      title: "Total Amount due to Paysure (4.6%)",
      value: statsSummary.totalCommissionInNaira.total,
      subtitle: 3000,
      icon: <FaHandshakeSimple size={20} className="text-primary" />,
    },
  ];

  const {
    data: userActivity,
    loading: loadingActivity,
    getActivity,
  } = useGetUserActivity();

  const personItem: iPersonItem = {
    title: "Total Tax Payers",
    value: userActivity?.taxpayers || 0,
    icon: <PiUsersFill size={20} className="text-primary" />,
    individual: userActivity?.individuals || 0,
    corporate: userActivity?.corporations || 0,
    background: TaxPayersImage,
  };

  return (
    <div className="w-full flex flex-col gap-2.5">
      <div className="h-fit py-3 bg-white rounded-xl w-full flex flex-col gap-2 px-7">
        <div className="w-full flex items-center justify-between border-b border-[#D1D1D6] pb-2">
          <p className="font-semibold text-dash-header text-gray-5">
            Dashboard Overview
          </p>
          <div className="w-[110px]">
            <Dropdown
              menus={allFilters.map((v, i) => ({
                name: v,
                onClick: () => {
                  setFilter(v);
                  const dates = getDateRange(v);
                  getStatisticsSummary(dates[0], dates[1]);
                  getActivity(dates[0], dates[1]);
                },
              }))}
              value={filter}
              hint={"Select"}
            />
          </div>
        </div>
        <div className="w-fit bg-[#F1F2F3] rounded-xl py-1 px-1 flex items-center">
          {overviewModes.map((md, i) => {
            return (
              <div
                onClick={() => {
                  setActiveMode(md);
                }}
                className={`${
                  md === activeMode ? "text-primary bg-white" : "text-[#A9A9A9]"
                } cursor-pointer py-1 px-2 ${
                  i === 0
                    ? "rounded-l-lg"
                    : i === overviewModes.length - 1
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
      <div className="w-full grid grid-cols-2 gap-2.5">
        <div className="relative overflow-hidden bg-white w-full rounded-xl px-6 py-3 gap-6 h-52 flex flex-col items-start">
          <div className="bg-primary-accent rounded-full p-2">
            <MdGroupAdd size={20} className="text-primary" />
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <h3 className="text-small text-[#9EA4AA]">
                Total Amount due to Participant 1 (1.6%)
              </h3>
              {loadingSummary ? (
                <Loader color="primary.6" size={24} />
              ) : (
                <h2 className="text-dash-intro-header font-semibold text-gray-5">
                  ₦
                  {statsSummary.totalCommissionInNaira[
                    "Participant 1"
                  ].toLocaleString("en-US")}
                </h2>
              )}
            </div>
            <div className="flex flex-col">
              <h3 className="text-small text-[#9EA4AA]">
                Total Amount due to Participant 2 (3.8%)
              </h3>
              {loadingSummary ? (
                <Loader color="primary.6" size={24} />
              ) : (
                <h2 className="text-dash-intro-header font-semibold text-gray-5">
                  ₦
                  {statsSummary.totalCommissionInNaira[
                    "Participant 2"
                  ].toLocaleString("en-US")}
                </h2>
              )}
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-white w-full rounded-xl px-6 py-3 gap-6 h-52 flex flex-col justify-between items-start">
          <div className="bg-primary-accent rounded-full p-2">
            {personItem.icon}
          </div>
          <div className="w-[70%] flex justify-between">
            <div className="w-fit flex flex-col">
              <h3 className="text-med-button text-[#9EA4AA]">
                {personItem.title}
              </h3>
              {loadingActivity ? (
                <Loader color="primary.6" size={24} />
              ) : (
                <h2 className="text-dash-intro-header font-semibold text-gray-5">
                  {personItem.value}
                </h2>
              )}
            </div>
            <div className="w-fit flex gap-2 items-center">
              <div className="flex flex-col w-fit">
                <h3 className="text-[0.69rem] leading-[1.085rem] text-gray-5 font-medium">
                  Individual
                </h3>
                {loadingActivity ? (
                  <Loader color="primary.6" size={24} />
                ) : (
                  <h2 className="text-[1.185rem] leading-[1.4rem] font-semibold text-gray-5">
                    {personItem.individual}
                  </h2>
                )}
              </div>
              <div className="w-[1px] h-full bg-[#8E8E93]" />
              <div className="flex flex-col w-fit">
                <h3 className="text-[0.69rem] leading-[1.085rem] text-gray-5 font-medium">
                  Corporate
                </h3>
                {loadingActivity ? (
                  <Loader color="primary.6" size={24} />
                ) : (
                  <h2 className="text-[1.185rem] leading-[1.4rem] font-semibold text-gray-5">
                    {personItem.corporate}
                  </h2>
                )}
              </div>
            </div>
          </div>
          <Image
            src={personItem.background}
            alt={personItem.title}
            width={300}
            height={200}
            className={`absolute bottom-0 right-0 ${"w-[25%]"} h-auto`}
          />
        </div>
      </div>
    </div>
  );
};

export default Details;
