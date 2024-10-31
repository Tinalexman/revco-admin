import React, { useState, FC } from "react";
import Filters from "../Filters";
import { Loader } from "@mantine/core";
import { IoIosArrowDown } from "react-icons/io";
import { convertDateWithDashesAndTime } from "@/functions/dateFunctions";
import { IoEye } from "react-icons/io5";
import StatusContainer, {
  STATE_SUCCESS,
  STATE_NULL,
} from "@/components/reusable/StatusContainer";
import {
  iOrganizationResponse,
  useGetOrganizations,
} from "@/hooks/organizationHooks";
import Paginator from "@/components/reusable/paginator/Paginator";
import Link from "next/link";
import { capitalize } from "@/functions/stringFunctions";

const ViewOrganizationTypesList: FC<{ organizationCategory: string }> = ({
  organizationCategory,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const { loading, getOrganizations, data } = useGetOrganizations(
    organizationCategory === "Ministries" ? "Ministry" : organizationCategory
  );

  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(data.count / 50);

  function handlePageChange(page: number) {
    setCurrentPage(page);
    getOrganizations(`${page}`);
  }

  return (
    <>
      <div className="w-full bg-white p-5 flex flex-col gap-3 rounded-xl">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-black text-med-button">{organizationCategory}</h2>
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
              handlePageChange={(page) => handlePageChange(page)}
            />
          </div>
          <button className="bg-[#F0E6FC] rounded text-primary flex gap-3 items-center px-3 h-10">
            <p className="text-[0.815rem] leading-[0.975rem]">Export</p>
            <IoIosArrowDown />
          </button>
        </div>
        <div className="relative overflow-x-auto scrollbar-thin scrollbar-webkit">
          <table className="w-[120%]">
            <thead className="w-full bg-[#F3F7FC] h-14">
              <tr className="text-[#3A3A3A] font-medium text-[0.75rem] leading-[1.125rem]">
                <th scope="col" className="text-left px-4">
                  MDA ID
                </th>
                <th scope="col" className="text-left px-4">
                  Name
                </th>
                <th scope="col" className="text-left px-4">
                  Abbreviation
                </th>
                <th scope="col" className="text-left px-4">
                  Created Date
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
                  .map((org, i) => {
                    const payload = Buffer.from(
                      JSON.stringify({
                        name: org.name,
                        category: capitalize(org.category),
                        id: org.id,
                        active: org.active,
                      })
                    ).toString("base64");
                    return (
                      <tr
                        key={i}
                        className="odd:bg-white even:bg-slate-50 text-[#3A3A3A] text-[0.75rem] leading-[1.125rem] justify-around"
                      >
                        <td className="p-4">{org.id}</td>
                        <td className="p-4">{org.name}</td>
                        <td className="p-4">{org.abbreviation}</td>
                        <td className="p-4">
                          {convertDateWithDashesAndTime(org.createdDate)}
                        </td>
                        <td className="p-4">
                          <StatusContainer
                            text={org.active ? "Active" : "Inactive"}
                            status={org.active ? STATE_SUCCESS : STATE_NULL}
                          />
                        </td>
                        <td className="flex gap-1 p-4">
                          <Link
                            href={`/dashboard/organizations/view-organization?data=${payload}`}
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
              No {organizationCategory.toLowerCase()} available
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewOrganizationTypesList;
