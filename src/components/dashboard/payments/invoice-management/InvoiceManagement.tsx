"use client";

import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaReceipt } from "react-icons/fa6";
import { IoEye, IoReceiptSharp } from "react-icons/io5";
import Filters from "../../common/Filters";
import { Drawer, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import StatusContainer, {
  STATE_SUCCESS,
  STATE_NULL,
  STATE_PENDING,
} from "@/components/reusable/StatusContainer";

import {
  allFilters,
  convertDateWithDashesAndTime,
  getDateRange,
  iDateRange,
} from "@/functions/dateFunctions";
import GenerateInvoice from "./GenerateInvoice";
import { useGetRecentInvoices } from "@/hooks/paymentHooks";
import Paginator from "@/components/reusable/paginator/Paginator";
import Link from "next/link";
import { useGetStatisticsSummary } from "@/hooks/dashboardHooks";
import Dropdown from "@/components/reusable/Dropdown";

interface iRevenueItem {
  value: number;
  title: string;
  subtitle: number;
  icon: any;
}

const InvoiceManagement = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [
    openedGenerateInvoice,
    { open: openGenerateInvoice, close: closeGenerateInvoice },
  ] = useDisclosure(false);

  const {
    loading: loadingSummary,
    getStatisticsSummary,
    data: statsSummary,
  } = useGetStatisticsSummary(true);

  const [filter, setFilter] = useState<string>("Today");

  const currentDate = getDateRange("Today");
  const { loading, data, getInvoices } = useGetRecentInvoices();
  const totalPages = Math.ceil(data.count / 50);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dateData, setDateData] = useState<iDateRange>({
    start: currentDate[0],
    end: currentDate[0],
  });

  const revenueItems: iRevenueItem[] = [
    {
      title: "Total Invoices Generated",
      value: statsSummary.totalInvoiceCount,
      subtitle: 3000,
      icon: <IoReceiptSharp size={20} className="text-primary" />,
    },
    {
      title: "Total Paid Invoices",
      value: statsSummary.totalPaidInvoiceCount,
      subtitle: 3000,
      icon: <IoReceiptSharp size={20} className="text-primary" />,
    },
    {
      title: "Total Unpaid Invoices",
      value: statsSummary.unpaidCount,
      subtitle: 3000,
      icon: <IoReceiptSharp size={20} className="text-primary" />,
    },
  ];

  function handlePageChange(page: number) {
    setCurrentPage(page);
    getInvoices(dateData.start, dateData.end, `${page}`);
  }

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
            <div className="w-fit gap-3 items-center flex">
              <div className="w-[110px]">
                <Dropdown
                  menus={allFilters.map((v, i) => ({
                    name: v,
                    onClick: () => {
                      setFilter(v);
                      const dateRange = getDateRange(v);
                      getStatisticsSummary(dateRange[0], dateRange[1]);
                    },
                  }))}
                  value={filter}
                  hint={"Select"}
                />
              </div>
              <button
                onClick={openGenerateInvoice}
                className="bg-primary text-white rounded-lg h-9 gap-2 px-3 text-[0.825rem] flex items-center leading-[0.98rem]"
              >
                Generate New Invoice <FaReceipt />
              </button>
            </div>
          </div>
          <div className={`w-full grid grid-cols-3 gap-2.5`}>
            {revenueItems.map((it, i) => (
              <div
                className="bg-white w-full rounded-xl px-6 py-3 gap-6 h-44 flex flex-col justify-end items-start"
                key={i}
              >
                <div className="bg-primary-accent rounded-full p-2">
                  {it.icon}
                </div>
                <div className="w-full flex flex-col">
                  <h3 className="text-med-button text-[#9EA4AA]">{it.title}</h3>
                  {loadingSummary ? (
                    <Loader color="primary.6" size={24} />
                  ) : (
                    <h2 className="text-dash-intro-header font-semibold text-gray-5">
                      {it.value.toLocaleString("en-US")}
                    </h2>
                  )}
                </div>
              </div>
            ))}
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
              <Filters
                onDatesChanged={(start, end) => {
                  setDateData({ start, end });
                  getInvoices(start, end, `${currentPage}`);
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
            <div className="relative overflow-x-auto scrollbar-thin scrollbar-webkit w-full">
              <table className="w-[150%]">
                <thead className="w-full bg-[#F3F7FC] h-14">
                  <tr className="text-[#3A3A3A] font-medium text-[0.75rem] leading-[1.125rem]">
                    <th scope="col" className="text-start px-4">
                      S/N
                    </th>
                    <th scope="col" className="text-start px-4">
                      Invoice Number
                    </th>
                    <th scope="col" className="text-start px-4">
                      Payer Name
                    </th>
                    <th scope="col" className="text-start px-4">
                      MDA
                    </th>
                    <th scope="col" className="text-start px-4">
                      Revenue Head
                    </th>
                    <th scope="col" className="text-start px-4">
                      Invoice Amount
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
                    data.data
                      .slice(0, expanded ? data.data.length : 10)
                      .map((inv, i) => {
                        const status: string = inv.paid ? "paid" : "pending";

                        return (
                          <tr
                            key={i}
                            className="odd:bg-white even:bg-slate-50 text-[#3A3A3A] text-[0.75rem] leading-[1.125rem] justify-around"
                          >
                            <td className="p-4">{i + 1}</td>
                            <td className="p-4">{inv.invoiceNumber}</td>
                            <td className="p-4">{inv.payer}</td>
                            <td className="p-4">{inv.mdaName}</td>
                            <td className="p-4">{inv.mdaService}</td>
                            <td className="p-4">
                              ₦{inv.invoiceAmount.toLocaleString("en-US")}
                            </td>

                            <td className="p-4">
                              <StatusContainer
                                status={
                                  inv.paid ? STATE_SUCCESS : STATE_PENDING
                                }
                                text={inv.paid ? "Paid" : "Pending"}
                              />
                            </td>

                            <td className="p-4">
                              <Link
                                href={`/dashboard/payments/invoice-management/receipt?status=${status}&invoice=${inv.invoiceNumber}`}
                                className="cursor-pointer bg-[#FCEAE8] rounded size-6 grid place-content-center text-[#292D32]"
                              >
                                <IoEye size={16} />
                              </Link>
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
                  No recent invoices
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {openedGenerateInvoice && (
        <Drawer.Root
          opened={openedGenerateInvoice}
          onClose={closeGenerateInvoice}
          position="right"
          padding={0}
          top={0}
          radius={12}
          closeOnClickOutside={false}
          closeOnEscape={false}
        >
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Body>
              <GenerateInvoice onClose={closeGenerateInvoice} />
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Root>
      )}
    </>
  );
};

export default InvoiceManagement;
