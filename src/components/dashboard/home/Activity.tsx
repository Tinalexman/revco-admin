import React, { FC, useState } from "react";
import Filters from "../common/Filters";
import { Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IoIosArrowDown } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import ViewTransaction from "../common/ViewTransaction";
import {
  useDownloadRecentActivity,
  useGetRecentMDAActivity,
  useSearchRecentActivity,
} from "@/hooks/dashboardHooks";
import { Loader } from "@mantine/core";
import Paginator from "@/components/reusable/paginator/Paginator";
import {
  convertDateWithDashesAndTime,
  getDateRange,
  iDateRange,
} from "@/functions/dateFunctions";
import StatusContainer, {
  STATE_PENDING,
  STATE_SUCCESS,
} from "@/components/reusable/StatusContainer";

const Activity: FC<{ mode?: string | null; showModePicker?: boolean }> = ({
  mode,
  showModePicker,
}) => {
  const overviewModes: string[] = ["All", "Informal Sector", "Formal Sector"];
  const [activeMode, setActiveMode] = useState<string>(overviewModes[0]);
  const [hasSearch, setHasSearch] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);
  const {
    loading,
    data: transactions,
    getActivity,
  } = useGetRecentMDAActivity(mode);

  const {
    loading: loadingDownload,
    downloadReport,
    success,
  } = useDownloadRecentActivity(mode);

  const currentDate = getDateRange("Today");
  const [dateRange, setDateRange] = useState<iDateRange>({
    start: currentDate[0],
    end: currentDate[0],
  });

  const totalPages = Math.ceil(transactions.count / 50);
  const [currentPage, setCurrentPage] = useState<number>(1);

  function handlePageChange(page: number) {
    setCurrentPage(page);
    getActivity(dateRange.start, dateRange.end, `${page}`);
  }

  const getList = () => {
    if (!loading && transactions.data.length > 0) {
      return transactions.data.slice(
        0,
        expanded ? transactions.data.length : 10
      );
    }

    return [];
  };

  return (
    <>
      <div className="w-full bg-white p-5 flex flex-col gap-3 rounded-xl">
        {showModePicker && showModePicker && (
          <div className="w-fit bg-[#F1F2F3] rounded-xl py-1 px-1 flex items-center">
            {overviewModes.map((md, i) => {
              return (
                <div
                  onClick={() => {
                    setActiveMode(md);
                    getActivity(
                      dateRange.start,
                      dateRange.end,
                      `${currentPage}`
                    );
                  }}
                  key={i}
                  className={`${
                    md === activeMode
                      ? "text-primary bg-white"
                      : "text-[#A9A9A9]"
                  } cursor-pointer py-1 px-2 ${
                    i === 0
                      ? "rounded-l-lg"
                      : i === overviewModes.length - 1
                      ? "rounded-r-lg"
                      : ""
                  } font-semibold text-reg-caption`}
                >
                  {md}
                </div>
              );
            })}
          </div>
        )}

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
            onDatesChanged={(start: string, end: string) => {
              setDateRange({
                start,
                end,
              });
              getActivity(start, end, `${currentPage}`);
            }}
            onSearch={(val) => {
              setHasSearch(val.length > 0);
            }}
          />
          <div className="w-[35%]">
            <Paginator
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={(page) => handlePageChange(page)}
            />
          </div>
          <button
            onClick={() => {
              downloadReport(currentPage, dateRange.start, dateRange.end);
            }}
            className="bg-[#F0E6FC] rounded text-primary flex justify-center gap-3 items-center px-3 h-10"
          >
            {loadingDownload ? (
              <Loader size={24} color="primary.6" />
            ) : (
              <>
                <p className="text-[0.815rem] leading-[0.975rem]">Export</p>
                <IoIosArrowDown />
              </>
            )}
          </button>
        </div>
        <div className="relative overflow-x-auto scrollbar-thin scrollbar-webkit w-full">
          <table className="w-[100%] ">
            <thead className=" bg-[#F3F7FC] h-14">
              <tr className="text-[#3A3A3A] font-medium text-[0.75rem] leading-[1.125rem] text-left">
                <th scope="col" className="px-4">
                  S/N
                </th>
                <th scope="col" className="px-4">
                  MDA
                </th>
                <th scope="col" className="px-4">
                  MDA Code
                </th>
                <th scope="col" className="px-4">
                  Abbreviation
                </th>
                <th scope="col" className="px-4">
                  Revenue Count
                </th>
                <th scope="col" className="px-4">
                  Revenue Generated
                </th>
                <th scope="col" className="px-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {getList().map((txn, i) => (
                <tr
                  key={i}
                  className="odd:bg-white even:bg-slate-50 text-[#3A3A3A] text-[0.75rem] leading-[1.125rem] justify-around max-h-[15rem]"
                >
                  <td className="p-4">{i + 1}</td>
                  <td className="p-4">{txn.mda}</td>
                  <td className="p-4">{txn.mdaCode}</td>
                  <td className="p-4">{txn.abbreviation}</td>
                  <td className="p-4">{txn.revenueCount}</td>
                  <td className="p-4">
                    ₦
                    {Number.parseFloat(txn.revenueGenerated).toLocaleString(
                      "en-US"
                    )}
                  </td>
                  <td className="flex gap-1 p-4">
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
          {!loading && transactions.data.length === 0 && (
            <div className="w-full h-60 grid place-content-center text-[#3A3A3A] font-medium text-[1rem] leading-[1.125rem]">
              No recent MDA activity
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Activity;
