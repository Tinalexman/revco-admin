import React, { useState, FC } from "react";
import Filters from "../Filters";
import { Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IoIosArrowDown } from "react-icons/io";
import { convertDateWithDashesAndTime } from "@/functions/dateFunctions";
import { IoEye } from "react-icons/io5";
import StatusContainer, {
  STATE_SUCCESS,
  STATE_PENDING,
  STATE_NULL,
} from "@/components/reusable/StatusContainer";
import { iOrganizationResponse, useGetOrganizations } from "@/hooks/organizationHooks";
import Paginator from "@/components/reusable/paginator/Paginator";
import Link from "next/link";



const ViewOrganizationTypesList: FC<{ organizationName: string }> = ({ organizationName }) => {
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
          <h2 className="text-black text-med-button">{organizationName}</h2>
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
                <th scope="col" className="text-left px-4">Category</th>
                <th scope="col" className="text-left px-4">Organization Name</th>
                <th scope="col" className="text-left px-4">Created Date</th>
                <th scope="col" className="text-left px-4">Status</th>
                <th scope="col" className="text-left px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {!loading && data.data
                .slice(0, expanded ? data.data.length : 5)
                .map((org, i) => (
                  <tr
                    key={i}
                    className="odd:bg-white even:bg-slate-50 text-[#3A3A3A] text-[0.75rem] leading-[1.125rem] justify-around"
                  >
                    <td className="p-4">{org.mdaId}</td>
                    <td className="p-4">{org.mdaName}</td>
                    <td className="p-4">{org.category}</td>
                    <td className="p-4">{org.organizationName}</td>
                    <td className="p-4">{convertDateWithDashesAndTime(org.createdDate)}</td>
                    <td className="p-4">
                      <StatusContainer
                        text={org.active ? "Active" : "Inactive"}
                        status={org.active ? STATE_SUCCESS : STATE_NULL}
                      />
                    </td>
                    <td className="flex gap-1 p-4">
                      <Link
                        href={`/dashboard/organizations/view-organization?organizationId=${org.officeId}`}
                        className="cursor-pointer bg-[#FCEAE8] rounded size-6 grid place-content-center text-[#292D32]"
                      >
                        <IoEye size={16} />
                      </Link>
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
    </>
  );
};

export default ViewOrganizationTypesList;
