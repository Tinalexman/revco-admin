import React, { useState } from "react";
import Filters from "./Filters";
import { Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IoIosArrowDown } from "react-icons/io";
import { convertDateWithDashesAndTime } from "@/functions/dateFunctions";
import { IoEye } from "react-icons/io5";
import { HiReceiptRefund } from "react-icons/hi2";
import ViewTransaction from "./ViewTransaction";
import StatusContainer, {
  STATE_PENDING,
  STATE_SUCCESS,
} from "@/components/reusable/StatusContainer";
import { useGetRecentActivity } from "@/hooks/dashboardHooks";
import { Loader } from "@mantine/core";

export interface iTransaction {
  transactionID: string;
  payerName: string;
  mda: string;
  revenueHead: string;
  amount: number;
  paymentDate: Date;
  status: string;
  serviceCharge: number;
  serviceType: string;
  pin: string;
  payerID: string;
  refNo: string;
  tin: string;
  total: number;
  channel: string;
}

const Activity = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const { loading, getActivity, data: transactions } = useGetRecentActivity();

  const [opened, { open, close }] = useDisclosure(false);
  const [currentTransaction, setCurrentTransaction] =
    useState<iTransaction | null>(null);

  const openDrawer = (transaction: iTransaction) => {
    setCurrentTransaction(transaction);
    open();
  };

  const closeDrawer = () => {
    setCurrentTransaction(null);
    close();
  };

  return (
    <>
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
          <Filters onDatesChanged={(start: string, end: string) => {
            getActivity(start, end)
          }} />
          <button className="bg-[#F0E6FC] rounded text-primary flex gap-3 items-center px-3 h-10">
            <p className="text-[0.815rem] leading-[0.975rem]">Export</p>
            <IoIosArrowDown />
          </button>
        </div>
        <div className="relative overflow-x-auto w-full">
          <table className="w-full">
            <thead className="w-full bg-[#F3F7FC] h-14">
              <tr className="text-[#3A3A3A] font-medium text-[0.75rem] leading-[1.125rem]">
                <th scope="col">Invoice Number</th>
                <th scope="col">Payer Name</th>
                <th scope="col">MDA</th>
                <th scope="col">Service Type</th>
                <th scope="col">Amount Paid</th>
                <th scope="col">Payment Date</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {!loading && transactions.length > 0 && transactions
                .slice(0, expanded ? transactions.length : 5)
                .map((txn, i) => (
                  <tr
                    key={i}
                    className="odd:bg-white even:bg-slate-50 text-[#3A3A3A] text-[0.75rem] leading-[1.125rem] justify-around max-h-[15rem]"
                  >
                    <td className="p-4">
                      {txn.invoiceNo}
                    </td>
                    <td className="p-4">{txn.payer}</td>
                    <td className="p-4">{txn.mda}</td>
                    <td className="p-4">{txn.assesedService}</td>
                    <td className="p-4">
                      ₦{txn.invoiceAmount.toLocaleString("en-US")}
                    </td>
                    <td className="p-4">
                      {/* {convertDateWithDashesAndTime(txn.)} */}
                    </td>
                    <td className="p-4">
                      <StatusContainer
                        text={txn.paid ? "Successful" : "Pending"}
                        status={txn.paid ? STATE_SUCCESS : STATE_PENDING}
                      />
                    </td>
                    <td className="flex gap-1 p-4">
                      <div
                        // onClick={() => openDrawer(txn)}
                        className="cursor-pointer bg-[#FCEAE8] rounded size-6 grid place-content-center text-[#292D32]"
                      >
                        <IoEye size={16} />
                      </div>
                      <div className="cursor-pointer bg-[#E99E104D] rounded size-6 grid place-content-center text-[#E94410]">
                        <HiReceiptRefund size={16} />
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
            !loading && transactions.length === 0 && <div className="w-full h-60 grid place-content-center text-[#3A3A3A] font-medium text-[1rem] leading-[1.125rem]">
              No recent activity
            </div>
          }
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
                transaction={currentTransaction}
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
