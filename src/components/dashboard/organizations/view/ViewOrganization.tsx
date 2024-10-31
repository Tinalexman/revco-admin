"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader } from "@mantine/core";
import { Profile, Profile2User } from "iconsax-react";
import { VscTools } from "react-icons/vsc";
import ViewOrganizationHistory from "./ViewOrganizationHistory";
import { Drawer } from "@mantine/core";
import { IoIosArrowForward } from "react-icons/io";
import { BsPeopleFill } from "react-icons/bs";
import { Bank } from "iconsax-react";
import Link from "next/link";
import AddGroup from "../AddGroup";
import {
  useGetOrganizationTransactionHistory,
  useGetOrganizationTypeOverview,
} from "@/hooks/organizationHooks";
import { MdPayments } from "react-icons/md";
import { capitalize } from "@/functions/stringFunctions";

interface iOrganizationData {
  value: number;
  title: string;
  icon: any;
  active: number;
  inactive: number;
}

interface iRevenueData {
  value: number;
  title: string;
  icon: any;
}

const ViewOrganization = () => {
  return (
    <Suspense fallback={<Loader color="primary.6" />}>
      <ViewOrganizationContent />
    </Suspense>
  );
};

const ViewOrganizationContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const organizationData = searchParams.get("data");

  const [organizationName, setOrganizationName] = useState<string>("");
  const [organizationCategory, setOrganizationCategory] = useState<string>("");
  const [organizationId, setOrganizationId] = useState<number>(-1);
  const [isOrganizationActive, setOrganizationActive] =
    useState<boolean>(false);
  const [addGroup, shouldAddGroup] = useState<boolean>(false);

  const {
    data: overview,
    loading,
    getOverview,
  } = useGetOrganizationTypeOverview();

  const revenueData: iRevenueData[] = [
    {
      title: "Total Invoice Generated",
      value: overview.TotalInvoiceGenerated,
      icon: <MdPayments size={20} className="text-primary" />,
    },
    {
      title: "Total Invoice Paid",
      value: overview.TotalInvoicePaid,
      icon: <MdPayments size={20} className="text-primary" />,
    },
    {
      title: "Total Invoice Unpaid",
      value: overview.TotalInvoiceUnpaid,
      icon: <MdPayments size={20} className="text-primary" />,
    },
  ];

  useEffect(() => {
    if (organizationData === null) {
      router.back();
    } else {
      const payload: any = JSON.parse(
        Buffer.from(organizationData!, "base64").toString("utf-8")
      );

      setOrganizationName(payload.name);
      setOrganizationCategory(
        payload.category === "Ministry" ? "Ministries" : payload.category
      );
      setOrganizationId(payload.id);
      setOrganizationActive(payload.active);
      getOverview(undefined, payload.id);
    }
  }, [router]);

  return (
    <>
      <div className="w-full flex flex-col gap-2.5">
        <div className="px-8 bg-white w-full h-[4.5rem]">
          <div className="w-full flex justify-between items-center border-t border-gray-4 py-2">
            <div className="flex flex-col">
              <h2 className="text-monokai font-semibold text-dash-intro-header">
                Organizations
              </h2>
              <h3 className="text-primary text-reg-caption">
                Manage all organization information
              </h3>
            </div>
            <button
              onClick={() => shouldAddGroup(true)}
              className="bg-primary text-white rounded-lg h-9 gap-2 px-3 text-[0.825rem] flex items-center leading-[0.98rem]"
            >
              <VscTools size={18} color="#FFFFFF" />
              <h3>New Organization</h3>
            </button>
          </div>
        </div>
        <div className="w-full px-8 flex flex-col gap-2.5">
          <div className="h-14 bg-white rounded-xl w-full flex items-center gap-3 px-7">
            <p className="font-semibold text-reg-caption text-gray-5">
              Organizations
            </p>
            <IoIosArrowForward className="text-gray-5" size={24} />
            <p className="font-medium text-reg-caption text-gray-5">
              {organizationCategory}
            </p>
            <IoIosArrowForward className="text-gray-5" size={24} />
            <p className="font-medium text-reg-caption text-gray-5">
              {organizationName}
            </p>
          </div>
          <div className="bg-white rounded-xl w-full flex justify-between items-center gap-3 px-7 py-3">
            <div className="flex gap-3 items-center w-fit">
              <div className="p-3 rounded-full bg-[#E8D9FA]">
                <Bank size="24" variant="Bold" className="text-primary" />
              </div>
              <div className="flex flex-col justify-between">
                <h2 className="text-[1.5rem] leading-[1.75rem] font-bold text-[#191716]">
                  {organizationName}
                </h2>
                <div
                  className={`${
                    isOrganizationActive
                      ? "bg-[#E9F7EF] text-[#27AE60]"
                      : "bg-[#E99E104D] text-[#E99E10]"
                  }
                  text-[0.6rem] leading-[0.75rem] font-normal w-fit px-3 py-1 rounded-xl`}
                >
                  {isOrganizationActive ? "ACTIVE" : "INACTIVE"}
                </div>
              </div>
            </div>
            <Link
              href={`/dashboard/organizations/view-organization-users?data=${Buffer.from(
                JSON.stringify({
                  name: organizationName,
                  category: capitalize(organizationCategory),
                  id: organizationId,
                })
              ).toString("base64")}`}
              className="bg-[#E9F3FA] text-[#2085C9] rounded-lg h-9 gap-2 px-3 text-[0.825rem] flex items-center leading-[0.98rem]"
            >
              <BsPeopleFill size={18} fill="#2085C9" />
              <h3>Manage Users</h3>
            </Link>
          </div>
          <div className="w-full grid grid-cols-3 gap-2.5">
            {revenueData.map((rv, i) => {
              return (
                <div className="relative overflow-hidden bg-white w-full rounded-xl px-6 pt-3 pb-4 gap-6 h-44 flex flex-col justify-end items-start">
                  <div className="bg-primary-accent rounded-full p-2">
                    {rv.icon}
                  </div>
                  <div className="w-[70%] flex justify-between">
                    <div className="w-fit flex flex-col">
                      <h3 className="text-med-button text-[#9EA4AA]">
                        {rv.title}
                      </h3>
                      {loading ? (
                        <Loader color="primary.6" size={24} />
                      ) : (
                        <h2 className="text-dash-intro-header font-bold text-gray-5">
                          ₦{rv.value.toLocaleString("en-US")}
                        </h2>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {organizationId !== -1 && (
            <ViewOrganizationHistory
              id={organizationId}
              name={organizationName!}
            />
          )}
        </div>
      </div>
      {addGroup && (
        <Drawer.Root
          opened={addGroup}
          onClose={() => shouldAddGroup(false)}
          position={"right"}
          padding={0}
          radius={12}
          closeOnClickOutside={false}
          closeOnEscape={false}
        >
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Body>
              <AddGroup
                onClose={() => shouldAddGroup(false)}
                onCreated={() => {
                  shouldAddGroup(false);
                  window.location.reload();
                }}
              />
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Root>
      )}
    </>
  );
};

export default ViewOrganization;
