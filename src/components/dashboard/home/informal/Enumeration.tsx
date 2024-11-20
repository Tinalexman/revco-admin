import React, { useState, FC } from "react";

import { Profile, Profile2User } from "iconsax-react";

import Image, { StaticImageData } from "next/image";
import TaxPayersImage from "@/assets/dashboard/tax payers.png";
import TotalUsersImage from "@/assets/dashboard/total users.png";
import { useGetUserActivity } from "@/hooks/dashboardHooks";
import { Drawer, Loader } from "@mantine/core";
import { useGetTaxPayers } from "@/hooks/userHooks";
import Paginator from "@/components/reusable/paginator/Paginator";
import { IoIosArrowDown } from "react-icons/io";
import StatusContainer, {
  STATE_PENDING,
  STATE_SUCCESS,
} from "@/components/reusable/StatusContainer";
import { IoEye } from "react-icons/io5";
import { iUserData } from "../../users/tax-payers/UserList";
import { useDisclosure } from "@mantine/hooks";
import EditUser from "../../users/tax-payers/EditUser";
import ViewUser from "../../users/tax-payers/ViewUser";

import { useRouter } from "next/navigation";
import Filters from "../../users/Filters";
import ResetPassword from "../../users/tax-payers/ResetPassword";

interface iPersonItem {
  value: number;
  title: string;
  icon: any;
  individual: number;
  corporate: number;
  background: StaticImageData;
}
const Enumeration = () => {
  const { data: userActivity, loading: loadingActivity } = useGetUserActivity(
    true,
    "informal"
  );
  const personItems: iPersonItem[] = [
    {
      title: "Total Tax Payers",
      value: userActivity.taxpayers,
      icon: <Profile size={20} className="text-primary" variant="Bold" />,
      individual: userActivity.individuals,
      corporate: userActivity.corporations,
      background: TaxPayersImage,
    },
    {
      title: "New Sign-ups",
      value: userActivity.newSignUps,
      icon: <Profile2User size={20} className="text-primary" variant="Bold" />,
      individual: userActivity.nsIndividual,
      corporate: userActivity.nsCorporations,
      background: TotalUsersImage,
    },
  ];
  const [expanded, setExpanded] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<iUserData | null>(null);
  const { data, loading, getUsers } = useGetTaxPayers();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(data.count / 50);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [resetMode, setResetMode] = useState<boolean>(false);
  const [opened, { open, close }] = useDisclosure(false);
  const closeDrawer = () => {
    setCurrentUser(null);
    close();
  };

  function handlePageChange(page: number) {
    setCurrentPage(page);
    getUsers(`${page}`, "");
  }

  const router = useRouter();

  return (
    <>
      <div className="w-full flex flex-col gap-2.5">
        <div className="w-full grid grid-cols-2 gap-2.5">
          {personItems.map((pt, i) => (
            <div
              className="relative overflow-hidden bg-white w-full rounded-xl px-6 py-3 gap-6 h-44 flex flex-col justify-end items-start"
              key={i}
            >
              <div className="bg-primary-accent rounded-full p-2">
                {pt.icon}
              </div>
              <div className="w-[70%] flex justify-between">
                <div className="w-fit flex flex-col">
                  <h3 className="text-med-button text-[#9EA4AA]">{pt.title}</h3>
                  {loadingActivity ? (
                    <Loader color="primary.6" size={24} />
                  ) : (
                    <h2 className="text-dash-intro-header font-semibold text-gray-5">
                      {pt.value}
                    </h2>
                  )}
                </div>
                <div className="w-fit flex gap-2 items-center">
                  <div className="flex flex-col w-fit">
                    <h3 className="text-[0.69rem] leading-[1.085rem] text-gray-5 font-medium">
                      Individual
                    </h3>
                    {loadingActivity ? (
                      <Loader color="primary.6" size={24} />
                    ) : (
                      <h2 className="text-[1.185rem] leading-[1.4rem] font-semibold text-gray-5">
                        {pt.individual}
                      </h2>
                    )}
                  </div>
                  <div className="w-[1px] h-full bg-[#8E8E93]" />
                  <div className="flex flex-col w-fit">
                    <h3 className="text-[0.69rem] leading-[1.085rem] text-gray-5 font-medium">
                      Corporate
                    </h3>
                    {loadingActivity ? (
                      <Loader color="primary.6" size={24} />
                    ) : (
                      <h2 className="text-[1.185rem] leading-[1.4rem] font-semibold text-gray-5">
                        {pt.corporate}
                      </h2>
                    )}
                  </div>
                </div>
              </div>
              <Image
                src={pt.background}
                alt={pt.title}
                width={300}
                height={200}
                className={`absolute bottom-0 right-0 ${
                  i === 0 ? "w-[30%]" : "w-[25%]"
                } h-auto`}
              />
            </div>
          ))}
        </div>
        <div className="w-full bg-white p-5 flex flex-col gap-3 rounded-xl">
          <div className="w-full flex justify-between items-center">
            <h2 className="text-black text-med-button">List of Tax Payers</h2>
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
          <div className="relative overflow-x-auto">
            <table className="w-full">
              <thead className="w-full bg-[#F3F7FC] h-14">
                <tr className="text-[#3A3A3A] font-medium text-[0.75rem] leading-[1.125rem]">
                  <th scope="col" className="text-left px-4">
                    Tax Payer ID
                  </th>
                  <th scope="col" className="text-left px-4">
                    Name
                  </th>
                  <th scope="col" className="text-left px-4">
                    Email
                  </th>
                  <th scope="col" className="text-left px-4">
                    User Type
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
                    .map((user, i) => {
                      return (
                        <tr
                          key={i}
                          className="odd:bg-white even:bg-slate-50 text-[#3A3A3A] text-[0.75rem] leading-[1.125rem] justify-around"
                        >
                          <td className="p-4">{user.id}</td>
                          <td className="p-4">
                            {user.firstName} {user.lastName}
                          </td>
                          <td className="p-4">{user.email}</td>
                          <td className="p-4">
                            {user.role === "Non-Individual"
                              ? "Corporate"
                              : user.role}
                          </td>
                          <td className="p-4">
                            <StatusContainer
                              text={
                                user.status === "false" ? "Inactive" : "Active"
                              }
                              status={
                                user.status === "false"
                                  ? STATE_PENDING
                                  : STATE_SUCCESS
                              }
                            />
                          </td>
                          <td className="flex gap-1 p-4">
                            <div
                              onClick={() => {
                                setCurrentUser({
                                  email: user.email,
                                  name: `${user.firstName} ${user.lastName}`,
                                  phoneNumber: user.phone,
                                  registrationDate: user.createdAt,
                                  status:
                                    user.status === "false"
                                      ? STATE_PENDING
                                      : STATE_SUCCESS,
                                  statusText:
                                    user.status === "false"
                                      ? "Inactive"
                                      : "Active",
                                  taxPayerID: user.id,
                                  userType: user.role,
                                });
                                open();
                              }}
                              className="cursor-pointer bg-[#FCEAE8] rounded size-6 grid place-content-center text-[#292D32]"
                            >
                              <IoEye size={16} />
                            </div>
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
                No users available
              </div>
            )}
          </div>
        </div>
      </div>
      {currentUser !== null && (
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
              {editMode ? (
                <EditUser
                  user={currentUser}
                  onClose={() => {
                    setEditMode(false);
                  }}
                />
              ) : resetMode ? (
                <ResetPassword
                  userId={Number.parseInt(currentUser!.taxPayerID)}
                  onClose={() => {
                    setResetMode(false);
                  }}
                />
              ) : (
                <ViewUser
                  user={currentUser}
                  onReset={() => {
                    setResetMode(true);
                  }}
                  onClose={closeDrawer}
                  onEdit={() => {
                    setEditMode(true);
                  }}
                  viewTransactions={() => {
                    router.push(
                      `/dashboard/users/transactions?name=${currentUser.name}&phoneNumber=${currentUser.phoneNumber}`
                    );
                  }}
                />
              )}
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Root>
      )}
    </>
  );
};

export default Enumeration;
