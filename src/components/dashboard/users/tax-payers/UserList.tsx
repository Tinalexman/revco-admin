import React, { useState } from "react";

import { useDisclosure } from "@mantine/hooks";
import { IoIosArrowDown } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import Filters from "../Filters";
import StatusContainer, {
  STATE_SUCCESS,
  STATE_PENDING,
} from "@/components/reusable/StatusContainer";
import { Drawer, Loader } from "@mantine/core";
import ViewUser from "./ViewUser";
import EditUser from "./EditUser";

import { useRouter } from "next/navigation";
import { useGetTaxPayers } from "@/hooks/userHooks";
import Paginator from "@/components/reusable/paginator/Paginator";

export interface iUserData {
  taxPayerID: string;
  name: string;
  email: string;
  userType: string;
  status: string;
  statusText: string;
  phoneNumber: string;
  registrationDate: string;
}

const UserList = () => {
  const [indexOfChildToBeViewed, setIndexOfChildToBeViewed] =
    useState<number>(0);
  const router = useRouter();
  const childrenNames: string[] = ["All", "Individual", "Corporate"];
  const [currentUser, setCurrentUser] = useState<iUserData | null>(null);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const [opened, { open, close }] = useDisclosure(false);
  const closeDrawer = () => {
    setCurrentUser(null);
    close();
  };

  const { data, loading, getUsers } = useGetTaxPayers();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(data.count / 50);

  function handlePageChange(page: number) {
    setCurrentPage(page);
    getUsers(`${page}`, getRoleValue(childrenNames[indexOfChildToBeViewed]));
  }

  const getRoleValue = (role: string) => {
    if (role === "Individual") return "Individual";
    if (role === "Corporate") return "Non-Individual";
    return "";
  };

  return (
    <>
      <div className="w-full bg-white p-5 flex flex-col gap-3 rounded-xl">
        <div className="h-14 bg-white rounded-xl w-full flex items-center justify-start">
          <div className="p-0.5 h-9 bg-background w-fit rounded-xl flex overflow-hidden">
            {childrenNames.map((childName, index) => (
              <div
                key={index}
                onClick={() => {
                  setIndexOfChildToBeViewed(index);
                  setCurrentPage(1);
                  getUsers("1", getRoleValue(childName));
                }}
                className={`text-reg-caption cursor-pointer transition-all duration-300 ease-out px-4 grid place-content-center font-semibold ${
                  indexOfChildToBeViewed === index
                    ? "text-primary bg-white"
                    : "text-[#A9A9A9]"
                } ${
                  index === 0
                    ? "rounded-l-xl"
                    : index === childrenNames.length - 1
                    ? "rounded-r-xl"
                    : ""
                }`}
              >
                <h3>{childName}</h3>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex justify-between items-center">
          <h2 className="text-black text-med-button">User List</h2>
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
          <button className="bg-[#F0E6FC] rounded text-primary flex gap-3 items-center px-3 h-10">
            <p className="text-[0.815rem] leading-[0.975rem]">Export</p>
            <IoIosArrowDown />
          </button>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full">
            <thead className="w-full bg-[#F3F7FC] h-14">
              <tr className="text-[#3A3A3A] font-medium text-[0.75rem] leading-[1.125rem]">
                <th scope="col" className="text-left px-4">
                  Tax Payer ID
                </th>
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
                  .map((user, i) => {
                    return (
                      <tr
                        key={i}
                        className="odd:bg-white even:bg-slate-50 text-[#3A3A3A] text-[0.75rem] leading-[1.125rem] justify-around"
                      >
                        <td className="p-4">{user.id}</td>
                        <td className="p-4">
                          {user.firstName} {user.lastName}
                        </td>
                        <td className="p-4">{user.email}</td>
                        <td className="p-4">
                          {user.role === "Non-Individual"
                            ? "Corporate"
                            : user.role}
                        </td>
                        <td className="p-4">
                          <StatusContainer
                            text={!user.active ? "Inactive" : "Active"}
                            status={
                              !user.active ? STATE_PENDING : STATE_SUCCESS
                            }
                          />
                        </td>
                        <td className="flex gap-1 p-4">
                          <div
                            onClick={() => {
                              setCurrentUser({
                                email: user.email,
                                name: `${user.firstName} ${user.lastName}`,
                                phoneNumber: user.phone,
                                registrationDate: user.createdAt,
                                status: !user.active
                                  ? STATE_PENDING
                                  : STATE_SUCCESS,
                                statusText: !user.active
                                  ? "Inactive"
                                  : "Active",
                                taxPayerID: user.id,
                                userType: user.role,
                              });
                              open();
                            }}
                            className="cursor-pointer bg-[#FCEAE8] rounded size-6 grid place-content-center text-[#292D32]"
                          >
                            <IoEye size={16} />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
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
      {currentUser !== null && (
        <Drawer.Root
          opened={opened}
          onClose={closeDrawer}
          position={"right"}
          padding={0}
          radius={12}
          closeOnClickOutside={false}
          closeOnEscape={false}
        >
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Body>
              {editMode ? (
                <EditUser
                  user={currentUser}
                  onClose={() => {
                    setEditMode(false);
                  }}
                />
              ) : (
                <ViewUser
                  user={currentUser}
                  onClose={closeDrawer}
                  onEdit={() => {
                    setEditMode(true);
                  }}
                  viewTransactions={() => {
                    router.push(
                      `/dashboard/users/transactions?name=${currentUser.name}&phoneNumber=${currentUser.phoneNumber}`
                    );
                  }}
                />
              )}
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Root>
      )}
    </>
  );
};

export default UserList;
