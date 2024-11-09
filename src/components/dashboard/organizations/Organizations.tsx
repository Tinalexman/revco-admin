"use client";

import React, { useState } from "react";

import { Profile, Profile2User } from "iconsax-react";
import { VscTools } from "react-icons/vsc";
import OrganizationList from "./OrganizationList";
import { Drawer, Loader } from "@mantine/core";
import AddGroup from "./AddGroup";
import { useRouter } from "next/navigation";
import { useGetOrganizationsOverview } from "@/hooks/organizationHooks";

const Organizations = () => {
  const [addGroup, shouldAddGroup] = useState<boolean>(false);
  const router = useRouter();
  const { data, loading } = useGetOrganizationsOverview();

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
          <div className="h-14 bg-white rounded-xl w-full flex items-center justify-between px-7">
            <p className="font-semibold text-dash-header text-gray-5">
              Overview
            </p>
          </div>
          <div className="w-full grid grid-cols-4 gap-2.5">
            {data.map((org, i) => {
              const hasLink: boolean = i !== 0 && org.name !== "";

              return (
                <div
                  onClick={() => {
                    if (hasLink) {
                      router.push(
                        `/dashboard/organizations/type?type=${org.name}`
                      );
                    }
                  }}
                  className={`relative overflow-hidden ${
                    hasLink && "cursor-pointer"
                  } bg-white w-full rounded-xl px-6 pt-3 pb-4 gap-6 h-44 flex flex-col justify-end items-start`}
                  key={i}
                >
                  <div className="bg-primary-accent rounded-full p-2">
                    <Profile2User
                      size={20}
                      className="text-primary"
                      variant="Bold"
                    />
                  </div>
                  <div className="w-[70%] flex justify-between">
                    <div className="w-fit flex flex-col">
                      <h3 className="text-med-button text-[#9EA4AA]">
                        {org.name}
                      </h3>
                      {loading ? (
                        <Loader color="primary.6" size={24} />
                      ) : (
                        <h2 className="text-dash-intro-header font-bold text-gray-5">
                          {org.count}
                        </h2>
                      )}
                    </div>
                  </div>
                  <div className="w-fit flex gap-2 items-center absolute bottom-4 right-2">
                    <div className="flex flex-col w-fit">
                      <h3 className="text-[0.49rem] leading-[0.7rem] text-gray-5 font-medium">
                        Active
                      </h3>
                      {loading ? (
                        <Loader color="primary.6" size={24} />
                      ) : (
                        <h2 className="text-[0.78rem] leading-[0.8rem] font-semibold text-gray-5">
                          {org.active}
                        </h2>
                      )}
                    </div>
                    <div className="w-[1px] h-6 bg-[#8E8E93]" />
                    <div className="flex flex-col w-fit">
                      <h3 className="text-[0.49rem] leading-[0.7rem] text-gray-5 font-medium">
                        Inactive
                      </h3>
                      {loading ? (
                        <Loader color="primary.6" size={24} />
                      ) : (
                        <h2 className="text-[0.78rem] leading-[0.8rem] font-semibold text-gray-5">
                          {org.inactive}
                        </h2>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <OrganizationList />
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

export default Organizations;
