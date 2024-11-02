"use client";

import React, { useState } from "react";
import { Drawer, Loader } from "@mantine/core";
import { VscTools } from "react-icons/vsc";
import { IoIosAdd } from "react-icons/io";
import Filters from "../Filters";

import StatusContainer, {
  STATE_PENDING,
  STATE_SUCCESS,
} from "@/components/reusable/StatusContainer";
import { IoEye } from "react-icons/io5";
import AddNewUser from "./AddNewUser";
import Link from "next/link";
import { useGetAdminUsers } from "@/hooks/userHooks";
import Paginator from "@/components/reusable/paginator/Paginator";

interface iAdminUser {
  name: string;
  email: string;
  status: string;
  statusText: string;
  userType: string;
}

const AdminUsers = () => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const { loading, data, getUsers } = useGetAdminUsers();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(data.count / 50);

  const [addNewUser, shouldAddNewUser] = useState<boolean>(false);

  function handlePageChange(page: number) {
    setCurrentPage(page);
    getUsers(`${page}`);
  }

  return (
    <>
      <div className="w-full flex flex-col gap-2.5">
        <div className="px-8 bg-white w-full h-[4.5rem]">
          <div className="w-full flex justify-between items-center border-t border-gray-4 py-2">
            <div className="flex flex-col">
              <h2 className="text-monokai font-semibold text-dash-intro-header">
                Admin Users
              </h2>
              <h3 className="text-primary text-reg-caption">
                Manage all admin users
              </h3>
            </div>
            <Link
              href={"/dashboard/users/roles-and-permissions"}
              className="bg-primary text-white rounded-lg h-9 gap-2 px-3 text-[0.825rem] flex items-center leading-[0.98rem]"
            >
              <VscTools size={18} color="#FFFFFF" />
              <h3>User Roles & Permissions</h3>
            </Link>
          </div>
        </div>
        <div className="w-full px-8">
          <div className="w-full bg-white p-5 flex flex-col gap-3 rounded-xl">
            <div className="w-full flex justify-between items-center">
              <h2 className="text-black text-med-button">Admin User List</h2>
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
                className="bg-primary text-white rounded-lg h-9 gap-2 px-3 text-[0.825rem] flex items-center leading-[0.98rem]"
              >
                <IoIosAdd size={26} />
                <h3>Add New User</h3>
              </button>
            </div>
            <div className="w-full overflow-x-auto">
              <table className="w-full overflow-x-auto">
                <thead className="w-full bg-[#F3F7FC] h-14">
                  <tr className="text-[#3A3A3A] font-medium text-[0.75rem] leading-[1.125rem]">
                    <th scope="col" className="text-start px-4">
                      Name
                    </th>
                    <th scope="col" className="text-start px-4">
                      Email
                    </th>
                    <th scope="col" className="text-start px-4">
                      User Type
                    </th>
                    <th scope="col" className="text-start px-4">
                      Status
                    </th>
                    <th scope="col" className="text-start px-4">
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
                          <td className="p-4">
                            {user.firstName} {user.lastName}
                          </td>
                          <td className="p-4">{user.email}</td>
                          <td className="p-4">{user.role}</td>
                          <td className="p-4">
                            <StatusContainer
                              status={
                                user.active ? STATE_SUCCESS : STATE_PENDING
                              }
                              text={user.active ? "Active" : "Inactive"}
                            />
                          </td>

                          <td className="p-4 flex gap-1 w-fit items-center">
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

export default AdminUsers;
