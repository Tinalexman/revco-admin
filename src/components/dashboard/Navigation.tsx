import React, { useState, useEffect } from "react";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import Logo from "@/assets/Revco.svg";

import { useDashboardData } from "@/stores/dashboardStore";
import Tooltip from "../reusable/Tooltip";
import DashboardSizerIcon from "../reusable/DashboardSizerIcon";
import {
  Category2,
  ClipboardText,
  Coin1,
  I24Support,
  Profile2User,
  Setting,
} from "iconsax-react";

export interface iNavigationItem {
  name: string;
  icon: any;
  link: string;
}

const DashboardNavigation = () => {
  const [navs, setNavs] = useState<iNavigationItem[]>([]);
  const [paths, setPaths] = useState<string[]>([]);

  const determineIndex = () => {
    const current = pathName.split("/")[2];
    for (let i = 0; i < paths.length; ++i) {
      if (paths[i] === current) {
        return i + 1;
      }
    }

    if (pathName === "/dashboard") {
      return 0;
    }

    return -1;
  };

  const router = useRouter();
  const pathName = usePathname();
  const expanded = useDashboardData((state) => state.expanded);
  const page = determineIndex();

  const determineNavItems = () => {
    let newNavs: iNavigationItem[] = [
      {
        name: "Dashboard",
        icon: <Category2 size="24" color="#4F4F4F" variant="Bold" />,
        link: "/dashboard",
      },
      {
        name: "Payments",
        icon: <Coin1 size="24" color="#4F4F4F" variant="Bold" />,
        link: "/dashboard/payments",
      },
      {
        name: "Users",
        icon: <Profile2User size="24" color="#4F4F4F" variant="Bold" />,
        link: "/dashboard/users",
      },
      {
        name: "Reports",
        icon: <ClipboardText size="24" color="#4F4F4F" variant="Bold" />,
        link: "/dashboard/reports",
      },
      {
        name: "Support",
        icon: <I24Support size="24" color="#4F4F4F" variant="Bold" />,
        link: "/dashboard/support",
      },
      {
        name: "Settings",
        icon: <Setting size="24" color="#4F4F4F" variant="Bold" />,
        link: "/dashboard/settings",
      },
    ];
    let newPaths: string[] = [
      "payments",
      "users",
      "reports",
      "support",
      "settings",
    ];

    setNavs(newNavs);
    setPaths(newPaths);
  };

  useEffect(() => {
    determineNavItems();
  }, []);

  return (
    <div
      className={`${
        expanded ? "w-[15rem] pr-4" : "w-[5rem] pl-3 pr-4"
      } h-[100vh] relative z-10 pt-6 duration-300 transition-all ease-in flex shadow-custom flex-col gap-10 items-center bg-white`}
    >
      <div
        onClick={() => {
          useDashboardData.setState({ expanded: !expanded });
        }}
        className={`cursor-pointer absolute -right-[1.125rem] top-8 shadow-md bg-primary-accent size-9 rounded-full grid place-content-center`}
      >
        <DashboardSizerIcon expanded={expanded} />
      </div>
      <div className=" w-full flex justify-center ">
        <div
          className={`${
            expanded ? "scale-100" : "scale-0"
          } w-fit object-cover duration-300 transition-all ease-out flex flex-col items-center`}
        >
          <Image
            src={Logo}
            alt="logo"
            className="w-[7rem] h-auto object-cover"
          />
        </div>
      </div>
      <div className={`flex flex-col w-full gap-2.5`}>
        {navs.map((navItem: iNavigationItem, i: number) => {
          return (
            <div
              key={i}
              onClick={() => router.push(navItem.link)}
              className={`flex w-full gap-[6px] items-center rounded-lg h-11 ${
                page === i && "bg-secondary-accent"
              } ${expanded && "justify-center"}`}
            >
              <div
                className={`w-[6px] h-9 rounded-br-[4px] rounded-tr-[4px] ${
                  page === i && expanded && "bg-primary"
                }`}
              />
              <div
                className={`w-full flex p-2 rounded-[10px] gap-2 items-center cursor-pointer font-medium hover:scale-105 scale-100 transition-all ease-out duration-200 relative`}
              >
                <div>{navItem.icon}</div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`text-dash-slider duration-500 ${
                    !expanded && "opacity-0 translate-x-28 overflow-hidden "
                  }`}
                >
                  {navItem.name}
                </h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardNavigation;
