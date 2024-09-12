"use client";

import DashboardNavigation from "@/components/dashboard/Navigation";
import { useDashboardData } from "@/stores/dashboardStore";
import { Moon, SearchNormal1, Notification, Profile } from "iconsax-react";
import React, { FC, ReactNode } from "react";
import { IoIosArrowDown } from "react-icons/io";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const search = useDashboardData((state) => state.searchFilter);

  return (
    <div className="w-[100vw] h-[100vh] flex ">
      <DashboardNavigation />
      <div
        className={`flex flex-col bg-white duration-300 transition-all ease-in w-full h-[100vh] overflow-y-scroll`}
      >
        <div
          className={`h-[4.5rem]  
          w-full z-50 py-5 px-8 shadow-custom-black flex items-center justify-between`}
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
              <p className="text-reg-body">Admin User</p>
              <IoIosArrowDown className="text-black " size={22} />
            </div>
          </div>
        </div>
        <div className="bg-background w-full h-[calc(100vh-3rem)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
