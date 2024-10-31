import { iGenerateInvoiceResponse } from "@/hooks/paymentHooks";
import React, { FC } from "react";
import Image from "next/image";
import Receipt from "@/assets/payments/Receipt.svg";
import { FaRegCopy } from "react-icons/fa6";
import toast from "react-hot-toast";

const InvoiceGenerated: FC<{
  invoice: iGenerateInvoiceResponse;
  onClose: () => void;
}> = ({ invoice, onClose }) => {
  return (
    <div className="w-full h-full justify-center flex flex-col gap-6 items-center">
      <Image
        src={Receipt}
        alt="receipt"
        width={56}
        height={56}
        className="size-20 object-cover mt-10"
      />
      <h2 className="text-reg-caption text-gray-5 font-medium">
        Your invoice has been generated successfully.
      </h2>

      <div className="w-full flex justify-center items-center gap-2">
        <h2 className="text-dash-header font-bold text-primary">
          {invoice.invoiceNo}
        </h2>
        <FaRegCopy
          className="cursor-pointer text-black"
          size={16}
          onClick={() => {
            navigator.clipboard.writeText(invoice.invoiceNo).then((_) => {
              toast.success("Copied to clipboard");
            });
          }}
        />
      </div>
      <div className="w-full flex justify-between items-center mt-10">
        <button
          onClick={onClose}
          className="text-[#E94410] w-[48%] border-2 border-[#F6F6F7] h-10 flex justify-center gap-2 items-center rounded-lg"
        >
          Close
        </button>
        <button
          onClick={() => {
            window.location.assign(
              `/dashboard/payments/invoice-management/receipt?status=pending&invoice=${invoice.invoiceNo}`
            );
          }}
          className="text-white w-[48%] bg-primary h-10 flex justify-center gap-2 items-center rounded-lg"
        >
          Print Invoice
        </button>
      </div>
    </div>
  );
};

export default InvoiceGenerated;
