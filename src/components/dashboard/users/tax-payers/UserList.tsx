import React, { useState } from "react";

import { useDisclosure } from "@mantine/hooks";
import { IoIosArrowDown } from "react-icons/io";
import { convertDateWithDashesAndTime } from "@/functions/dateFunctions";
import { IoEye } from "react-icons/io5";
import { HiReceiptRefund } from "react-icons/hi2";
import Filters from "../Filters";
import StatusContainer, {
  STATE_SUCCESS,
  STATE_PENDING,
} from "@/components/reusable/StatusContainer";
import { Drawer } from "@mantine/core";
import ViewUser from "./ViewUser";
import EditUser from "./EditUser";

export interface iUserData {
  taxPayerID: string;
  name: string;
  email: string;
  userType: string;
  nin: string;
  status: string;
  statusText: string;
  phoneNumber: string;
  registrationDate: string;
  lastLogin: string;
}

const UserList = () => {
  const [indexOfChildToBeViewed, setIndexOfChildToBeViewed] =
    useState<number>(0);

  const childrenNames: string[] = ["All", "Banks", "Ministries", "Others"];
  const [currentUser, setCurrentUser] = useState<iUserData | null>(null);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [users, setUsers] = useState<iUserData[]>([
    {
      taxPayerID: "TXN12345",
      name: "Bola Tunde",
      email: "johndoe@mail.com",
      userType: "Individual",
      nin: "12345678900",
      status: STATE_SUCCESS,
      statusText: "Active",
      phoneNumber: "09012345678",
      registrationDate: "2024-01-15",
      lastLogin: "2024-01-15",
    },
    {
      taxPayerID: "TXN12345",
      name: "Bola Tunde",
      email: "johndoe@mail.com",
      userType: "Individual",
      nin: "12345678900",
      status: STATE_PENDING,
      statusText: "Pending",
      phoneNumber: "09012345678",
      registrationDate: "2024-01-15",
      lastLogin: "2024-01-15",
    },
    {
      taxPayerID: "TXN12345",
      name: "Bola Tunde",
      email: "johndoe@mail.com",
      userType: "Individual",
      nin: "12345678900",
      status: STATE_SUCCESS,
      statusText: "Active",
      phoneNumber: "09012345678",
      registrationDate: "2024-01-15",
      lastLogin: "2024-01-15",
    },
    {
      taxPayerID: "TXN12345",
      name: "Bola Tunde",
      email: "johndoe@mail.com",
      userType: "Individual",
      nin: "12345678900",
      status: STATE_SUCCESS,
      statusText: "Active",
      phoneNumber: "09012345678",
      registrationDate: "2024-01-15",
      lastLogin: "2024-01-15",
    },
    {
      taxPayerID: "TXN12345",
      name: "Bola Tunde",
      email: "johndoe@mail.com",
      userType: "Individual",
      nin: "12345678900",
      status: STATE_SUCCESS,
      statusText: "Active",
      phoneNumber: "09012345678",
      registrationDate: "2024-01-15",
      lastLogin: "2024-01-15",
    },
  ]);

  const [opened, { open, close }] = useDisclosure(false);

  const closeDrawer = () => {
    setCurrentUser(null);
    close();
  };

  return (
    <>
      <div className="w-full bg-white p-5 flex flex-col gap-3 rounded-xl">
        <div className="h-14 bg-white rounded-xl w-full flex items-center justify-start">
          <div className="p-0.5 h-9 bg-background w-fit rounded-xl flex overflow-hidden">
            {childrenNames.map((childName, index) => (
              <div
                key={index}
                onClick={() => setIndexOfChildToBeViewed(index)}
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
          <button className="bg-[#F0E6FC] rounded text-primary flex gap-3 items-center px-3 h-10">
            <p className="text-[0.815rem] leading-[0.975rem]">Export</p>
            <IoIosArrowDown />
          </button>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full">
            <thead className="w-full bg-[#F3F7FC] h-14">
              <tr className="text-[#3A3A3A] font-medium text-[0.75rem] leading-[1.125rem]">
                <th scope="col">Tax Payer ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">User Type</th>
                <th scope="col">NIN</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(0, expanded ? users.length : 5).map((user, i) => {
                const formattedNin =
                  user.nin.substring(0, 5) + "****" + user.nin.substring(9);
                return (
                  <tr
                    key={i}
                    className="odd:bg-white even:bg-slate-50 text-[#3A3A3A] text-[0.75rem] leading-[1.125rem] justify-around"
                  >
                    <td className="p-4">{user.taxPayerID}</td>
                    <td className="p-4">{user.name}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">{user.userType}</td>
                    <td className="p-4">{formattedNin}</td>
                    <td className="p-4">
                      <StatusContainer
                        text={user.statusText}
                        status={user.status}
                      />
                    </td>
                    <td className="flex gap-1 p-4">
                      <div
                        onClick={() => {
                          setCurrentUser(user);
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
