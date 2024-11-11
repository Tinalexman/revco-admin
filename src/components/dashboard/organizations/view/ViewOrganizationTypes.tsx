"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader } from "@mantine/core";
import { Profile, Profile2User } from "iconsax-react";
import { VscTools } from "react-icons/vsc";
import ViewOrganizationTypesList from "./ViewOrganizationTypeList";
import { Drawer } from "@mantine/core";
import { IoIosArrowForward } from "react-icons/io";
import AddGroup from "../AddGroup";
import { useGetOrganizationTypeOverview } from "@/hooks/organizationHooks";
import { MdPayments } from "react-icons/md";

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

const ViewOrganizationTypes = () => {
  return (
    <Suspense fallback={<Loader color="primary.6" />}>
      <ViewOrganizationTypesContent />
    </Suspense>
  );
};

const ViewOrganizationTypesContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const organizationType = searchParams.get("type");
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
    if (organizationType === null) {
      router.back();
    } else {
      let query = organizationType;
      if (query === "Ministries") {
        query = "Ministry";
      }
      getOverview(query);
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
            <p
              onClick={() => {
                router.push(`/dashboard/organizations`);
              }}
              className="font-semibold text-reg-caption text-gray-5"
            >
              Organizations
            </p>
            <IoIosArrowForward className="text-gray-5" size={24} />
            <p className="font-medium text-reg-caption text-gray-5">
              {organizationType!}
            </p>
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
          <ViewOrganizationTypesList organizationCategory={organizationType!} />
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

export default ViewOrganizationTypes;
