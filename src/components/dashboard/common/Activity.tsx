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
  STATE_SUCCESS,
} from "@/components/reusable/StatusContainer";

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
  const [transactions, setTransactions] = useState<iTransaction[]>(
    Array(10).fill({
      transactionID: "TXN12345",
      payerName: "Bola Tunde",
      mda: "Min. of Agric",
      revenueHead: "Taraba State Bill",
      amount: 50000,
      paymentDate: new Date("2024-02-05"),
      status: "Successful",
      serviceCharge: 50,
      serviceType: "Revenue Fees",
      pin: "123456789012",
      payerID: "123456789012",
      refNo: "123456789012",
      tin: "123456789012",
      total: 55000,
      channel: "Bank Transfer",
    })
  );

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
          <Filters />
          <button className="bg-[#F0E6FC] rounded text-primary flex gap-3 items-center px-3 h-10">
            <p className="text-[0.815rem] leading-[0.975rem]">Export</p>
            <IoIosArrowDown />
          </button>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full">
            <thead className="w-full bg-[#F3F7FC] h-14">
              <tr className="text-[#3A3A3A] font-medium text-[0.75rem] leading-[1.125rem]">
                <th scope="col">Transaction ID</th>
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
              {transactions
                .slice(0, expanded ? transactions.length : 5)
                .map((txn, i) => (
                  <tr
                    key={i}
                    className="odd:bg-white even:bg-slate-50 text-[#3A3A3A] text-[0.75rem] leading-[1.125rem] justify-around"
                  >
                    <td className="p-4">{txn.transactionID}</td>
                    <td className="p-4">{txn.payerName}</td>
                    <td className="p-4">{txn.mda}</td>
                    <td className="p-4">{txn.serviceType}</td>
                    <td className="p-4">
                      ₦{txn.amount.toLocaleString("en-US")}
                    </td>
                    <td className="p-4">
                      {convertDateWithDashesAndTime(txn.paymentDate)}
                    </td>
                    <td className="p-4">
                      <StatusContainer
                        text={txn.status}
                        status={STATE_SUCCESS}
                      />
                    </td>
                    <td className="flex gap-1 p-4">
                      <div
                        onClick={() => openDrawer(txn)}
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
