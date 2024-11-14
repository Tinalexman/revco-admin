"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader } from "@mantine/core";
import { Profile, Profile2User } from "iconsax-react";
import { VscTools } from "react-icons/vsc";
import ViewOrganizationHistory from "./ViewOrganizationHistory";
import { Drawer } from "@mantine/core";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BsPeopleFill } from "react-icons/bs";
import { Bank } from "iconsax-react";
import Link from "next/link";
import AddGroup from "../AddGroup";
import {
  iOrganizationBranch,
  useGetOrganizationBranches,
  useGetOrganizationUsers,
} from "@/hooks/organizationHooks";
import Filters from "../Filters";
import Paginator from "@/components/reusable/paginator/Paginator";
import StatusContainer, {
  STATE_PENDING,
  STATE_SUCCESS,
} from "@/components/reusable/StatusContainer";
import { RiEdit2Fill } from "react-icons/ri";
import { MdAdd } from "react-icons/md";
import { capitalize } from "@/functions/stringFunctions";
import AddBranch from "./AddBranch";
import EditBranch from "./EditBranch";

const ViewOrganizationBranches = () => {
  return (
    <Suspense fallback={<Loader color="primary.6" />}>
      <ViewOrganizationContent />
    </Suspense>
  );
};

const ViewOrganizationContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<boolean>(false);
  const organizationData = searchParams.get("data");
  const [organizationName, setOrganizationName] = useState<string>("");
  const [organizationCategory, setOrganizationCategory] = useState<string>("");
  const [organizationId, setOrganizationId] = useState<number>(-1);
  const [organizationActive, setOrganizationActive] = useState<boolean>(false);
  const { data, loading, getBranches } = useGetOrganizationBranches();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(data.count / 50);

  const [addNewBranch, shouldAddNewBranch] = useState<boolean>(false);
  const [currentBranch, setCurrentBranch] =
    useState<iOrganizationBranch | null>(null);

  function handlePageChange(page: number) {
    setCurrentPage(page);
    getBranches(organizationId, page);
  }

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
      getBranches(payload.id, 1);
    }
  }, [router]);

  return (
    <>
      <div className="w-full flex flex-col gap-2.5">
        <div className="w-full px-8 flex flex-col gap-2.5 mt-5">
          <div className="h-14 bg-white rounded-xl w-full flex items-center gap-3 px-7">
            <p
              onClick={() => {
                router.push(`/dashboard/organizations`);
              }}
              className="font-semibold cursor-pointer text-reg-caption text-gray-5"
            >
              Organizations
            </p>
            <IoIosArrowForward className="text-gray-5" size={24} />
            <p
              onClick={() => {
                router.push(
                  `/dashboard/organizations/type?type=${organizationCategory}`
                );
              }}
              className="font-medium cursor-pointer text-reg-caption text-gray-5"
            >
              {organizationCategory}
            </p>
            <IoIosArrowForward className="text-gray-5" size={24} />
            <p
              onClick={() => {
                router.push(
                  `/dashboard/organizations/view-organization?data=${Buffer.from(
                    JSON.stringify({
                      name: organizationName,
                      category: capitalize(
                        organizationCategory === "Ministries"
                          ? "Ministry"
                          : organizationCategory
                      ),
                      id: organizationId,
                      active: organizationActive,
                    })
                  ).toString("base64")}`
                );
              }}
              className="font-medium cursor-pointer text-reg-caption text-gray-5"
            >
              {organizationName}
            </p>
            <IoIosArrowForward className="text-gray-5" size={24} />
            <p className="font-normal text-reg-caption text-gray-5">
              View Branches
            </p>
          </div>

          <div className="w-full bg-white p-5 flex flex-col gap-3 rounded-xl">
            <div className="w-full flex justify-between items-center">
              <h2 className="text-black text-med-button">Branches</h2>
              <h2
                onClick={() => setExpanded(!expanded)}
                className="cursor-pointer text-med-button text-[#007AFF]"
              >
                {expanded ? "View Less" : "View All"}
              </h2>
            </div>
            <div className="w-full justify-between items-center flex">
              <Filters />
              <div className="w-[35%]">
                <Paginator
                  totalPages={totalPages}
                  currentPage={currentPage}
                  handlePageChange={(page) => handlePageChange(page)}
                />
              </div>
              <button
                onClick={() => shouldAddNewBranch(true)}
                className="bg-primary rounded-lg text-white flex gap-3 items-center px-3 h-10"
              >
                <p className="text-[0.815rem] leading-[0.975rem]">
                  Add New Branch
                </p>
                <MdAdd />
              </button>
            </div>
            <div className="relative overflow-x-auto">
              <table className="w-full">
                <thead className="w-full bg-[#F3F7FC] h-14">
                  <tr className="text-[#3A3A3A] font-medium text-[0.75rem] leading-[1.125rem]">
                    <th scope="col" className="text-left px-4">
                      S/N
                    </th>
                    <th scope="col" className="text-left px-4">
                      ID
                    </th>
                    <th scope="col" className="text-left px-4">
                      Name
                    </th>
                    <th scope="col" className="text-left px-4">
                      Office Code
                    </th>
                    <th scope="col" className="text-left px-4">
                      Headquarters
                    </th>
                    <th scope="col" className="text-left px-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!loading &&
                    data.data
                      .slice(0, expanded ? data.data.length : 10)
                      .map((user, i) => (
                        <tr
                          key={i}
                          className="odd:bg-white even:bg-slate-50 text-[#3A3A3A] text-[0.75rem] leading-[1.125rem] justify-around"
                        >
                          <td className="p-4">{i + 1}</td>
                          <td className="p-4">{user.id}</td>
                          <td className="p-4">{user.name}</td>
                          <td className="p-4">{user.officeCode}</td>
                          <td className="p-4">
                            <StatusContainer
                              text={user.isHq ? "True" : "False"}
                              status={user.isHq ? STATE_SUCCESS : STATE_PENDING}
                            />
                          </td>
                          <td className="flex gap-1 p-4">
                            <div
                              onClick={() => setCurrentBranch(user)}
                              className="cursor-pointer bg-[#FCEAE8] rounded size-6 grid place-content-center text-[#292D32]"
                            >
                              <RiEdit2Fill size={16} />
                            </div>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
              {loading && (
                <div className="w-full h-60 grid place-content-center">
                  <Loader color="primary.6" />
                </div>
              )}
              {!loading && data.data.length === 0 && (
                <div className="w-full h-60 grid place-content-center text-[#3A3A3A] font-medium text-[1rem] leading-[1.125rem]">
                  No branches available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {addNewBranch && (
        <Drawer.Root
          opened={addNewBranch}
          onClose={() => shouldAddNewBranch(false)}
          position={"right"}
          padding={0}
          radius={12}
          closeOnClickOutside={false}
          closeOnEscape={false}
        >
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Body>
              <AddBranch
                mdaId={organizationId}
                onClose={() => shouldAddNewBranch(false)}
                onCreated={() => {
                  shouldAddNewBranch(false);
                  window.location.reload();
                }}
              />
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Root>
      )}
      {currentBranch !== null && (
        <Drawer.Root
          opened={true}
          onClose={() => setCurrentBranch(null)}
          position={"right"}
          padding={0}
          radius={12}
          closeOnClickOutside={false}
          closeOnEscape={false}
        >
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Body>
              <EditBranch
                branch={currentBranch}
                onClose={() => setCurrentBranch(null)}
                onCreated={() => {
                  setCurrentBranch(null);
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

export default ViewOrganizationBranches;
