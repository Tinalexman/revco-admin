import React, { useState } from "react";
import Filters from "./Filters";
import { Drawer, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IoIosArrowDown } from "react-icons/io";
import { convertDateWithDashesAndTime } from "@/functions/dateFunctions";
import { IoEye } from "react-icons/io5";
import { HiReceiptRefund } from "react-icons/hi2";
// import ViewTransaction from "./ViewTransaction";
import StatusContainer, {
  STATE_SUCCESS,
  STATE_PENDING,
} from "@/components/reusable/StatusContainer";
import { iOrganizationResponse, useGetOrganizations } from "@/hooks/organizationHooks";
import Paginator from "@/components/reusable/paginator/Paginator";



const OrganizationList = () => {
  const [expanded, setExpanded] = useState<boolean>(false);


  const [opened, { open, close }] = useDisclosure(false);
  const [currentTransaction, setCurrentTransaction] =
    useState<iOrganizationResponse | null>(null);

  const openDrawer = (transaction: iOrganizationResponse) => {
    setCurrentTransaction(transaction);
    open();
  };

  const closeDrawer = () => {
    setCurrentTransaction(null);
    close();
  };

  const { loading, getOrganizations, data } = useGetOrganizations();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(data.count / 10);

  function handlePageChange(page: number) {
    setCurrentPage(page);
    getOrganizations(`${page}`);
  }


  return (
    <>
      <div className="w-full bg-white p-5 flex flex-col gap-3 rounded-xl">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-black text-med-button">List of Organizations</h2>
          <h2
            onClick={() => setExpanded(!expanded)}
            className="cursor-pointer text-med-button text-[#007AFF]"
          >
            {expanded ? "View Less" : "View All"}
          </h2>
        </div>
        <div className="w-full justify-between items-center flex">
          <Filters />
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
        <div className="relative overflow-x-auto scrollbar-thin scrollbar-webkit">
          <table className="w-[150%]">
            <thead className="w-full bg-[#F3F7FC] h-14">
              <tr className="text-[#3A3A3A] font-medium text-[0.75rem] leading-[1.125rem]">
                <th scope="col" className="text-left px-4">User ID</th>
                <th scope="col" className="text-left px-4">Name</th>
                <th scope="col" className="text-left px-4">Service Type</th>
                <th scope="col" className="text-left px-4">Email</th>
                <th scope="col" className="text-left px-4">TIN</th>
                <th scope="col" className="text-left px-4">Status</th>
                <th scope="col" className="text-left px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {!loading && data.data
                .slice(0, expanded ? data.data.length : 5)
                .map((txn, i) => (
                  <tr
                    key={i}
                    className="odd:bg-white even:bg-slate-50 text-[#3A3A3A] text-[0.75rem] leading-[1.125rem] justify-around"
                  >
                    <td className="p-4">{txn.id}</td>
                    <td className="p-4">{txn.name}</td>
                    <td className="p-4">{txn.projectName}</td>
                    <td className="p-4"></td>
                    <td className="p-4"></td>
                    <td className="p-4">
                      {/* <StatusContainer
                        text={txn.statusText}
                        status={txn.status}
                      /> */}
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
          {
            loading && <div className="w-full h-60 grid place-content-center">
              <Loader color="primary.6" />
            </div>
          }
          {
            !loading && data.data.length === 0 && <div className="w-full h-60 grid place-content-center text-[#3A3A3A] font-medium text-[1rem] leading-[1.125rem]">
              No organizations available
            </div>
          }
        </div>
      </div>
      {/* {currentTransaction !== null && (
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
      )} */}
    </>
  );
};

export default OrganizationList;
