import React, { useState } from "react";
import Filters from "./Filters";
import { Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IoIosArrowDown } from "react-icons/io";
import { convertDateWithDashesAndTime } from "@/functions/dateFunctions";
import { IoEye } from "react-icons/io5";
import { HiReceiptRefund } from "react-icons/hi2";
// import ViewTransaction from "./ViewTransaction";
import StatusContainer, {
  STATE_SUCCESS,
  STATE_PENDING,
} from "@/components/reusable/StatusContainer";

export interface iOrganization {
  userID: string;
  name: string;
  serviceType: string;
  email: string;
  tin: string;
  status: string;
  statusText: string;
}

const OrganizationList = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<iOrganization[]>([
    {
      userID: "GP001",
      name: "First Bank",
      status: STATE_SUCCESS,
      statusText: "Active",
      serviceType: "Banking Sector",
      email: "firstbank@mail.com",
      tin: "123456789876",
    },
    {
      userID: "GP002",
      name: "Zenith Bank",
      status: STATE_PENDING,
      statusText: "Pending",
      serviceType: "Banking Sector",
      email: "zenithbank@mail.com",
      tin: "123456789876",
    },
    {
      userID: "GP003",
      name: "Road Safety",
      status: STATE_SUCCESS,
      statusText: "Active",
      serviceType: "Ministry",
      email: "lastma@mail.com",
      tin: "123456789876",
    },
    {
      userID: "GP004",
      name: "State University",
      status: STATE_SUCCESS,
      statusText: "Active",
      serviceType: "Education",
      email: "ui@mail.com",
      tin: "123456789876",
    },
  ]);

  const [opened, { open, close }] = useDisclosure(false);
  const [currentTransaction, setCurrentTransaction] =
    useState<iOrganization | null>(null);

  const openDrawer = (transaction: iOrganization) => {
    setCurrentTransaction(transaction);
    open();
  };

  const closeDrawer = () => {
    setCurrentTransaction(null);
    close();
  };

  return (
    <>
      <div className="w-full bg-white p-5 flex flex-col gap-3 rounded-xl">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-black text-med-button">List of Organizations</h2>
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
                <th scope="col">User ID</th>
                <th scope="col">Name</th>
                <th scope="col">Service Type</th>
                <th scope="col">Email</th>
                <th scope="col">TIN</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions
                .slice(0, expanded ? transactions.length : 5)
                .map((txn, i) => (
                  <tr
                    key={i}
                    className="odd:bg-white even:bg-slate-50 text-[#3A3A3A] text-[0.75rem] leading-[1.125rem] justify-around"
                  >
                    <td className="p-4">{txn.userID}</td>
                    <td className="p-4">{txn.name}</td>

                    <td className="p-4">{txn.serviceType}</td>
                    <td className="p-4">{txn.email}</td>
                    <td className="p-4">{txn.tin}</td>
                    <td className="p-4">
                      <StatusContainer
                        text={txn.statusText}
                        status={txn.status}
                      />
                    </td>
                    <td className="flex gap-1 p-4">
                      <div
                        onClick={() => openDrawer(txn)}
                        className="cursor-pointer bg-[#FCEAE8] rounded size-6 grid place-content-center text-[#292D32]"
                      >
                        <IoEye size={16} />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* {currentTransaction !== null && (
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
              <ViewTransaction
                transaction={currentTransaction}
                onClose={closeDrawer}
                shouldRefund={true}
                shouldPrint={true}
              />
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Root>
      )} */}
    </>
  );
};

export default OrganizationList;
