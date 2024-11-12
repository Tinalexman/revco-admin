import React, { useState } from "react";
import Filters from "@/components/dashboard/common/Filters";
import { Loader } from "@mantine/core";
import { IoIosArrowDown } from "react-icons/io";
import {
  convertDateWithDashesAndTime,
  getDateRange,
  iDateRange,
} from "@/functions/dateFunctions";
import { IoEye } from "react-icons/io5";
import StatusContainer, {
  STATE_SUCCESS,
  STATE_NULL,
  STATE_PENDING,
} from "@/components/reusable/StatusContainer";
import {
  iOrganizationResponse,
  useGetOrganizations,
} from "@/hooks/organizationHooks";
import Paginator from "@/components/reusable/paginator/Paginator";
import Link from "next/link";
import { capitalize } from "@/functions/stringFunctions";
import { useGetObjections } from "@/hooks/objectionHooks";

const ObjectionList = () => {
  const currentDate = getDateRange("Today");
  const [dateRange, setDateRange] = useState<iDateRange>({
    start: currentDate[0],
    end: currentDate[0],
  });

  const [expanded, setExpanded] = useState<boolean>(false);
  const { loading, getObjections, data } = useGetObjections();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(data.count / 50);

  function handlePageChange(page: number) {
    setCurrentPage(page);
    getObjections(dateRange.start, dateRange.end, page);
  }

  return (
    <>
      <div className="w-full bg-white p-5 flex flex-col gap-3 rounded-xl">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-black text-med-button">Assesments Per State</h2>
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
              getObjections(start, end, currentPage);
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
        <div className="relative overflow-x-auto scrollbar-thin scrollbar-webkit">
          <table className="w-[125%]">
            <thead className="w-full bg-[#F3F7FC] h-14">
              <tr className="text-[#3A3A3A] font-medium text-[0.75rem] leading-[1.125rem]">
                <th scope="col" className="text-left px-4">
                  S/N
                </th>
                <th scope="col" className="text-left px-4">
                  MDA ID
                </th>
                <th scope="col" className="text-left px-4">
                  MDA
                </th>
                <th scope="col" className="text-left px-4">
                  Office
                </th>
                <th scope="col" className="text-left px-4">
                  Revenue Head
                </th>
                <th scope="col" className="text-left px-4">
                  Service Code
                </th>
                <th scope="col" className="text-left px-4">
                  Tax Payer&apos;s Name
                </th>
                <th scope="col" className="text-left px-4">
                  Amount Paid
                </th>
                <th scope="col" className="text-left px-4">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                data.data
                  .slice(0, expanded ? data.data.length : 10)
                  .map((org, i) => {
                    return (
                      <tr
                        key={i}
                        className="odd:bg-white even:bg-slate-50 text-[#3A3A3A] text-[0.75rem] leading-[1.125rem] justify-around"
                      >
                        <td className="p-4">{i + 1}</td>
                        <td className="p-4">{org.id}</td>
                        <td className="p-4">{org.mdaName}</td>
                        <td className="p-4">{org.mdaOffice}</td>
                        <td className="p-4">{org.assesedService}</td>
                        <td className="p-4">{org.assesedServiceCode}</td>
                        <td className="p-4">
                          {org.payerFirstName} {org.payerLastName}
                        </td>
                        <td className="p-4">
                          ₦
                          {Number.parseFloat(
                            org.taxAmount.toString()
                          ).toLocaleString("en-US")}
                        </td>
                        <td className="p-4">
                          <StatusContainer
                            text={org.isObjected ? "Objected" : "Settled"}
                            status={
                              org.isObjected ? STATE_PENDING : STATE_SUCCESS
                            }
                          />
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
              No objections available
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ObjectionList;
