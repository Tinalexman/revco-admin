"use client";

import Dropdown from "@/components/reusable/Dropdown";
import { allFilters, getDateRange } from "@/functions/dateFunctions";
import {
  useGetObjections,
  useGetObjectionSummary,
} from "@/hooks/objectionHooks";
import { Loader } from "@mantine/core";
import { Profile2User } from "iconsax-react";
import React, { useState } from "react";
import ObjectionList from "./ObjectionsList";

interface iObjectionHeader {
  icon: any;
  title: string;
  value: number;
}

const Objections = () => {
  const [filter, setFilter] = useState<string>("Today");
  const { loading, data, getObjectionSummary } = useGetObjectionSummary(true);
  const objectionHeaders: iObjectionHeader[] = [
    {
      icon: <Profile2User size={20} className="text-primary" variant="Bold" />,
      title: "Total Objections Raised",
      value: data.data["total-objections"],
    },
    {
      icon: <Profile2User size={20} className="text-primary" variant="Bold" />,
      title: "Pending Objections",
      value: data.data["pending-objections"],
    },
    {
      icon: <Profile2User size={20} className="text-primary" variant="Bold" />,
      title: "Approved Objections",
      value: data.data["approved-objections"],
    },
    {
      icon: <Profile2User size={20} className="text-primary" variant="Bold" />,
      title: "Rejected Objections",
      value: data.data["rejected-objections"],
    },
  ];

  return (
    <div className="w-full flex flex-col gap-2.5">
      <div className="px-8 bg-white w-full h-[4.5rem]">
        <div className="w-full flex justify-between items-center border-t border-gray-4 py-2">
          <div className="flex flex-col">
            <h2 className="text-monokai font-semibold text-dash-intro-header">
              Objections
            </h2>
            <h3 className="text-primary text-reg-caption">
              Manage all objection transactions here
            </h3>
          </div>
        </div>
      </div>
      <div className="w-full px-8 flex flex-col gap-2.5">
        <div className="h-14 bg-white rounded-xl w-full flex items-center justify-between px-7">
          <p className="font-semibold text-dash-header text-gray-5">Overview</p>
          <div className="w-[115px]">
            <Dropdown
              menus={allFilters.map((v, i) => ({
                name: v,
                onClick: () => {
                  setFilter(v);
                  const dates = getDateRange(v);
                  getObjectionSummary(dates[0], dates[1]);
                },
              }))}
              value={filter}
              hint={"Select"}
            />
          </div>
        </div>
        <div className="w-full grid grid-cols-4 gap-2.5">
          {objectionHeaders.map((obj, i) => {
            return (
              <div
                key={i}
                className={`relative overflow-hidden bg-white w-full rounded-xl px-6 pt-3 pb-4 gap-6 h-44 flex flex-col justify-between items-start`}
              >
                <div className="bg-primary-accent rounded-full p-2">
                  {obj.icon}
                </div>

                <div className="flex flex-col items-starts">
                  <p className="text-[0.7rem] font-medium leading-[1.4rem] text-[#9EA4AA]">
                    {obj.title}
                  </p>
                  {loading ? (
                    <Loader color="primary.6" size={24} />
                  ) : (
                    <h2 className="text-[#333333] font-semibold text-[1.5rem] leading-[1.8rem]">
                      {obj.value}
                    </h2>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <ObjectionList />
      </div>
    </div>
  );
};

export default Objections;
