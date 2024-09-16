"use client";

import React, { useState } from "react";
import { IoIosArrowDown, IoMdAdd } from "react-icons/io";
import { FaReceipt } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";
import Filters from "../../common/activity/Filters";
import { Drawer, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import StatusContainer, {
  STATE_SUCCESS,
  STATE_ERROR,
  STATE_PENDING,
  STATE_NULL,
} from "@/components/reusable/StatusContainer";

import { RiEdit2Fill } from "react-icons/ri";
import { TiCancel } from "react-icons/ti";
import { convertDateWithDashesAndTime } from "@/functions/dateFunctions";
import GenerateInvoice from "./GenerateInvoice";

export interface iInvoice {
  invoiceNo: string;
  payerName: string;
  serviceType: string;
  amount: number;
  dueDate: Date;
  status: string;
  statusText: string;
}

const InvoiceManagement = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [
    openedGenerateInvoice,
    { open: openGenerateInvoice, close: closeGenerateInvoice },
  ] = useDisclosure(false);
  const [
    openedEditChannel,
    { open: openEditChannel, close: closeEditChannel },
  ] = useDisclosure(false);
  const [
    openedChannelAction,
    { open: openChannelAction, close: closeChannelAction },
  ] = useDisclosure(false);

  const [invoices, setInvoices] = useState<iInvoice[]>([
    {
      invoiceNo: "1234567890",
      payerName: "Bolaji Tunde",
      serviceType: "PAYEE",
      amount: 50000,
      dueDate: new Date("2024-08-11"),
      status: STATE_SUCCESS,
      statusText: "Paid",
    },
    {
      invoiceNo: "1234567890",
      payerName: "Bolaji Tunde",
      serviceType: "PAYEE",
      amount: 50000,
      dueDate: new Date("2024-08-11"),
      status: STATE_NULL,
      statusText: "Unpaid",
    },
    {
      invoiceNo: "1234567890",
      payerName: "Bolaji Tunde",
      serviceType: "PAYEE",
      amount: 50000,
      dueDate: new Date("2024-08-11"),
      status: STATE_ERROR,
      statusText: "Overdue",
    },
  ]);

  const [currentInvoice, setCurrentInvoice] = useState<iInvoice | null>(null);

  const openEditDrawer = (invoice: iInvoice) => {
    setCurrentInvoice(invoice);
    openEditChannel();
  };

  const closeEditDrawer = () => {
    setCurrentInvoice(null);
    closeEditChannel();
  };

  const openActionModal = (invoice: iInvoice) => {
    setCurrentInvoice(invoice);
    openChannelAction();
  };

  const closeActionModal = () => {
    setCurrentInvoice(null);
    closeChannelAction();
  };

  return (
    <>
      <div className="w-full flex flex-col">
        <div className="px-8 bg-white w-full h-[4.5rem]">
          <div className="w-full flex flex-col justify-around py-2">
            <h2 className="text-monokai font-semibold text-dash-intro-header">
              Payments
            </h2>
            <h3 className="text-primary text-reg-caption">
              Manage all transactions and data on the Revco service
            </h3>
          </div>
        </div>
        <div className="py-5 px-10 w-full flex flex-col gap-2.5">
          <div className="h-14 bg-white rounded-xl w-full flex items-center justify-between px-7">
            <p className="font-semibold text-dash-header text-gray-5">
              Invoice Management
            </p>
            <button
              onClick={openGenerateInvoice}
              className="bg-primary text-white rounded-lg h-9 gap-2 px-3 text-[0.825rem] flex items-center leading-[0.98rem]"
            >
              Generate New Invoice <FaReceipt />
            </button>
          </div>
          <div className="w-full bg-white p-5 flex flex-col gap-3 rounded-xl">
            <div className="w-full flex justify-between items-center">
              <h2 className="text-black text-med-button">Recent Activity</h2>
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
                    <th scope="col" className="text-start px-4">
                      Invoice Number
                    </th>
                    <th scope="col" className="text-start px-4">
                      Payer Name
                    </th>
                    <th scope="col" className="text-start px-4">
                      Service type
                    </th>
                    <th scope="col" className="text-start px-4">
                      Amount Paid
                    </th>
                    <th scope="col" className="text-start px-4">
                      Due Date
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
                  {invoices.map((inv, i) => (
                    <tr
                      key={i}
                      className="odd:bg-white even:bg-slate-50 text-[#3A3A3A] text-[0.75rem] leading-[1.125rem] justify-around"
                    >
                      <td className="p-4">{inv.invoiceNo}</td>
                      <td className="p-4">{inv.payerName}</td>
                      <td className="p-4">{inv.serviceType}</td>
                      <td className="p-4">
                        ₦{inv.amount.toLocaleString("en-US")}
                      </td>
                      <td className="p-4">
                        {convertDateWithDashesAndTime(inv.dueDate)}
                      </td>
                      <td className="p-4">
                        <StatusContainer
                          status={inv.status}
                          text={inv.statusText}
                        />
                      </td>

                      <td className="p-4">
                        <div className="cursor-pointer bg-[#FCEAE8] rounded size-6 grid place-content-center text-[#292D32]">
                          <IoEye size={16} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* {openedAddChannel && (
        <Drawer.Root
          opened={openedAddChannel}
          onClose={closeAddChannel}
          position={"right"}
          padding={0}
          radius={12}
          closeOnClickOutside={false}
          closeOnEscape={false}
        >
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Body>
              <AddChannel onClose={closeAddChannel} />
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Root>
      )}
      {currentChannel !== null && openedEditChannel && (
        <Drawer.Root
          opened={openedEditChannel}
          onClose={closeEditDrawer}
          position={"right"}
          padding={0}
          radius={12}
          closeOnClickOutside={false}
          closeOnEscape={false}
        >
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Body>
              <EditChannel
                channel={{
                  apiKey: "38383232332323e23rwn",
                  channelName: currentChannel.name,
                  clientID: "Paysure Ltd",
                  email: "support@revco",
                  phone: "+234 5585 33434 ",
                  type: "Online",
                  status: true,
                }}
                onClose={closeEditDrawer}
              />
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Root>
      )} */}
      {openedGenerateInvoice && (
        <Modal.Root
          opened={openedGenerateInvoice}
          onClose={closeGenerateInvoice}
          centered
          padding={0}
          top={0}
          size={"60vw"}
          radius={"lg"}
          // closeOnClickOutside={false}
          // closeOnEscape={false}
        >
          <Modal.Overlay />
          <Modal.Content>
            <Modal.Body>
              <GenerateInvoice onClose={closeGenerateInvoice} />
            </Modal.Body>
          </Modal.Content>
        </Modal.Root>
      )}
    </>
  );
};

export default InvoiceManagement;
