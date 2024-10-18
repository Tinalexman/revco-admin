import React, { FC } from "react";
import Image from "next/image";
import Receipt from "@/assets/payments/Receipt.svg";
import { IoClose } from "react-icons/io5";
import { BiSolidReceipt } from "react-icons/bi";
import { HiReceiptRefund } from "react-icons/hi2";
import StatusContainer, {
  STATE_PENDING,
  STATE_SUCCESS,
} from "@/components/reusable/StatusContainer";
import { iRecentActivityResponse } from "@/hooks/dashboardHooks";

const ViewTransaction: FC<{
  transaction: iRecentActivityResponse;
  onClose: () => void;
  shouldPrint?: boolean;
  shouldRefund?: boolean;
}> = ({ transaction, onClose, shouldPrint, shouldRefund }) => {
  return (
    <div className="w-full bg-[#FEFEFE] px-5 py-8 flex flex-col items-center gap-6 overflow-y-scroll scrollbar-custom">
      <div className="w-full py-2 flex justify-between items-center">
        <h2 className="text-black font-semibold text-[1.25rem] leading-[1.5rem]">
          Payment Details
        </h2>
        <div
          className="cursor-pointer text-black size-9 grid place-content-center rounded bg-[#F6F6F7]"
          onClick={onClose}
        >
          <IoClose size={24} />
        </div>
      </div>
      <Image
        src={Receipt}
        alt="receipt"
        width={56}
        height={56}
        className="size-14 object-cover"
      />
      <div className="w-full flex flex-col">
        <div className="w-full bg-[#F6F6F7] h-10 flex items-center px-5">
          <h3 className="text-[#595959] text-[0.875rem] leading-[1.3125rem]">
            Payer Information
          </h3>
        </div>
        <div className="w-full flex flex-col text-black text-[0.875rem] leading-[1.06rem]">
          <div className="flex justify-between items-center w-full h-10 px-5 border-b border-[#F2F2F7]">
            <h2>Payer&apos;s Name:</h2>
            <h2 className="font-medium">{transaction.payer}</h2>
          </div>
          <div className="flex justify-between items-center w-full h-10 px-5 border-b border-[#F2F2F7]">
            <h2>MDA:</h2>
            <h2 className="font-medium">{transaction.mda}</h2>
          </div>
          <div className="flex justify-between items-center w-full h-10 px-5 border-b border-[#F2F2F7]">
            <h2>Revenue Head:</h2>
            <h2 className="font-medium">{transaction.assesedService}</h2>
          </div>
          <div className="flex justify-between items-center w-full h-10 px-5 border-b border-[#F2F2F7]">
            <h2>Channel:</h2>
            <h2 className="font-medium">{transaction.paymentChannel}</h2>
          </div>
          {/* <div className="flex justify-between items-center w-full h-10 px-5 border-b border-[#F2F2F7]">
            <h2>Service Type:</h2>
            <h2 className="font-medium">{transaction.serviceType}</h2>
          </div> */}
          <div className="flex justify-between items-center w-full h-10 px-5 border-b border-[#F2F2F7]">
            <h2>Payment Status:</h2>
            <StatusContainer
              text={transaction.paid ? "Successful" : "Pending"}
              status={transaction.paid ? STATE_SUCCESS : STATE_PENDING}
            />

          </div>
          <div className="flex justify-between items-center w-full h-10 px-5 border-b border-[#F2F2F7]">
            <h2>PIN:</h2>
            <h2 className="font-medium">{transaction.invoiceNo}</h2>
          </div>
          <div className="flex justify-between items-center w-full h-10 px-5 border-b border-[#F2F2F7]">
            <h2>Payer ID:</h2>
            <h2 className="font-medium">{transaction.payerId ?? ""}</h2>
          </div>
          {/* <div className="flex justify-between items-center w-full h-10 px-5 border-b border-[#F2F2F7]">
            <h2>External Ref No:</h2>
            <h2 className="font-medium">{transaction.refNo}</h2>
          </div> */}
          <div className="flex justify-between items-center w-full h-10 px-5">
            <h2>TIN:</h2>
            <h2 className="font-medium">{transaction.payerTin ?? ""}</h2>
          </div>
        </div>
        <div className="w-full bg-[#F6F6F7] h-16 flex justify-between items-center px-5">
          <h3 className="text-[#202224] text-[1rem] leading-[1.3125rem] font-semibold">
            Total
          </h3>
          <h3 className="text-[#202224] text-[1rem] leading-[1.3125rem] font-semibold">
            ₦{transaction.invoiceAmount.toLocaleString("en-US")}
          </h3>
        </div>
      </div>
      {shouldPrint && shouldPrint && (
        <button className="w-full hover:bg-primary hover:text-white hover:border-0 transition-all duration-200 ease-out text-[#222222] border-2 border-[#F6F6F7] h-11 flex justify-center gap-2 items-center rounded-lg">
          <h4 className="text-reg-caption font-medium">Print Receipt</h4>
          <BiSolidReceipt size={16} />
        </button>
      )}
      {shouldRefund && shouldRefund && (
        <button className="w-full hover:bg-[#E94410] hover:text-white hover:border-0 transition-all duration-200 ease-out text-[#E94410] border-2 border-[#E94410] h-11 flex justify-center gap-2 items-center rounded-lg">
          <h4 className="text-reg-caption font-medium">Refund</h4>
          <HiReceiptRefund size={16} />
        </button>
      )}
    </div>
  );
};

export default ViewTransaction;
