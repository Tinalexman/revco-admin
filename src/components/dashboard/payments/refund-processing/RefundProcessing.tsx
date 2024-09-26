"use client";

import React, { useState } from "react";
import { IoIosArrowDown, IoMdAdd } from "react-icons/io";
import { FaReceipt } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";
import Filters from "../../common/Filters";
import { Drawer, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import StatusContainer, {
  STATE_SUCCESS,
  STATE_ERROR,
  STATE_PENDING,
  STATE_NULL,
} from "@/components/reusable/StatusContainer";

import {
  BsFillFileEarmarkCheckFill,
  BsFillFileEarmarkXFill,
} from "react-icons/bs";

import { convertDateWithDashesAndTime } from "@/functions/dateFunctions";
import ChannelAction from "./ChannelAction";

export interface iRefund {
  refundID: string;
  payerName: string;
  transactionID: string;
  amount: number;
  requestDate: Date;
  status: string;
  statusText: string;
}

const RefundProcessing = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [opened, { open, close }] = useDisclosure(false);

  const [refunds, setRefunds] = useState<iRefund[]>([
    {
      refundID: "1234567890",
      payerName: "Bolaji Tunde",
      transactionID: "1234567890",
      amount: 50000,
      requestDate: new Date("2024-08-11"),
      status: STATE_SUCCESS,
      statusText: "Approved",
    },
    {
      refundID: "1234567890",
      payerName: "Bolaji Tunde",
      transactionID: "1234567890",
      amount: 50000,
      requestDate: new Date("2024-08-11"),
      status: STATE_PENDING,
      statusText: "Pending",
    },
    {
      refundID: "1234567890",
      payerName: "Bolaji Tunde",
      transactionID: "1234567890",
      amount: 50000,
      requestDate: new Date("2024-08-11"),
      status: STATE_ERROR,
      statusText: "Rejected",
    },
  ]);

  const [currentRefund, setCurrentRefund] = useState<{
    refund: iRefund;
    action: boolean;
  } | null>(null);

  const openModal = (refund: iRefund, action: boolean) => {
    setCurrentRefund({ refund, action });
    open();
  };

  const closeModal = () => {
    setCurrentRefund(null);
    close();
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
              Refund Processing
            </p>
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
                      Refund ID
                    </th>
                    <th scope="col" className="text-start px-4">
                      Payer Name
                    </th>
                    <th scope="col" className="text-start px-4">
                      Transaction ID
                    </th>
                    <th scope="col" className="text-start px-4">
                      Amount Paid
                    </th>
                    <th scope="col" className="text-start px-4">
                      Request Date
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
                  {refunds.map((rfnd, i) => (
                    <tr
                      key={i}
                      className="odd:bg-white even:bg-slate-50 text-[#3A3A3A] text-[0.75rem] leading-[1.125rem] justify-around"
                    >
                      <td className="p-4">{rfnd.refundID}</td>
                      <td className="p-4">{rfnd.payerName}</td>
                      <td className="p-4">{rfnd.transactionID}</td>
                      <td className="p-4">
                        ₦{rfnd.amount.toLocaleString("en-US")}
                      </td>
                      <td className="p-4">
                        {convertDateWithDashesAndTime(rfnd.requestDate)}
                      </td>
                      <td className="p-4">
                        <StatusContainer
                          status={rfnd.status}
                          text={rfnd.statusText}
                        />
                      </td>

                      <td
                        className={`${
                          rfnd.status === STATE_PENDING ? "px-4" : "pl-8"
                        } py-4 `}
                      >
                        {rfnd.status === STATE_PENDING && (
                          <div className="flex items-center gap-1">
                            <div
                              onClick={() => openModal(rfnd, true)}
                              className="cursor-pointer bg-[#E4F7E7] rounded size-6 grid place-content-center text-[#219653]"
                            >
                              <BsFillFileEarmarkCheckFill size={16} />
                            </div>
                            <div
                              onClick={() => openModal(rfnd, false)}
                              className="cursor-pointer bg-[#E9101038] rounded size-6 grid place-content-center text-[#FF3B30]"
                            >
                              <BsFillFileEarmarkXFill size={16} />
                            </div>
                          </div>
                        )}
                        {rfnd.status !== STATE_PENDING && (
                          <div className="cursor-pointer bg-[#FCEAE8] rounded size-6 grid place-content-center text-[#292D32]">
                            <IoEye size={16} />
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {opened && currentRefund !== null && (
        <Modal.Root
          opened={opened}
          onClose={close}
          centered
          padding={0}
          top={0}
          size={"350px"}
          radius={"lg"}
          closeOnClickOutside={false}
          closeOnEscape={false}
        >
          <Modal.Overlay />
          <Modal.Content>
            <Modal.Body>
              <ChannelAction enable={currentRefund.action} onClose={close} />
            </Modal.Body>
          </Modal.Content>
        </Modal.Root>
      )}
    </>
  );
};

export default RefundProcessing;
