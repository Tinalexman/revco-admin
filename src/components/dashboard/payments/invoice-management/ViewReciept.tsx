"use client";

import React, { ReactNode, Suspense, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Paid, { iPaidReceiptData } from "@/components/reusable/receipts/Paid";
import Pending, {
  iPendingReceiptData,
} from "@/components/reusable/receipts/Pending";
import { Loader } from "@mantine/core";
import { useGetRecentTransactionDetails } from "@/hooks/dashboardHooks";
import toast from "react-hot-toast";

const ViewReceipt = () => {
  return (
    <Suspense fallback={<Loader color="primary.6" />}>
      <ViewRecieptContent />
    </Suspense>
  );
};

const ViewRecieptContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const status = searchParams.get("status");
  const data = searchParams.get("data");
  const invoiceNumber = searchParams.get("invoice");
  const [child, setChild] = useState<ReactNode | null>(null);

  const currentState = pathname.split("/")[1];

  const {
    loading,
    data: transactionDetail,
    success,
    getTransaction,
  } = useGetRecentTransactionDetails();

  useEffect(() => {
    if (status === null || (data === null && invoiceNumber === null)) {
      router.back();
    } else if (status !== "paid" && status !== "pending") {
      toast.error("Invalid query");
      router.back();
    } else if (data !== null) {
      const payload: any = JSON.parse(
        Buffer.from(data!, "base64").toString("utf-8")
      );
      if (status === "paid") {
        setChild(<Paid receipt={payload} />);
      } else if (status === "pending") {
        setChild(<Pending receipt={payload} />);
      }
    } else if (invoiceNumber !== null) {
      getTransaction(invoiceNumber);
    }
  }, [router]);

  useEffect(() => {
    if (!loading && success) {
      if (status! === "paid") {
        const payload: iPaidReceiptData = {
          invoiceNo: transactionDetail.transactionDetails.invoiceNumber,
          transactionDate: transactionDetail.payment[0].transactionDate,
          payer: `${transactionDetail.userDetails.firstname} ${transactionDetail.userDetails.lastname}`,
          payerEmail: transactionDetail.userDetails.email,
          payerPhone: transactionDetail.userDetails.phone,
          billerItem: "Payment Bill",
          mda: transactionDetail.organizationDetails.mdaName,
          revenueHead: transactionDetail.organizationDetails.serviceDescription,
          paymentRef: transactionDetail.payment[0].transactionReference,
          amount: Number.parseFloat(
            transactionDetail.transactionDetails.totalAmount
          ),
          paymentChannel: transactionDetail.transactionDetails.channel,
          state: currentState,
        };
        setChild(<Paid receipt={payload} />);
      } else if (status! === "pending") {
        const payload: iPendingReceiptData = {
          invoiceNo: transactionDetail.transactionDetails.invoiceNumber,
          payer: `${transactionDetail.userDetails.firstname} ${transactionDetail.userDetails.lastname}`,
          payerEmail: transactionDetail.userDetails.email,
          payerPhone: transactionDetail.userDetails.phone,
          billerItem: "Payment Bill",
          mda: transactionDetail.organizationDetails.mdaName,
          revenueHead: transactionDetail.organizationDetails.serviceDescription,
          amount: Number.parseFloat(
            transactionDetail.transactionDetails.totalAmount
          ),
          state: currentState,
        };
        setChild(<Pending receipt={payload} />);
      }
    }
  }, [success, transactionDetail, loading]);

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="px-8 bg-white w-full h-[4.5rem]">
        <div className="w-full flex flex-col justify-around py-2">
          <h2 className="text-monokai font-semibold text-dash-intro-header">
            Payments
          </h2>
          <h3 className="text-primary text-reg-caption">
            Manage all transactions and data on the Revco service
          </h3>
        </div>
      </div>
      {!loading && (
        <div className="w-full grid place-content-center">{child}</div>
      )}
      {loading && (
        <div className="w-full h-80 grid place-content-center">
          <Loader color="primary.6" />
        </div>
      )}
    </div>
  );
};

export default ViewReceipt;
