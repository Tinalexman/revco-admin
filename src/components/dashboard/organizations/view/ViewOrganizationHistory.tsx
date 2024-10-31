import React, { FC, useState } from "react";
import Filters from "../Filters";
import { Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IoIosArrowDown } from "react-icons/io";
import {
  convertDateWithDashesAndTime,
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
  useGetOrganizationTransactionHistory,
} from "@/hooks/organizationHooks";
import Paginator from "@/components/reusable/paginator/Paginator";
import Link from "next/link";

const ViewOrganizationHistory: FC<{ name: string; id: string | number }> = ({
  id,
  name,
}) => {
  const currentDate = new Date().toISOString().split("T")[0];
  const { loading, getHistory, data } =
    useGetOrganizationTransactionHistory(id);
  const [dateRange, setDateRange] = useState<iDateRange>({
    start: currentDate,
    end: currentDate,
  });
  const [expanded, setExpanded] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(data.totalItems / 50);

  function handlePageChange(page: number) {
    setCurrentPage(page);
    getHistory(dateRange.start, dateRange.end, `${page}`);
  }

  return (
    <>
      <div className="w-full bg-white p-5 flex flex-col gap-3 rounded-xl">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-black text-med-button">Transaction History</h2>
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
              getHistory(start, end, `${currentPage}`);
            }}
            showDatePicker={true}
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
          <table className="w-[100%]">
            <thead className="w-full bg-[#F3F7FC] h-14">
              <tr className="text-[#3A3A3A] font-medium text-[0.75rem] leading-[1.125rem]">
                <th scope="col" className="text-left px-4">
                  S/N
                </th>
                <th scope="col" className="text-left px-4">
                  Invoice Number
                </th>
                <th scope="col" className="text-left px-4">
                  Amount Paid
                </th>
                <th scope="col" className="text-left px-4">
                  Type
                </th>
                <th scope="col" className="text-left px-4">
                  Transaction Date
                </th>
                <th scope="col" className="text-left px-4">
                  Status
                </th>
                <th scope="col" className="text-left px-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                data.data
                  .slice(0, expanded ? data.data.length : 10)
                  .map((inv, i) => (
                    <tr
                      key={i}
                      className="odd:bg-white even:bg-slate-50 text-[#3A3A3A] text-[0.75rem] leading-[1.125rem] justify-around"
                    >
                      <td className="p-4">{i + 1}</td>
                      <td className="p-4">{inv.number}</td>
                      <td className="p-4">
                        ₦
                        {Number.parseFloat(inv.totalAmount).toLocaleString(
                          "en-US"
                        )}
                      </td>
                      <td className="p-4">{inv.type}</td>
                      <td className="p-4">
                        {convertDateWithDashesAndTime(inv.createdDate)}
                      </td>
                      <td className="p-4">
                        <StatusContainer
                          text={inv.paid ? "Paid" : "Pending"}
                          status={inv.paid ? STATE_SUCCESS : STATE_PENDING}
                        />
                      </td>
                      <td className="flex gap-1 p-4">
                        <Link
                          href={`/dashboard/payments/invoice-management/receipt?status=${
                            inv.paid ? "paid" : "pending"
                          }&invoice=${inv.number}`}
                          className="cursor-pointer bg-[#FCEAE8] rounded size-6 grid place-content-center text-[#292D32]"
                        >
                          <IoEye size={16} />
                        </Link>
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
          {!loading && data.data.length === 0 && (
            <div className="w-full h-60 grid place-content-center text-[#3A3A3A] font-medium text-[1rem] leading-[1.125rem]">
              No transactions available
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewOrganizationHistory;
