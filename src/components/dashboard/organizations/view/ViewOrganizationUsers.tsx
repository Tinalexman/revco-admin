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
import { useGetOrganizationUsers } from "@/hooks/organizationHooks";
import Filters from "../Filters";
import Paginator from "@/components/reusable/paginator/Paginator";
import StatusContainer, {
  STATE_PENDING,
  STATE_SUCCESS,
} from "@/components/reusable/StatusContainer";
import { IoEye } from "react-icons/io5";
import AddNewUser from "../../users/admin-users/AddNewUser";
import { MdAdd } from "react-icons/md";

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
  const [expanded, setExpanded] = useState<boolean>(false);
  const organizationData = searchParams.get("data");
  const [organizationName, setOrganizationName] = useState<string>("");
  const [organizationCategory, setOrganizationCategory] = useState<string>("");
  const [organizationId, setOrganizationId] = useState<number>(-1);
  const { data, loading, getUsers } = useGetOrganizationUsers();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(data.count / 50);

  const [addNewUser, shouldAddNewUser] = useState<boolean>(false);

  function handlePageChange(page: number) {
    setCurrentPage(page);
    getUsers(organizationId, `${page}`);
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
      getUsers(payload.id, "1");
    }
  }, [router]);

  return (
    <>
      <div className="w-full flex flex-col gap-2.5">
        <div className="w-full px-8 flex flex-col gap-2.5 mt-5">
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
            <IoIosArrowForward className="text-gray-5" size={24} />
            <p className="font-normal text-reg-caption text-gray-5">
              Manage Users
            </p>
          </div>

          <div className="w-full bg-white p-5 flex flex-col gap-3 rounded-xl">
            <div className="w-full flex justify-between items-center">
              <h2 className="text-black text-med-button">Users</h2>
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
                onClick={() => shouldAddNewUser(true)}
                className="bg-primary rounded-lg text-white flex gap-3 items-center px-3 h-10"
              >
                <p className="text-[0.815rem] leading-[0.975rem]">
                  Add New User
                </p>
                <MdAdd />
              </button>
            </div>
            <div className="relative overflow-x-auto">
              <table className="w-full">
                <thead className="w-full bg-[#F3F7FC] h-14">
                  <tr className="text-[#3A3A3A] font-medium text-[0.75rem] leading-[1.125rem]">
                    <th scope="col" className="text-left px-4">
                      Name
                    </th>
                    <th scope="col" className="text-left px-4">
                      Email
                    </th>
                    <th scope="col" className="text-left px-4">
                      User Type
                    </th>
                    <th scope="col" className="text-left px-4">
                      Status
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
                          <td className="p-4">{user.name}</td>
                          <td className="p-4">{user.email}</td>
                          <td className="p-4">{user.role}</td>
                          <td className="p-4">
                            <StatusContainer
                              text={user.status ? "Active" : "Pending"}
                              status={
                                user.status ? STATE_SUCCESS : STATE_PENDING
                              }
                            />
                          </td>
                          <td className="flex gap-1 p-4">
                            <div className="cursor-pointer bg-[#FCEAE8] rounded size-6 grid place-content-center text-[#292D32]">
                              <IoEye size={16} />
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
                  No users available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {addNewUser && (
        <Drawer.Root
          opened={addNewUser}
          onClose={() => shouldAddNewUser(false)}
          position={"right"}
          padding={0}
          radius={12}
          closeOnClickOutside={false}
          closeOnEscape={false}
        >
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Body>
              <AddNewUser
                onClose={() => shouldAddNewUser(false)}
                onCreate={() => {
                  shouldAddNewUser(false);
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
