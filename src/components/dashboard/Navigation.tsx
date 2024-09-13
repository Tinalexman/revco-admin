import React, { useState, useEffect } from "react";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import Logo from "@/assets/Revco.svg";

import { useDashboardData } from "@/stores/dashboardStore";
import DashboardSizerIcon from "../reusable/DashboardSizerIcon";
import {
  Bank,
  Card,
  Category2,
  ClipboardText,
  Coin1,
  I24Support,
  Profile2User,
  Setting,
} from "iconsax-react";
import { IoIosArrowDown } from "react-icons/io";
import { IoReceiptOutline } from "react-icons/io5";
import { HiOutlineReceiptRefund } from "react-icons/hi";

export interface iNavigationItem {
  name: string;
  icon: any;
  link: string;
  children: iNavigationChild[];
}

export interface iNavigationChild {
  name: string;
  icon: any;
  link: string;
}

const DashboardNavigation = () => {
  const [navs, setNavs] = useState<iNavigationItem[]>([]);
  const [paths, setPaths] = useState<string[]>([]);
  const [index, setIndex] = useState<number>(-1);

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

  const determineActiveChild = () => {
    const splits: string[] = pathName.split("/");
    const parent: string = splits[2];
    const child = splits[3];

    if (parent === "payments") {
      switch (child) {
        case "transactions":
          return 0;
        case "payment-channels":
          return 1;
        case "invoice-management":
          return 2;
        case "refund-processing":
          return 3;
      }
    } else if (parent === "users") {
      if (child === "tax-payers") return 0;
      if (child === undefined) return 1;
    }

    return -1;
  };

  const hasChildren = (index: number) => {
    if (navs[index] === undefined) return false;
    return navs[index].children.length > 0;
  };

  const determineNavItems = () => {
    let newNavs: iNavigationItem[] = [
      {
        name: "Dashboard",
        icon: <Category2 size="24" variant="Bold" />,
        link: "/dashboard",
        children: [],
      },
      {
        name: "Payments",
        icon: <Coin1 size="24" variant="Bold" />,
        link: "/dashboard/payments",
        children: [
          {
            name: "Transactions",
            icon: <Card size="20" />,
            link: "/dashboard/payments/transactions",
          },
          {
            name: "Payment Channels",
            icon: <Bank size="20" variant="Bold" />,
            link: "/dashboard/payments/payment-channels",
          },
          {
            name: "Invoice Management",
            icon: <IoReceiptOutline size={20} />,
            link: "/dashboard/payments/invoice-management",
          },
          {
            name: "Refund Processing",
            icon: <HiOutlineReceiptRefund size="20" />,
            link: "/dashboard/payments/refund-processing",
          },
        ],
      },
      {
        name: "Users",
        icon: <Profile2User size="24" variant="Bold" />,
        link: "",
        children: [
          {
            name: "Tax Payers",
            icon: <Card size="24" />,
            link: "/dashboard/users/tax-payers",
          },
          {
            name: "Users",
            icon: <Bank size="24" />,
            link: "/dashboard/users",
          },
        ],
      },
      {
        name: "Reports",
        icon: <ClipboardText size="24" variant="Bold" />,
        link: "/dashboard/reports",
        children: [],
      },
      {
        name: "Support",
        icon: <I24Support size="24" variant="Bold" />,
        link: "/dashboard/support",
        children: [],
      },
      {
        name: "Settings",
        icon: <Setting size="24" variant="Bold" />,
        link: "/dashboard/settings",
        children: [],
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

  const router = useRouter();
  const pathName = usePathname();
  const expanded = useDashboardData((state) => state.expanded);
  const page = determineIndex();
  const activeChild = hasChildren(page) ? determineActiveChild() : -1;

  useEffect(() => {
    determineNavItems();
  }, []);

  return (
    <div
      className={`${
        expanded ? "w-[17rem] pr-4" : "w-[5rem] pl-3 pr-4"
      } h-[100vh] relative z-10 pt-6 duration-300 transition-all ease-in flex shadow-custom flex-col gap-10 items-center bg-white`}
    >
      <div
        onClick={() => {
          useDashboardData.setState({ expanded: !expanded });
        }}
        className={`cursor-pointer absolute -right-[1.125rem] z-50 top-8 shadow-md bg-primary-accent size-9 rounded-full grid place-content-center`}
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
            <div key={i}>
              <div
                onClick={() => {
                  if (hasChildren(i)) {
                    if (index === i) {
                      setIndex(-1);
                    } else {
                      setIndex(i);
                    }
                    // setIndex(index === -1 ? i : -1);
                  } else {
                    router.push(navItem.link);
                  }
                }}
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
                  className={`w-full flex p-2 rounded-[10px] ${
                    page === i ? "text-primary" : "text-gray-2"
                  } justify-between items-center cursor-pointer transition-colors ease-out duration-100 relative`}
                >
                  <div className={`w-fit flex items-center gap-2 `}>
                    <div>{navItem.icon}</div>
                    <h2
                      style={{
                        transitionDelay: `${i + 3}00ms`,
                      }}
                      className={`text-dash-slider font-medium duration-500 ${
                        !expanded && "opacity-0 translate-x-28 overflow-hidden "
                      }`}
                    >
                      {navItem.name}
                    </h2>
                  </div>
                  {hasChildren(i) && (
                    <IoIosArrowDown className="text-gray-2" size={16} />
                  )}
                </div>
              </div>
              {index !== -1 && index === i && expanded && (
                <div
                  className={`flex flex-col w-full px-3 
                    `}
                >
                  {navItem.children.map(
                    (child: iNavigationChild, childIndex: number) => (
                      <div
                        onClick={() => router.push(child.link)}
                        className={`w-full flex items-center gap-2 py-2 pl-5 cursor-pointer ${
                          activeChild === childIndex && page === i
                            ? "text-primary"
                            : "text-[#8E8E93]"
                        }`}
                        key={childIndex + navs.length}
                      >
                        <div>{child.icon}</div>
                        <h2
                          style={{
                            transitionDelay: `${i + 3}00ms`,
                          }}
                          className={`text-dash-slider font-medium duration-500 ${
                            !expanded &&
                            "opacity-0 translate-x-28 overflow-hidden "
                          }`}
                        >
                          {child.name}
                        </h2>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardNavigation;
