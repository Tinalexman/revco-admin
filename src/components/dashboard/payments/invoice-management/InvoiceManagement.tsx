"use client";

import React, { useState } from "react";
import { IoIosArrowDown, IoMdAdd } from "react-icons/io";
import { FaReceipt } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";
import Filters from "../../common/Filters";
import { Drawer, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import StatusContainer, {
  STATE_SUCCESS,
  STATE_NULL,
} from "@/components/reusable/StatusContainer";

import { RiEdit2Fill } from "react-icons/ri";
import { TiCancel } from "react-icons/ti";
import { convertDateWithDashesAndTime } from "@/functions/dateFunctions";
import GenerateInvoice from "./GenerateInvoice";
import { useGetRecentInvoices } from "@/hooks/paymentHooks";
import Paginator from "@/components/reusable/paginator/Paginator";


interface iDateData {
  start: string;
  end: string;
}

const InvoiceManagement = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [
    openedGenerateInvoice,
    { open: openGenerateInvoice, close: closeGenerateInvoice },
  ] = useDisclosure(false);

  const currentDate = new Date().toISOString().split("T")[0];
  const { loading, data, getInvoices } = useGetRecentInvoices();
  const totalPages = 5; //Math.ceil(data.count / 10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dateData, setDateData] = useState<iDateData>({ start: currentDate, end: currentDate });

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
            <button
              onClick={openGenerateInvoice}
              className="bg-primary text-white rounded-lg h-9 gap-2 px-3 text-[0.825rem] flex items-center leading-[0.98rem]"
            >
              Generate New Invoice <FaReceipt />
            </button>
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
              <Filters onDatesChanged={(start, end) => {
                setDateData({ start, end });
                getInvoices(start, end, `${currentPage}`)
              }} showDatePicker={true} />
              <div className="w-[35%]">
                <Paginator
                  totalPages={totalPages}
                  currentPage={currentPage}
                  handlePageChange={page => handlePageChange(page)}
                />
              </div>
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
                      Invoice Number
                    </th>
                    <th scope="col" className="text-start px-4">
                      Payer Name
                    </th>
                    <th scope="col" className="text-start px-4">
                      Service Type
                    </th>
                    <th scope="col" className="text-start px-4">
                      Amount Paid
                    </th>
                    <th scope="col" className="text-start px-4">
                      Payment Date
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
                  {!loading && data.data
                    .slice(0, expanded ? data.data.length : 5)
                    .map((inv, i) => (
                      <tr
                        key={i}
                        className="odd:bg-white even:bg-slate-50 text-[#3A3A3A] text-[0.75rem] leading-[1.125rem] justify-around"
                      >
                        <td className="p-4">{inv.transactionDetails.invoiceNumber}</td>
                        <td className="p-4">{inv.userDetails.firstname} {inv.userDetails.lastname}</td>
                        <td className="p-4">{inv.organizationDetails.serviceDescription}</td>
                        <td className="p-4">
                          {
                            inv.payment.length === 0 ? "N/A" : (`₦${inv.payment[0].totalAmountPaid.toLocaleString("en-US")}`)
                          }
                        </td>
                        <td className="p-4">
                          {
                            inv.payment.length === 0 ? "N/A" : (convertDateWithDashesAndTime(inv.payment[0].transactionDate))
                          }
                        </td>
                        <td className="p-4">
                          <StatusContainer
                            status={inv.payment.length !== 0 ? STATE_SUCCESS : STATE_NULL}
                            text={inv.payment.length === 0 ? "Unpaid" : "Paid"}
                          />
                        </td>

                        <td className="p-4">
                          <div className="cursor-pointer bg-[#FCEAE8] rounded size-6 grid place-content-center text-[#292D32]">
                            <IoEye size={16} />
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              {
                loading && <div className="w-full h-60 grid place-content-center">
                  <Loader color="primary.6" />
                </div>
              }
              {
                !loading && data.data.length === 0 && <div className="w-full h-60 grid place-content-center text-[#3A3A3A] font-medium text-[1rem] leading-[1.125rem]">
                  No recent invoices
                </div>
              }
            </div>
          </div>
        </div>
      </div>
      {/* {openedAddChannel && (
        <Drawer.Root
          opened={openedAddChannel}
          onClose={closeAddChannel}
          position={"right"}
          padding={0}
          radius={12}
          closeOnClickOutside={false}
          closeOnEscape={false}
        >
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Body>
              <AddChannel onClose={closeAddChannel} />
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Root>
      )}
      {currentChannel !== null && openedEditChannel && (
        <Drawer.Root
          opened={openedEditChannel}
          onClose={closeEditDrawer}
          position={"right"}
          padding={0}
          radius={12}
          closeOnClickOutside={false}
          closeOnEscape={false}
        >
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Body>
              <EditChannel
                channel={{
                  apiKey: "38383232332323e23rwn",
                  channelName: currentChannel.name,
                  clientID: "Paysure Ltd",
                  email: "support@revco",
                  phone: "+234 5585 33434 ",
                  type: "Online",
                  status: true,
                }}
                onClose={closeEditDrawer}
              />
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Root>
      )} */}
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
