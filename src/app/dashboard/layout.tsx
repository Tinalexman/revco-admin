"use client";

import DashboardNavigation from "@/components/dashboard/Navigation";
import DashboardSizerIcon from "@/components/reusable/DashboardSizerIcon";
import { useDashboardData } from "@/stores/dashboardStore";
import { useRevcoUserStore } from "@/stores/userStore";
import { Moon, SearchNormal1, Notification, Profile } from "iconsax-react";
import React, { FC, ReactNode } from "react";
import { IoIosArrowDown } from "react-icons/io";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const search = useDashboardData((state) => state.searchFilter);
  const expanded = useDashboardData((state) => state.expanded);

  const role = useRevcoUserStore((state) => state.role);

  return (
    <div className="w-[100vw] h-[100vh] flex relative">
      <DashboardNavigation />
      <div
        onClick={() => {
          useDashboardData.setState({ expanded: !expanded });
        }}
        className={`cursor-pointer absolute ${expanded ? "left-[15.875rem]" : "left-[3.875rem]"
          } z-50 top-8 duration-300 transition-all ease-in shadow-lg bg-primary-accent size-9 rounded-full grid place-content-center`}
      >
        <DashboardSizerIcon expanded={expanded} />
      </div>
      <div
        className={`${expanded ? "w-[calc(100vw-17rem)]" : "w-[calc(100vw-5rem)]"
          } flex flex-col bg-background shadow-custom duration-300 transition-all ease-in h-[100vh] overflow-y-scroll`}
      >
        <div
          className={`h-[4.5rem]  
           z-10 py-5 px-8 bg-white duration-300 transition-all ease-in flex items-center justify-between sticky top-0 `}
        >
          <div className="w-[290px] relative">
            <input
              type="text"
              placeholder="Search transactions"
              className="pl-4 pr-10 main-input"
              value={search}
              onChange={(e) => {
                useDashboardData.setState({
                  searchFilter: e.target.value,
                });
              }}
            />
            <SearchNormal1
              className="absolute top-1/2 -translate-y-1/2 right-4"
              size="20"
            />
          </div>
          <div className="w-fit flex items-center gap-5 text-secondary">
            <div className="flex gap-4 items-center w-fit">
              <Moon size="24" variant="Bold" />
              <Notification size="24" variant="Bold" />
            </div>
            <div className="border-l border-gray-4 flex w-fit px-4 py-2 gap-2 items-center">
              <Profile size="24" variant="Bold" />
              <p className="text-reg-body">{role}</p>
              <IoIosArrowDown className="text-black " size={22} />
            </div>
          </div>
        </div>
        <div className="bg-background w-full">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
