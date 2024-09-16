import React, { FC, useState } from "react";
import {
  BsFillFileEarmarkCheckFill,
  BsFillFileEarmarkXFill,
} from "react-icons/bs";

const ChannelAction: FC<{
  enable: boolean;
  onClose: () => void;
}> = ({ onClose, enable }) => {
  return (
    <div className="flex flex-col bg-white items-center p-6">
      <div
        className={`p-3 ${
          enable ? "bg-[#E9F7EF] text-[#27AE60]" : "bg-[#FFEAE9] text-[#D32F2F]"
        } rounded-full`}
      >
        {enable ? (
          <BsFillFileEarmarkCheckFill size={32} />
        ) : (
          <BsFillFileEarmarkXFill size={32} />
        )}
      </div>
      <div className="mt-6 flex flex-col gap-2 items-center w-full text-center">
        <h2 className="text-black font-semibold text-[1rem] leading-[1.5rem]">
          {enable ? "Approve" : "Reject"} Refund Request
        </h2>
        <p className="font-medium text-reg-caption text-[#595959]">
          Are you sure you want to {enable ? "approve" : "reject"} the refund
          request
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
          Yes, {enable ? "Approve" : "Reject"}
        </button>
      </div>
    </div>
  );
};

export default ChannelAction;
