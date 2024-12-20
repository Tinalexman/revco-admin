import React, { useState, useEffect } from "react";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import Logo from "@/assets/states/taraba.svg";

import { useDashboardData } from "@/stores/dashboardStore";
import { MdGroups2 } from "react-icons/md";
import {
  Bank,
  Card,
  Category2,
  ClipboardText,
  I24Support,
  Profile,
  Profile2User,
  Setting,
} from "iconsax-react";
import { MdPayments } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { IoReceiptOutline } from "react-icons/io5";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { LuStore } from "react-icons/lu";
import { PiBuildingOfficeDuotone } from "react-icons/pi";
import { MdOutlineBarChart } from "react-icons/md";
import { BiSolidMessageSquareError } from "react-icons/bi";
import { useRevcoUserStore } from "@/stores/userStore";
import {
  canViewAdminUsers,
  canViewDashboard,
  canViewDashboardFormalSector,
  canViewDashboardInformalSector,
  canViewDashboardOverview,
  canViewObjections,
  canViewOrganizations,
  canViewPaymentChannels,
  canViewPaymentInvoices,
  canViewPaymentRefunds,
  canViewPayments,
  canViewPaymentTransactions,
  canViewReports,
  canViewSelectUsers,
  canViewSettings,
  canViewSupport,
  canViewTaxPayers,
  canViewUsers,
  getDashboardActiveChildIndex,
  getPaymentChildActiveIndex,
  getUsersChildActiveIndex,
} from "@/functions/navigationFunctions";
import { capitalize } from "@/functions/stringFunctions";

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

  const router = useRouter();
  const pathName = usePathname();
  const expanded = useDashboardData((state) => state.expanded);
  const currentState = pathName.split("/")[1];

  const determineIndex = (isDashboardPresent: boolean) => {
    const current = pathName.split("/")[3];
    for (let i = 0; i < paths.length; ++i) {
      if (paths[i] === current) {
        return i + (isDashboardPresent ? 1 : 0);
      }
    }

    if (
      pathName === `/${currentState}/dashboard` ||
      pathName === `/${currentState}/dashboard/informal-sector` ||
      pathName === `/${currentState}/dashboard/formal-sector`
    ) {
      return 0;
    }

    return -1;
  };

  const determineActiveChild = (role: string) => {
    const splits: string[] = pathName.split("/");
    const parent: string | undefined = splits[3];
    const child = splits[4];

    if (parent === "payments") {
      return getPaymentChildActiveIndex(role, child);
    } else if (parent === "users") {
      return getUsersChildActiveIndex(role, child);
    } else if (splits[2] === "dashboard") {
      return getDashboardActiveChildIndex(role, parent);
    }

    return -1;
  };

  const hasChildren = (index: number) => {
    if (navs[index] === undefined) return false;
    return navs[index].children.length > 0;
  };

  const determineNavItems = (role: string) => {
    let newNavs: iNavigationItem[] = [];
    let newPaths: string[] = [];

    if (canViewDashboard(role)) {
      let dashboardData: iNavigationItem = {
        name: "Dashboard",
        icon: <Category2 size="24" variant="Bold" />,
        link: `/${currentState}`,
        children: [],
      };

      if (canViewDashboardOverview(role)) {
        dashboardData.children.push({
          name: "Overview",
          icon: <MdOutlineBarChart size={20} />,
          link: `/${currentState}/dashboard`,
        });
      }

      if (canViewDashboardInformalSector(role)) {
        dashboardData.children.push({
          name: "Informal Sector",
          icon: <LuStore size={20} />,
          link: `/${currentState}/dashboard/informal-sector`,
        });
      }

      if (canViewDashboardFormalSector(role)) {
        dashboardData.children.push({
          name: "Formal Sector",
          icon: <PiBuildingOfficeDuotone size={20} />,
          link: `/${currentState}/dashboard/formal-sector`,
        });
      }

      newNavs.push(dashboardData);
    }

    if (canViewPayments(role)) {
      let paymentData: iNavigationItem = {
        name: "Payments",
        icon: <MdPayments size="24" />,
        link: `/${currentState}/dashboard/payments`,
        children: [],
      };

      if (canViewPaymentTransactions(role)) {
        paymentData.children.push({
          name: "Transactions",
          icon: <Card size="20" />,
          link: `/${currentState}/dashboard/payments/transactions`,
        });
      }

      if (canViewPaymentChannels(role)) {
        paymentData.children.push({
          name: "Payment Channels",
          icon: <Bank size="20" variant="Bold" />,
          link: `/${currentState}/dashboard/payments/payment-channels`,
        });
      }

      if (canViewPaymentInvoices(role)) {
        paymentData.children.push({
          name: "Invoice Management",
          icon: <IoReceiptOutline size={20} />,
          link: `/${currentState}/dashboard/payments/invoice-management`,
        });
      }

      if (canViewPaymentRefunds(role)) {
        paymentData.children.push({
          name: "Refund Processing",
          icon: <HiOutlineReceiptRefund size="20" />,
          link: `/${currentState}/dashboard/payments/refund-processing`,
        });
      }

      newNavs.push(paymentData);
      newPaths.push("payments");
    }

    if (canViewOrganizations(role)) {
      newNavs.push({
        name: "Organizations",
        icon: <MdGroups2 size={26} />,
        link: `/${currentState}/dashboard/organizations`,
        children: [],
      });
      newPaths.push("organizations");
    }

    if (canViewObjections(role)) {
      newNavs.push({
        name: "Objections",
        icon: <BiSolidMessageSquareError size={22} />,
        link: `/${currentState}/dashboard/objections`,
        children: [],
      });
      newPaths.push("objections");
    }

    if (canViewUsers(role)) {
      let userData: iNavigationItem = {
        name: "User Management",
        icon: <Profile2User size="24" variant="Bold" />,
        link: "",
        children: [],
      };

      if (canViewTaxPayers(role)) {
        userData.children.push({
          name: "Tax Payers",
          icon: <Card size="24" />,
          link: `/${currentState}/dashboard/users/tax-payers`,
        });
      }

      if (canViewAdminUsers(role)) {
        userData.children.push({
          name: "Admin Users",
          icon: <Bank size="24" />,
          link: `/${currentState}/dashboard/users/admin-users`,
        });
      }

      if (canViewSelectUsers(role)) {
        userData.children.push({
          name: "Users",
          icon: <Profile size="24" variant="Bold" />,
          link: `/${currentState}/dashboard/users/mda-users`,
        });
      }

      newNavs.push(userData);
      newPaths.push("users");
    }

    if (canViewReports(role)) {
      newNavs.push({
        name: "Reports",
        icon: <ClipboardText size="24" variant="Bold" />,
        link: `/${currentState}/dashboard/reports`,
        children: [],
      });
      newPaths.push("reports");
    }

    if (canViewSupport(role)) {
      newNavs.push({
        name: "Support",
        icon: <I24Support size="24" variant="Bold" />,
        link: `/${currentState}/dashboard/support`,
        children: [],
      });
      newPaths.push("support");
    }

    if (canViewSettings(role)) {
      newNavs.push({
        name: "Settings",
        icon: <Setting size="24" variant="Bold" />,
        link: `/${currentState}/dashboard/settings`,
        children: [],
      });
      newPaths.push("settings");
    }

    setNavs(newNavs);
    setPaths(newPaths);
  };

  const role = useRevcoUserStore((state) => state.role);
  const firstName = useRevcoUserStore((state) => state.firstName);
  const lastName = useRevcoUserStore((state) => state.lastName);

  const page = determineIndex(canViewDashboard(role));
  const activeChild = hasChildren(page) ? determineActiveChild(role) : -1;

  useEffect(() => {
    if (role) {
      determineNavItems(role);
    }
  }, [role]);

  return (
    <div
      className={`${
        expanded ? "w-[17rem] pr-4" : "w-[5rem] pl-3 pr-4"
      } h-[100vh] overflow-y-auto scrollbar-thin scrollbar-webkit z-5 pt-6 duration-300 transition-all ease-in flex shadow-custom flex-col gap-10 items-center bg-white`}
    >
      <div className=" w-full flex justify-center ">
        <div
          className={`${
            expanded ? "scale-100" : "scale-0"
          } w-fit object-cover duration-300 transition-all ease-out flex flex-col gap-2 items-center`}
        >
          <Image
            src={`/${currentState}.svg`}
            alt="logo"
            width={80}
            height={80}
            className="w-[5rem] h-auto object-cover"
          />
          <h1 className="text-dash-header text-[#333333] font-semibold">
            {capitalize(currentState)} IRS
          </h1>
          <p className="text-small text-[#555555]">
            {firstName} {lastName}
          </p>
        </div>
      </div>
      <div className={`flex flex-col w-full gap-2.5`}>
        {navs.map((navItem: iNavigationItem, i: number) => {
          return (
            <div key={i}>
              <div
                onClick={() => {
                  if (hasChildren(i)) {
                    if (!expanded) {
                      setIndex(i);
                      useDashboardData.setState({ expanded: true });
                    } else {
                      setIndex(index === i ? -1 : i);
                    }
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
              <div
                className={`flex flex-col w-full px-3 transition-all ease-in duration-200 ${
                  index !== -1 && index === i && expanded
                    ? "scale-100 h-fit"
                    : "scale-0 h-0 overflow-hidden"
                } `}
              >
                {navItem.children.map(
                  (child: iNavigationChild, childIndex: number) => (
                    <div
                      onClick={() => {
                        router.push(child.link);
                      }}
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardNavigation;
