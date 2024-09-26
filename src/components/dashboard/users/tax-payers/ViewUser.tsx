import React, { FC, useRef, useEffect, useState } from "react";

import { IoClose } from "react-icons/io5";
import { MdOutlineMoreHoriz } from "react-icons/md";
import StatusContainer from "@/components/reusable/StatusContainer";
import { iUserData } from "./UserList";
import { MdContentCopy } from "react-icons/md";
import { IoMail } from "react-icons/io5";
import { RiEditBoxLine } from "react-icons/ri";
import { MdArrowOutward } from "react-icons/md";

const ViewUser: FC<{
  user: iUserData;
  onClose: () => void;
  onEdit: () => void;
}> = ({ user, onClose, onEdit }) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [showMenu, shouldShowMenu] = useState<boolean>(false);
  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      shouldShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  const namesSplitWithSpaces = user.name.split(" ");

  return (
    <div className="w-full bg-[#FEFEFE] px-5 py-8 flex flex-col items-center gap-6 overflow-y-scroll scrollbar-custom">
      <div className="w-full py-2 flex justify-between items-center">
        <h2 className="text-black font-semibold text-[1.25rem] leading-[1.5rem]">
          Tax Payer Details
        </h2>
        <div
          className="cursor-pointer text-black size-9 grid place-content-center rounded bg-[#F6F6F7]"
          onClick={onClose}
        >
          <IoClose size={24} />
        </div>
      </div>
      <div className="w-full flex items-start justify-between">
        <div className="w-fit gap-2 flex items-center">
          <div className="size-24 rounded-full text-[1.5rem] leading-[2.3rem] font-medium text-black bg-[#F1F2F3] grid place-content-center">
            {namesSplitWithSpaces[0].substring(0, 1)}
            {namesSplitWithSpaces[1].substring(0, 1)}
          </div>
          <div className="flex flex-col">
            <h2 className="text-[1rem] leading-[1.2rem] text-[#111213] font-semibold">
              {user.name}
            </h2>
            <div className="w-fit gap-1 flex items-center">
              <IoMail className="text-[#A9A9A9]" size={14} />
              <p className="text-[0.75rem] leading-[1.25rem] text-[#111213] font-medium">
                {user.email}
              </p>
              <MdContentCopy
                className="text-[#0660FE] cursor-pointer"
                size={14}
                onClick={() => copyToClipboard(user.email)}
              />
            </div>
          </div>
        </div>
        <div className="relative w-fit" ref={dropdownRef}>
          <div
            onClick={() => shouldShowMenu(true)}
            className="w-fit flex gap-2 py-1 px-3 cursor-pointer items-center border border-gray-4 rounded-lg text-reg-caption text-[#111213] font-medium"
          >
            Options
            <MdOutlineMoreHoriz size={24} />
          </div>
          {showMenu && (
            <div
              className={`flex flex-col justify-start items-center w-[160px] bg-white absolute z-1 p-1 right-0 rounded-lg top-8 shadow-custom`}
            >
              <div
                className="flex gap-1 w-full items-center cursor-pointer hover:bg-secondary-accent p-1.5 rounded text-filter-select"
                onClick={() => {
                  shouldShowMenu(false);
                  onEdit();
                }}
              >
                <MdArrowOutward />
                <p>Edit Details</p>
              </div>
              <div
                className="flex gap-1 w-full items-center cursor-pointer hover:bg-secondary-accent p-1.5 rounded text-filter-select"
                onClick={() => {
                  shouldShowMenu(false);
                }}
              >
                <RiEditBoxLine />
                <p>View Transaction</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="rounded-xl w-full border border-gray-4 flex flex-col overflow-hidden">
        <div className="bg-[#F6F6F7] w-full pl-3 py-1">
          <p className="text-reg-caption text-[#595959] font-medium">
            Personal Details
          </p>
        </div>
        <div className="w-full p-3 text-[0.875rem] text-black leading-[1rem] flex items-center justify-between">
          <h3>NIN:</h3>
          <h3 className="font-medium">{user.nin}</h3>
        </div>
        <div className="w-full p-3 text-[0.875rem] text-black leading-[1rem] flex items-center justify-between">
          <h3>Name:</h3>
          <h3 className="font-medium">{user.name}</h3>
        </div>
        <div className="w-full p-3 text-[0.875rem] text-black leading-[1rem] flex items-center justify-between">
          <h3>Email:</h3>
          <h3 className="font-medium">{user.email}</h3>
        </div>
        <div className="w-full p-3 text-[0.875rem] text-black leading-[1rem] flex items-center justify-between">
          <h3>Phone Number:</h3>
          <h3 className="font-medium">{user.phoneNumber}</h3>
        </div>
        <div className="w-full p-3 text-[0.875rem] text-black leading-[1rem] flex items-center justify-between">
          <h3>User Type:</h3>
          <h3 className="font-medium">{user.userType}</h3>
        </div>
        <div className="w-full p-3 text-[0.875rem] text-black leading-[1rem] flex items-center justify-between">
          <h3>Status:</h3>
          <StatusContainer status={user.status} text={user.statusText} />
        </div>
        <div className="w-full p-3 text-[0.875rem] text-black leading-[1rem] flex items-center justify-between">
          <h3>Registration Date:</h3>
          <h3 className="font-medium">{user.registrationDate}</h3>
        </div>
        <div className="w-full p-3 text-[0.875rem] text-black leading-[1rem] flex items-center justify-between">
          <h3>Last Login:</h3>
          <h3 className="font-medium">{user.lastLogin}</h3>
        </div>
      </div>
      <div className="w-full flex justify-between items-center ">
        <button
          onClick={onClose}
          className="text-[#E94410] text-reg-caption w-[48%] border-2 border-[#F6F6F7] h-10 flex justify-center gap-2 items-center rounded-lg"
        >
          Deactivate Account
        </button>
        <button
          onClick={onClose}
          className="text-white text-reg-caption w-[48%] bg-primary h-10 flex justify-center gap-2 items-center rounded-lg"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ViewUser;
