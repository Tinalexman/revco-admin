"use client";

import DashboardNavigation from "@/components/dashboard/Navigation";
import DashboardSizerIcon from "@/components/reusable/DashboardSizerIcon";
import { useToken } from "@/providers/AuthProvider";
import { useDashboardData } from "@/stores/dashboardStore";
import { useRevcoUserStore } from "@/stores/userStore";
import { Moon, SearchNormal1, Notification, Profile } from "iconsax-react";
import React, { FC, ReactNode, useEffect, useState, useRef } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const search = useDashboardData((state) => state.searchFilter);
  const expanded = useDashboardData((state) => state.expanded);
  const role = useRevcoUserStore((state) => state.role);
  const { removeToken } = useToken();
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const logout = () => {
    removeToken();
    window.localStorage.removeItem("rvc-ad");
    window.location.replace("/");
  };

  return (
    <div className="w-[100vw] h-[100vh] flex relative font-inter">
      <DashboardNavigation />
      <div
        onClick={() => {
          useDashboardData.setState({ expanded: !expanded });
        }}
        className={`cursor-pointer absolute ${
          expanded ? "left-[15.875rem]" : "left-[3.875rem]"
        } z-50 top-8 duration-300 transition-all ease-in shadow-lg bg-primary-accent size-9 rounded-full grid place-content-center`}
      >
        <DashboardSizerIcon expanded={expanded} />
      </div>
      <div
        className={`${
          expanded ? "w-[calc(100vw-17rem)]" : "w-[calc(100vw-5rem)]"
        } flex flex-col bg-background shadow-custom duration-300 transition-all ease-in h-[100vh] overflow-y-scroll`}
      >
        <div
          className={`h-[4.5rem]  
           z-10 py-5 px-8 bg-white duration-300 transition-all ease-in flex items-center justify-end sticky top-0 `}
        >
          <div className="w-fit flex items-center gap-5 text-secondary">
            {/* <div className="flex gap-4 items-center w-fit">
              <Moon size="24" variant="Bold" />
              <Notification size="24" variant="Bold" />
            </div> */}
            <div
              ref={dropdownRef}
              onClick={() => setOpen(!open)}
              className="border-0 cursor-pointer border-gray-4 flex w-fit px-4 py-2 gap-2 items-center"
            >
              <Profile size="24" variant="Bold" />
              <p className="text-reg-body">{role}</p>
              <IoIosArrowDown className="text-black " size={22} />
              <div
                className={`absolute transition-all duration-300 ease-out z-10 top-16 right-5 w-[12rem] rounded-[8px] bg-white shadow-custom flex flex-col gap-2 ${
                  open
                    ? "p-2 h-auto"
                    : "h-0 max-h-0 min-h-0 overflow-hidden p-0"
                }`}
              >
                <div
                  className="w-full cursor-pointer hover:bg-[#c89cff] hover:text-white flex items-center gap-2 px-2 py-1 rounded-md text-black"
                  onClick={() => {
                    setOpen(false);
                    logout();
                  }}
                >
                  <BiLogOutCircle size={"16px"} />
                  Sign Out
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-background w-full">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
