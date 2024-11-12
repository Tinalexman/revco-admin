import React, { useState, FC } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import StatusContainer, {
  STATE_SUCCESS,
} from "@/components/reusable/StatusContainer";
import Filters from "../../common/Filters";
import { useGetUserTransactions } from "@/hooks/userHooks";
import Paginator from "@/components/reusable/paginator/Paginator";
import { Loader } from "@mantine/core";
import { getDateRange } from "@/functions/dateFunctions";

interface iDateData {
  start: string;
  end: string;
}

const Details: FC<{ name: string; phoneNumber: string }> = ({
  name,
  phoneNumber,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const currentDate = getDateRange("Today");
  const { data, loading, getTransactions } = useGetUserTransactions(
    name,
    phoneNumber
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(data.count / 10);
  const [dateData, setDateData] = useState<iDateData>({
    start: currentDate[0],
    end: currentDate[0],
  });

  function handlePageChange(page: number) {
    setCurrentPage(page);
    getTransactions(`${page}`, dateData.start, dateData.end);
  }

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
          <Filters
            onDatesChanged={(start, end) => {
              setDateData({ start, end });
              getTransactions(`${currentPage}`, dateData.start, dateData.end);
            }}
            showDatePicker={false}
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
                <th scope="col" className="text-left px-4">
                  S/N
                </th>
                <th scope="col" className="text-left px-4">
                  Type
                </th>
                <th scope="col" className="text-left px-4">
                  Amount
                </th>
                <th scope="col" className="text-left px-4">
                  Transaction Ref
                </th>
                <th scope="col" className="text-left px-4">
                  Payment Method
                </th>
                <th scope="col" className="text-left px-4">
                  Status
                </th>
                <th scope="col" className="text-left px-4">
                  Date Created
                </th>
                <th scope="col" className="text-left px-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                data.data
                  .slice(0, expanded ? data.data.length : 5)
                  .map((txn, i) => (
                    <tr
                      key={i}
                      className="odd:bg-white even:bg-slate-50 text-[#3A3A3A] text-[0.75rem] leading-[1.125rem] justify-around"
                    >
                      <td className="p-4">{i + 1}</td>
                      <td className="p-4">{txn.channel}</td>
                      <td className="p-4">
                        ₦{Number.parseFloat(txn.total).toLocaleString("en-US")}
                      </td>

                      <td className="p-4">{txn.externalReferenceNumber}</td>
                      <td className="p-4">{txn.channel}</td>

                      <td className="p-4">
                        <StatusContainer
                          text={"Completed"}
                          status={STATE_SUCCESS}
                        />
                      </td>
                      <td className="p-4">
                        {/* {convertDateWithDashesAndTime(txn.dateCreated)} */}
                      </td>
                      <td className="flex gap-1 p-4">
                        <div
                          // onClick={() => openDrawer(txn)}
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

export default Details;
