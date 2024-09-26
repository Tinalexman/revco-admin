import React, { useState } from "react";
import Dropdown from "@/components/reusable/Dropdown";

import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { Profile, Profile2User } from "iconsax-react";

import Image, { StaticImageData } from "next/image";
import TaxPayersImage from "@/assets/dashboard/tax payers.png";
import TotalUsersImage from "@/assets/dashboard/total users.png";

interface iPersonItem {
  value: number;
  title: string;
  icon: any;
  individual: number;
  corporate: number;
  background: StaticImageData;
}

const Details = () => {
  const [filter, setFilter] = useState<string>("");
  const [personItems, setPersonItems] = useState<iPersonItem[]>([
    {
      title: "Total Tax Payers",
      value: 200,
      icon: <Profile size={20} className="text-primary" variant="Bold" />,
      individual: 140,
      corporate: 60,
      background: TaxPayersImage,
    },
    {
      title: "New Sign-ups",
      value: 120,
      icon: <Profile2User size={20} className="text-primary" variant="Bold" />,
      individual: 90,
      corporate: 30,
      background: TotalUsersImage,
    },
  ]);

  return (
    <div className="flex flex-col w-full gap-2.5">
      <div className="h-14 bg-white rounded-xl w-full flex items-center justify-between px-7">
        <p className="font-semibold text-dash-header text-gray-5">Overview</p>
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
                <h2 className="text-dash-intro-header font-semibold text-gray-5">
                  {pt.value}
                </h2>
              </div>
              <div className="w-fit flex gap-2 items-center">
                <div className="flex flex-col w-fit">
                  <h3 className="text-[0.69rem] leading-[1.085rem] text-gray-5 font-medium">
                    Individual
                  </h3>
                  <h2 className="text-[1.185rem] leading-[1.4rem] font-semibold text-gray-5">
                    {pt.individual}
                  </h2>
                </div>
                <div className="w-[1px] h-full bg-[#8E8E93]" />
                <div className="flex flex-col w-fit">
                  <h3 className="text-[0.69rem] leading-[1.085rem] text-gray-5 font-medium">
                    Corporate
                  </h3>
                  <h2 className="text-[1.185rem] leading-[1.4rem] font-semibold text-gray-5">
                    {pt.corporate}
                  </h2>
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