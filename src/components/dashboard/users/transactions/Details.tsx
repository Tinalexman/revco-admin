import React, { useState, FC } from "react";
import { Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IoIosArrowDown } from "react-icons/io";
import { convertDateWithDashesAndTime } from "@/functions/dateFunctions";
import { IoEye } from "react-icons/io5";
import { HiReceiptRefund } from "react-icons/hi2";
import StatusContainer, {
  STATE_SUCCESS,
} from "@/components/reusable/StatusContainer";
import Filters from "../../common/Filters";

export interface iTransaction {
  transactionType: string;
  amount: number;
  charge: number;
  transactionRef: string;
  paymentMethod: string;
  status: string;
  statusText: string;
  dateCreated: Date;
}

const Details: FC<{ id: string }> = ({ id }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<iTransaction[]>(
    Array(10).fill({
      transactionType: "Fund Wallet",
      amount: 5000,
      charge: 51,
      transactionRef: "123456789000",
      paymentMethod: "Bank Card",
      status: STATE_SUCCESS,
      statusText: "Pending",
      dateCreated: new Date("2024-05-12"),
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
          <h2 className="text-black text-med-button">List of Transactions</h2>
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
                <th scope="col">S/N</th>
                <th scope="col">Type</th>
                <th scope="col">Amount</th>
                <th scope="col">Charge</th>
                <th scope="col">Transaction Ref</th>
                <th scope="col">Payment Method</th>
                <th scope="col">Status</th>
                <th scope="col">Date Created</th>
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
                    <td className="p-4">{i + 1}</td>
                    <td className="p-4">{txn.transactionType}</td>
                    <td className="p-4">
                      ₦{txn.amount.toLocaleString("en-US")}
                    </td>
                    <td className="p-4">
                      ₦{txn.charge.toLocaleString("en-US")}
                    </td>
                    <td className="p-4">{txn.transactionRef}</td>
                    <td className="p-4">{txn.paymentMethod}</td>

                    <td className="p-4">
                      <StatusContainer
                        text={txn.status}
                        status={STATE_SUCCESS}
                      />
                    </td>
                    <td className="p-4">
                      {convertDateWithDashesAndTime(txn.dateCreated)}
                    </td>
                    <td className="flex gap-1 p-4">
                      <div
                        onClick={() => openDrawer(txn)}
                        className="cursor-pointer bg-[#FCEAE8] rounded size-6 grid place-content-center text-[#292D32]"
                      >
                        <IoEye size={16} />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Details;
