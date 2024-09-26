"use client";

import React, { useState } from "react";

import { useDisclosure } from "@mantine/hooks";
import { DocumentText } from "iconsax-react";
import { IoEye } from "react-icons/io5";
import Filters from "@/components/dashboard/common/Filters";
import StatusContainer, {
  STATE_ERROR,
  STATE_NULL,
  STATE_PENDING,
  STATE_SUCCESS,
} from "@/components/reusable/StatusContainer";
import { IoIosArrowDown } from "react-icons/io";

import { FaFileCircleXmark, FaUserCheck } from "react-icons/fa6";
import CreateNewTicket from "./CreateNewTicket";
import CloseTicket from "./CloseTicket";

interface iSupportIssue {
  ticketNumber: string;
  username: string;
  issue: string;
  category: string;
  priority: string;
  statusText: string;
  status: string;
}

const Support = () => {
  const [openedNewTicket, shouldOpenNewTicket] = useState(false);
  const [openedCloseTicket, shouldCloseTicket] = useState(false);
  const [expanded, setExpanded] = useState<boolean>(false);

  const [issues, setIssues] = useState<iSupportIssue[]>([
    {
      ticketNumber: "0192234",
      username: "John Adebayo",
      issue: "Unable to process payment",
      category: "Payment Issue",
      priority: "High",
      status: STATE_PENDING,
      statusText: "In progress",
    },
    {
      ticketNumber: "0192234",
      username: "John Adebayo",
      issue: "Unable to process payment",
      category: "Payment Issue",
      priority: "High",
      status: STATE_SUCCESS,
      statusText: "Resolved",
    },
    {
      ticketNumber: "0192234",
      username: "John Adebayo",
      issue: "Unable to process payment",
      category: "Payment Issue",
      priority: "High",
      status: STATE_NULL,
      statusText: "Closed",
    },
    {
      ticketNumber: "0192234",
      username: "John Adebayo",
      issue: "Unable to process payment",
      category: "Payment Issue",
      priority: "High",
      status: STATE_ERROR,
      statusText: "Open",
    },
  ]);

  return (
    <>
      <div className="w-full flex flex-col gap-2.5">
        <div className="px-8 bg-white w-full h-[4.5rem]">
          <div className="w-full flex justify-between items-center border-t border-gray-4 py-2">
            <div className="flex flex-col">
              <h2 className="text-monokai font-semibold text-dash-intro-header">
                Support & Helpdesk
              </h2>
              <h3 className="text-primary text-reg-caption">
                Manage all user queries and support request
              </h3>
            </div>
            <button
              onClick={() => shouldOpenNewTicket(true)}
              className="bg-primary text-white rounded-lg h-9 gap-2 px-3 text-[0.825rem] flex items-center leading-[0.98rem]"
            >
              <DocumentText size="22" color="#FFFFFF" />
              <h3>Create New Ticket</h3>
            </button>
          </div>
        </div>
        <div className="w-full px-8">
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
            <div className="w-full overflow-x-auto">
              <table className="w-full overflow-x-auto">
                <thead className="w-full bg-[#F3F7FC] h-14">
                  <tr className="text-[#3A3A3A] font-medium text-[0.75rem] leading-[1.125rem]">
                    <th scope="col" className="text-start px-4">
                      Ticket Number
                    </th>
                    <th scope="col" className="text-start px-4">
                      Payer Name
                    </th>
                    <th scope="col" className="text-start px-4">
                      Issue
                    </th>
                    <th scope="col" className="text-start px-4">
                      Category
                    </th>
                    <th scope="col" className="text-start px-4">
                      Priority
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
                  {issues.map((issue, i) => (
                    <tr
                      key={i}
                      className="odd:bg-white even:bg-slate-50 text-[#3A3A3A] text-[0.75rem] leading-[1.125rem] justify-around"
                    >
                      <td className="p-4">{issue.ticketNumber}</td>
                      <td className="p-4">{issue.username}</td>
                      <td className="p-4">{issue.issue}</td>
                      <td className="p-4">{issue.category}</td>
                      <td className="p-4">{issue.priority}</td>
                      <td className="p-4">
                        <StatusContainer
                          status={issue.status}
                          text={issue.statusText}
                        />
                      </td>

                      <td className="p-4 flex gap-1 w-fit items-center">
                        <div className="cursor-pointer bg-[#FCEAE8] rounded size-6 grid place-content-center text-[#292D32]">
                          <IoEye size={16} />
                        </div>
                        <div className="cursor-pointer bg-[#E4ECF7] rounded size-6 grid place-content-center text-[#292D32]">
                          <FaUserCheck size={16} />
                        </div>
                        <div
                          onClick={() => shouldCloseTicket(true)}
                          className="cursor-pointer bg-[#FDC6C6] rounded size-6 grid place-content-center text-[#292D32]"
                        >
                          <FaFileCircleXmark size={16} />
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
      {openedNewTicket && (
        <CreateNewTicket close={() => shouldOpenNewTicket(false)} />
      )}
      {openedCloseTicket && (
        <CloseTicket close={() => shouldCloseTicket(false)} />
      )}
    </>
  );
};

export default Support;
