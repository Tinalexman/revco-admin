import Paginator from "@/components/reusable/paginator/Paginator";
import { iDateRange } from "@/functions/dateFunctions";
import {
  useGetObjections,
  useGetObjectionSummary,
} from "@/hooks/objectionHooks";
import { Loader } from "@mantine/core";
import React, { useState, FC, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Filters from "../../common/Filters";

import { HiDocumentText } from "react-icons/hi";
import { GiTakeMyMoney } from "react-icons/gi";
import { useInformalSector } from "@/stores/informalSector";

interface iObjectionHeader {
  icon: any;
  title: string;
  value: number;
}

const Assessments = () => {
  const range = useInformalSector((state) => state.range);
  const currentDate = new Date().toISOString().split("T")[0];
  const [dateRange, setDateRange] = useState<iDateRange>({
    start: currentDate,
    end: currentDate,
  });
  const { loading, data, getObjectionSummary } = useGetObjectionSummary(false);
  const objectionHeaders: iObjectionHeader[] = [
    {
      icon: <HiDocumentText size={20} className="text-primary" />,
      title: "Total Count Of Assessments",
      value: data.count,
    },
    {
      icon: <GiTakeMyMoney size={20} className="text-primary" />,
      title: "Total Amount Of Assessments",
      value: data.data["total-amount-of-assessment"],
    },
  ];

  const {
    loading: loadingList,
    data: objections,
    getObjections,
  } = useGetObjections();
  const [expanded, setExpanded] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(objections.count / 50);

  function handlePageChange(page: number) {
    setCurrentPage(page);
    getObjections(dateRange.start, dateRange.end, `${page}`);
  }

  useEffect(() => {
    getObjectionSummary(range.start, range.end);
  }, [range]);

  return (
    <div className="w-full flex flex-col gap-2.5">
      <div className="w-full grid grid-cols-2 gap-2.5">
        {objectionHeaders.map((obj, i) => {
          return (
            <div
              key={i}
              className={`relative overflow-hidden bg-white w-full rounded-xl px-6 pt-3 pb-4 gap-6 h-44 flex flex-col justify-between items-start`}
            >
              <div className="bg-primary-accent rounded-full p-2">
                {obj.icon}
              </div>

              <div className="flex flex-col items-starts">
                <p className="text-[0.7rem] font-medium leading-[1.4rem] text-[#9EA4AA]">
                  {obj.title}
                </p>
                {loading ? (
                  <Loader color="primary.6" size={24} />
                ) : (
                  <h2 className="text-[#333333] font-semibold text-[1.5rem] leading-[1.8rem]">
                    {i === 1
                      ? `₦${obj.value.toLocaleString("en-US")}`
                      : obj.value}
                  </h2>
                )}
              </div>
            </div>
          );
        })}
      </div>
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
            onDatesChanged={(start, end) => {
              setDateRange({ start, end });
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
          <table className="w-[150%]">
            <thead className="w-full bg-[#F3F7FC] h-14">
              <tr className="text-[#3A3A3A] font-medium text-[0.75rem] leading-[1.125rem]">
                <th scope="col" className="text-left px-4">
                  S/N
                </th>
                <th scope="col" className="text-left px-4">
                  MDA
                </th>
                <th scope="col" className="text-left px-4">
                  Office
                </th>
                <th scope="col" className="text-left px-4">
                  Service (Revenue Head)
                </th>
                <th scope="col" className="text-left px-4">
                  Service Code
                </th>
                <th scope="col" className="text-left px-4">
                  Tax Payer's Name
                </th>
                <th scope="col" className="text-left px-4">
                  Amount Paid
                </th>
              </tr>
            </thead>
            <tbody>
              {!loadingList &&
                objections.data
                  .slice(0, expanded ? objections.data.length : 10)
                  .map((org, i) => {
                    return (
                      <tr
                        key={i}
                        className="odd:bg-white even:bg-slate-50 text-[#3A3A3A] text-[0.75rem] leading-[1.125rem] justify-around"
                      >
                        <td className="p-4">{i + 1}</td>
                        <td className="p-4">{org.mdaName}</td>
                        <td className="p-4">{org.mdaOffice}</td>
                        <td className="p-4">{org.assesedService}</td>
                        <td className="p-4">{org.assesedServiceCode}</td>
                        <td className="p-4">
                          {org.payerFirstName} {org.payerLastName}
                        </td>
                        <td className="p-4">
                          ₦{org.taxAmount.toLocaleString("en-US")}
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
          {loadingList && (
            <div className="w-full h-60 grid place-content-center">
              <Loader color="primary.6" />
            </div>
          )}
          {!loadingList && objections.data.length === 0 && (
            <div className="w-full h-60 grid place-content-center text-[#3A3A3A] font-medium text-[1rem] leading-[1.125rem]">
              No objections available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assessments;
