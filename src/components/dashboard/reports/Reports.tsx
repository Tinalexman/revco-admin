"use client";

import React, { useState } from "react";

import { DocumentText } from "iconsax-react";
import { IoEye } from "react-icons/io5";
import Filters from "@/components/dashboard/common/activity/Filters";
import StatusContainer, {
  STATE_ERROR,
  STATE_NULL,
  STATE_PENDING,
  STATE_SUCCESS,
} from "@/components/reusable/StatusContainer";
import { IoIosArrowDown } from "react-icons/io";

import { HiDownload } from "react-icons/hi";
import { RiDeleteBinFill } from "react-icons/ri";
import CreateReport from "./CreateReport";
import DeleteReport from "./DeleteReport";

interface iReport {
  name: string;
  type: string;
  issue: string;
  startDate: string;
  endDate: string;
  statusText: string;
  status: string;
}

const Reports = () => {
  const [openedNewReport, shouldOpenNewReport] = useState(false);
  const [openedDeleteReport, shouldDeleteReport] = useState(false);
  const [expanded, setExpanded] = useState<boolean>(false);

  const [reports, setReports] = useState<iReport[]>(
    Array(3).fill({
      name: "Monthly Transaction Summanry",
      type: "Transaction Report",
      startDate: "2024-08-12",
      endDate: "2024-09-11",
      status: STATE_SUCCESS,
      statusText: "Active",
    })
  );

  return (
    <>
      <div className="w-full flex flex-col gap-2.5">
        <div className="px-8 bg-white w-full h-[4.5rem]">
          <div className="w-full flex justify-between items-center border-t border-gray-4 py-2">
            <div className="flex flex-col">
              <h2 className="text-monokai font-semibold text-dash-intro-header">
                Report Management
              </h2>
              <h3 className="text-primary text-reg-caption">
                Manage all transactions and data on the Revco service
              </h3>
            </div>
            <button
              onClick={() => shouldOpenNewReport(true)}
              className="bg-primary text-white rounded-lg h-9 gap-2 px-3 text-[0.825rem] flex items-center leading-[0.98rem]"
            >
              <DocumentText size="22" color="#FFFFFF" />
              <h3>Generate New Report</h3>
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
                      Report Name
                    </th>
                    <th scope="col" className="text-start px-4">
                      Type
                    </th>
                    <th scope="col" className="text-start px-4">
                      Date Range
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
                  {reports.map((report, i) => (
                    <tr
                      key={i}
                      className="odd:bg-white even:bg-slate-50 text-[#3A3A3A] text-[0.75rem] leading-[1.125rem] justify-around"
                    >
                      <td className="p-4">{report.name}</td>
                      <td className="p-4">{report.type}</td>
                      <td className="p-4">
                        {report.startDate} to {report.endDate}
                      </td>
                      <td className="p-4">
                        <StatusContainer
                          status={report.status}
                          text={report.statusText}
                        />
                      </td>

                      <td className="p-4 flex gap-1 w-fit items-center">
                        <div className="cursor-pointer bg-[#FCEAE8] rounded size-6 grid place-content-center text-[#292D32]">
                          <IoEye size={16} />
                        </div>
                        <div className="cursor-pointer bg-[#E4ECF7] rounded size-6 grid place-content-center text-[#292D32]">
                          <HiDownload size={16} />
                        </div>
                        <div
                          onClick={() => shouldDeleteReport(true)}
                          className="cursor-pointer bg-[#FDC6C6] rounded size-6 grid place-content-center text-[#292D32]"
                        >
                          <RiDeleteBinFill size={16} />
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
      {openedNewReport && (
        <CreateReport close={() => shouldOpenNewReport(false)} />
      )}
      {openedDeleteReport && (
        <DeleteReport close={() => shouldDeleteReport(false)} />
      )}
    </>
  );
};

export default Reports;
