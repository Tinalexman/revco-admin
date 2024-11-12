import React, { FC, useState } from "react";
import Filters from "./Filters";
import { Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IoIosArrowDown } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import ViewTransaction from "./ViewTransaction";
import { useGetRecentActivity } from "@/hooks/dashboardHooks";
import { Loader } from "@mantine/core";
import Paginator from "@/components/reusable/paginator/Paginator";
import { getDateRange, iDateRange } from "@/functions/dateFunctions";
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

  const [expanded, setExpanded] = useState<boolean>(false);
  const {
    loading,
    data: transactions,
    getActivity,
  } = useGetRecentActivity(mode);
  const currentDate = getDateRange("Today");
  const [dateRange, setDateRange] = useState<iDateRange>({
    start: currentDate[0],
    end: currentDate[0],
  });
  const [opened, { open, close }] = useDisclosure(false);
  const [currentTransaction, setCurrentTransaction] = useState<string | null>(
    null
  );

  const openDrawer = (transaction: string) => {
    setCurrentTransaction(transaction);
    open();
  };

  const closeDrawer = () => {
    setCurrentTransaction(null);
    close();
  };

  const totalPages = Math.ceil(transactions.count / 50);
  const [currentPage, setCurrentPage] = useState<number>(1);

  function handlePageChange(page: number) {
    setCurrentPage(page);
    getActivity(dateRange.start, dateRange.end, `${page}`);
  }

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
          <table className="w-[150%] ">
            <thead className=" bg-[#F3F7FC] h-14">
              <tr className="text-[#3A3A3A] font-medium text-[0.75rem] leading-[1.125rem] text-left">
                <th scope="col" className="px-4">
                  S/N
                </th>
                <th scope="col" className="px-4">
                  Transaction ID
                </th>
                <th scope="col" className="px-4">
                  Payer Name
                </th>
                <th scope="col" className="px-4">
                  MDA
                </th>
                <th scope="col" className="px-4">
                  Service Type
                </th>
                <th scope="col" className="px-4">
                  Invoice Amount
                </th>
                <th scope="col" className="px-4">
                  Payment Date
                </th>
                <th scope="col" className="px-4">
                  Status
                </th>
                <th scope="col" className="px-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                transactions.data.length > 0 &&
                transactions.data
                  .slice(0, expanded ? transactions.data.length : 10)
                  .map((txn, i) => (
                    <tr
                      key={i}
                      className="odd:bg-white even:bg-slate-50 text-[#3A3A3A] text-[0.75rem] leading-[1.125rem] justify-around max-h-[15rem]"
                    >
                      <td className="p-4">{i + 1}</td>
                      <td className="p-4">{txn.txid}</td>
                      <td className="p-4">{txn.username}</td>
                      <td className="p-4">{txn.mda}</td>
                      <td className="p-4">{txn.type}</td>
                      <td className="p-4">
                        ₦
                        {Number.parseFloat(
                          txn.invoiceAmount.toString()
                        ).toLocaleString("en-US")}
                      </td>
                      <td className="p-4">{txn.paymentDate}</td>
                      <td className="p-4">
                        <StatusContainer
                          status={txn.paid ? STATE_SUCCESS : STATE_PENDING}
                          text={txn.paid ? "Paid" : "Pending"}
                        />
                      </td>
                      <td className="flex gap-1 p-4">
                        <div
                          onClick={() => openDrawer(txn.txid)}
                          className="cursor-pointer bg-[#FCEAE8] rounded size-6 grid place-content-center text-[#292D32]"
                        >
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
              No recent activity
            </div>
          )}
        </div>
      </div>
      {currentTransaction !== null && (
        <Drawer.Root
          opened={opened}
          onClose={closeDrawer}
          position={"right"}
          padding={0}
          radius={12}
          closeOnClickOutside={false}
          closeOnEscape={false}
        >
          <Drawer.Overlay />
          <Drawer.Content>
            <Drawer.Body>
              <ViewTransaction
                txid={currentTransaction}
                onClose={closeDrawer}
                shouldRefund={true}
                shouldPrint={true}
              />
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Root>
      )}
    </>
  );
};

export default Activity;
