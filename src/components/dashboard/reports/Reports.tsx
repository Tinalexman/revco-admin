"use client";

import React, { useState } from "react";

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

import { HiDownload } from "react-icons/hi";
import { RiDeleteBinFill } from "react-icons/ri";
import CreateReport from "./CreateReport";
import DeleteReport from "./DeleteReport";
import { useDownloadReport, useGetAllReports } from "@/hooks/reportHooks";
import { toLeadingCase } from "@/functions/stringFunctions";
import { Loader } from "@mantine/core";

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
  const [selectedReport, setSelectedReport] = useState<number>(-1);
  const { data: reports, loading } = useGetAllReports();
  const {
    loading: loadingDownload,
    success,
    downloadReport,
  } = useDownloadReport();

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
            <Filters showDatePicker={false} />
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
                      <td className="p-4">{report.reportName}</td>
                      <td className="p-4">
                        {toLeadingCase(report.reportType.replaceAll("_", " "))}
                      </td>
                      <td className="p-4">
                        {report.from} to {report.to}
                      </td>

                      <td className="p-4 flex gap-1 w-fit items-center">
                        <div
                          onClick={() => downloadReport(report.id)}
                          className="cursor-pointer bg-[#E4ECF7] rounded size-6 grid place-content-center text-[#292D32]"
                        >
                          <HiDownload size={16} />
                        </div>
                        <div
                          onClick={() => {
                            setSelectedReport(report.id);
                            shouldDeleteReport(true);
                          }}
                          className="cursor-pointer bg-[#FDC6C6] rounded size-6 grid place-content-center text-[#292D32]"
                        >
                          <RiDeleteBinFill size={16} />
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
              {!loading && reports.length === 0 && (
                <div className="w-full h-60 grid place-content-center text-[#3A3A3A] font-medium text-[1rem] leading-[1.125rem]">
                  No reports available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {openedNewReport && (
        <CreateReport
          close={() => shouldOpenNewReport(false)}
          create={() => {
            shouldOpenNewReport(false);
            window.location.reload();
          }}
        />
      )}
      {openedDeleteReport && selectedReport !== -1 && (
        <DeleteReport
          close={() => shouldDeleteReport(false)}
          onDelete={() => {
            shouldDeleteReport(false);
            window.location.reload();
          }}
          id={selectedReport}
        />
      )}
    </>
  );
};

export default Reports;
