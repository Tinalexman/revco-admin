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
import { iDispute, useGetAllDisputes } from "@/hooks/supportHooks";
import Paginator from "@/components/reusable/paginator/Paginator";
import ViewTicket from "./ViewTicket";
import { Loader } from "@mantine/core";
import { toLeadingCase } from "@/functions/stringFunctions";
import { iDateRange } from "@/functions/dateFunctions";

const Support = () => {
  const currentDate = new Date().toISOString().split("T")[0];
  const [openedNewTicket, shouldOpenNewTicket] = useState(false);
  const [openedCloseTicket, shouldCloseTicket] = useState(false);
  const [dateRange, setDateRange] = useState<iDateRange>({
    start: currentDate,
    end: currentDate,
  });
  const [expanded, setExpanded] = useState<boolean>(false);
  const { loading, data: issues, getDisputes } = useGetAllDisputes();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(issues.count / 50);

  const [currentTicket, setCurrentTicket] = useState<iDispute | null>(null);

  function handlePageChange(page: number) {
    setCurrentPage(page);
    getDisputes(page, dateRange.start, dateRange.end);
  }

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
              <Filters
                onDatesChanged={(start, end) => {
                  getDisputes(currentPage, start, end);
                  setDateRange({ start, end });
                }}
              />
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
                  {!loading &&
                    issues.data
                      .slice(0, expanded ? issues.data.length : 10)
                      .map((issue, i) => {
                        const isTooLong = issue.description.length > 30;
                        return (
                          <tr
                            key={i}
                            className="odd:bg-white even:bg-slate-50 text-[#3A3A3A] text-[0.75rem] leading-[1.125rem] justify-around"
                          >
                            <td className="p-4">{issue.ticketNumber}</td>
                            <td className="p-4">{issue.username}</td>
                            <td className="p-4">
                              {isTooLong
                                ? issue.description.substring(0, 30)
                                : issue.description}
                              {isTooLong && "..."}
                            </td>
                            <td className="p-4">
                              {toLeadingCase(
                                issue.category.replaceAll("_", " ")
                              )}
                            </td>
                            <td className="p-4">
                              {toLeadingCase(
                                issue.priority.replaceAll("_", " ")
                              )}
                            </td>
                            <td className="p-4">
                              <StatusContainer
                                status={
                                  issue.status === "IN_PROGRESS"
                                    ? STATE_PENDING
                                    : issue.status === "RESOLVED"
                                    ? STATE_SUCCESS
                                    : issue.status === "CLOSED"
                                    ? STATE_NULL
                                    : STATE_ERROR
                                }
                                text={toLeadingCase(
                                  issue.status.replaceAll("_", " ")
                                )}
                              />
                            </td>

                            <td className="p-4 flex gap-1 w-fit items-center">
                              <div
                                onClick={() => setCurrentTicket(issue)}
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
              {!loading && issues.data.length === 0 && (
                <div className="w-full h-60 grid place-content-center text-[#3A3A3A] font-medium text-[1rem] leading-[1.125rem]">
                  No tickets available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {currentTicket !== null && (
        <ViewTicket
          ticket={currentTicket}
          onClose={() => setCurrentTicket(null)}
          onChange={() => {
            setCurrentTicket(null);
            window.location.reload();
          }}
        />
      )}
      {openedNewTicket && (
        <CreateNewTicket
          close={() => shouldOpenNewTicket(false)}
          onCreate={() => {
            shouldOpenNewTicket(false);
            window.location.reload();
          }}
        />
      )}
      {openedCloseTicket && (
        <CloseTicket close={() => shouldCloseTicket(false)} />
      )}
    </>
  );
};

export default Support;
