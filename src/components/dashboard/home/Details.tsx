import React, { useState } from "react";
import Dropdown from "../../reusable/Dropdown";

import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { Profile, Profile2User } from "iconsax-react";

import Image, { StaticImageData } from "next/image";
import TaxPayersImage from "@/assets/dashboard/tax payers.png";
import TotalUsersImage from "@/assets/dashboard/total users.png";
import {
  useGetStatisticsSummary,
  useGetUserActivity,
} from "@/hooks/dashboardHooks";
import { Loader } from "@mantine/core";
import { getDateRange } from "@/functions/dateFunctions";
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
  const [filter, setFilter] = useState<string>("Yearly");

  const currentDate = new Date().toISOString().split("T")[0];
  const [dateRange, setDateRange] = useState<iDateRange>({
    start: currentDate,
    end: currentDate,
  });

  const {
    loading: loadingSummary,
    getStatisticsSummary,
    data: statsSummary,
  } = useGetStatisticsSummary();
  const revenueItems: iRevenueItem[] = [
    {
      title: "Total Amount on Invoice Generated",
      value: statsSummary?.totalInvoiceGeneratedInNaira || 0,
      subtitle: 3000,
      icon: <PiWalletFill size={20} className="text-primary" />,
    },
    {
      title: "Total Commission",
      value: statsSummary?.totalRevenue || 0,
      subtitle: 3000,
      icon: <IoReceiptSharp size={20} className="text-primary" />,
    },
    {
      title: "Total Amount Remitted",
      value: statsSummary?.totalAmountRemitted || 0,
      subtitle: 3000,
      icon: <AiOutlineFileDone size={20} className="text-primary" />,
    },
    {
      title: "Total Invoice Generated",
      value: statsSummary?.totalCommissionInNaira || 0,
      subtitle: 3000,
      icon: <FaHandshakeSimple size={20} className="text-primary" />,
    },
  ];

  const {
    data: userActivity,
    loading: loadingActivity,
    getActivity,
  } = useGetUserActivity();
  const personItems: iPersonItem[] = [
    {
      title: "Total Tax Payers",
      value: userActivity?.taxpayers || 0,
      icon: <Profile size={20} className="text-primary" variant="Bold" />,
      individual: userActivity?.individuals || 0,
      corporate: userActivity?.corporations || 0,
      background: TaxPayersImage,
    },
    {
      title: "New Sign-ups",
      value: userActivity?.newSignUps || 0,
      icon: <Profile2User size={20} className="text-primary" variant="Bold" />,
      individual: userActivity?.nsIndividual || 0,
      corporate: userActivity?.nsCorporations || 0,
      background: TotalUsersImage,
    },
  ];

  return (
    <div className="w-full flex flex-col gap-2.5">
      <div className="h-14 bg-white rounded-xl w-full flex items-center justify-between px-7">
        <p className="font-semibold text-dash-header text-gray-5">
          Dashboard Overview
        </p>
        <div className="w-[110px]">
          <Dropdown
            menus={[
              "Today",
              "Yesterday",
              "This Week",
              "Last Week",
              "This Month",
              "Last Month",
              "This Year",
            ].map((v, i) => ({
              name: v,
              onClick: () => {
                setFilter(v);
                const dates = getDateRange(v);
                getStatisticsSummary(dates[0], dates[1]);
                // getActivity(v.substring(0, 1));
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
      <div className="w-full grid grid-cols-2 gap-2.5">
        {personItems.map((pt, i) => (
          <div
            className="relative overflow-hidden bg-white w-full rounded-xl px-6 py-3 gap-6 h-44 flex flex-col justify-end items-start"
            key={i}
          >
            <div className="bg-primary-accent rounded-full p-2">{pt.icon}</div>
            <div className="w-[70%] flex justify-between">
              <div className="w-fit flex flex-col">
                <h3 className="text-med-button text-[#9EA4AA]">{pt.title}</h3>
                {loadingActivity ? (
                  <Loader color="primary.6" size={24} />
                ) : (
                  <h2 className="text-dash-intro-header font-semibold text-gray-5">
                    {pt.value}
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
                      {pt.individual}
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
                      {pt.corporate}
                    </h2>
                  )}
                </div>
              </div>
            </div>
            <Image
              src={pt.background}
              alt={pt.title}
              width={300}
              height={200}
              className={`absolute bottom-0 right-0 ${
                i === 0 ? "w-[30%]" : "w-[25%]"
              } h-auto`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;
