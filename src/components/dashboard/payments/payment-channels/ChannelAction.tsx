import React, { FC, useState } from "react";

import { GiCancel } from "react-icons/gi";
import { MdDone } from "react-icons/md";

const ChannelAction: FC<{
  name: string;
  enable: boolean;
  onClose: () => void;
}> = ({ name, onClose, enable }) => {
  return (
    <div className="flex flex-col bg-white items-center p-6">
      <div
        className={`p-3 ${
          enable ? "bg-[#E9F7EF] text-[#27AE60]" : "bg-[#FFEAE9] text-[#D32F2F]"
        } rounded-full`}
      >
        {enable ? <MdDone size={32} /> : <GiCancel size={32} />}
      </div>
      <div className="mt-6 flex flex-col gap-2 items-center w-full text-center">
        <h2 className="text-black font-semibold text-[1rem] leading-[1.5rem]">
          {enable ? "Enable" : "Disable"} {name}
        </h2>
        <p className="font-medium text-reg-caption text-[#595959]">
          Are you sure you want to {enable ? "enable" : "disable"} this payment
          channel?
        </p>
      </div>
      <div className="w-full flex justify-between items-center mt-6">
        <button
          onClick={onClose}
          className="text-[#111213] w-[48%] focus:outline-none text-reg-caption border-2 border-[#F6F6F7] h-10 grid place-content-center rounded"
        >
          No, Cancel
        </button>
        <button
          onClick={onClose}
          className={`text-white w-[48%] ${
            enable ? "bg-[#27AE60]" : "bg-[#D32F2F]"
          } text-reg-caption h-10 grid place-content-center rounded`}
        >
          Yes, {enable ? "Enable" : "Disable"}
        </button>
      </div>
    </div>
  );
};

export default ChannelAction;
