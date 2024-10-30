import { useAxios } from "@/api/base";
import { useToken } from "@/providers/AuthProvider";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export interface iPaymentChannel {
  channel: string;
  percentage: string;
}

export interface iRecentInvoice {
  data: iRecentInvoiceData[];
  count: number;
}
export interface iRecentInvoiceData {
  userDetails: {
    lastname: string;
    firstname: string;
    email: string;
    tin: any;
    tinType: string;
    businessName: any;
    phone: string;
  };
  transactionDetails: {
    invoiceNumber: string;
    createdDate: string;
    modifiedDate: string;
    paymentStatus: string;
    totalAmount: string;
    channel: any;
    paymentDate: string;
  };
  organizationDetails: {
    mdaName: string;
    mdaCode: string;
    serviceDescription: string;
  };
  payment: {
    transactionId: string;
    transactionReference: string;
    transactionDate: string;
    transactionDescription: string;
    totalAmountPaid: number;
    serviceAmount: number;
    fee: number;
    commission: number;
    channel: string;
    customerName: string;
    customerPhone: string;
    customerEmail: any;
    terminalId: any;
    pan: any;
    mdaId: number;
    mdaName: string;
    mdaOfficeId: number;
    mdaOfficeName: string;
    project: string;
    individualPayerTempTin: any;
    individualPayerJtbTin: any;
    corporatePayerTempTin: string;
    corporatePayerJtbTin: any;
    agentId: number;
    agentName: string;
    payerId: number;
    cashTransactionId: any;
  }[];
  payerId: string;
  assessment: {
    assessmentId: string;
    taxAmount: string;
    amountPaid: string;
    balance: string;
    grossIncomeAmount: string;
    isSettled: string;
  };
}

export const useGetPaymentChannels = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iPaymentChannel[]>([]);
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getChannels = async () => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/getChannelMetrics`,
      "GET",
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );

    setLoading(false);
    setSuccess(status);

    if (!status) {
      toast.error(
        data?.response?.data?.data ?? "An error occurred. Please try again"
      );
    } else {
      setData(data.data);
    }
  };

  useEffect(() => {
    if (token) {
      getChannels();
    }
  }, [token]);

  return {
    loading,
    success,
    getChannels,
    data,
  };
};

export const useGetRecentInvoices = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iRecentInvoice>({
    data: [],
    count: 0,
  });
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getInvoices = async (
    fromDate: string,
    endDate: string,
    pageNo: string
  ) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/getInvoices?from=${fromDate}&to=${endDate}&pageNo=${pageNo}`,
      "GET",
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );

    setLoading(false);
    setSuccess(status);

    if (!status) {
      toast.error(
        data?.response?.data?.data ?? "An error occurred. Please try again"
      );
    } else {
      setData(data);
    }
  };

  useEffect(() => {
    if (token) {
      const currentDate = new Date().toISOString().split("T")[0];
      getInvoices(currentDate, currentDate, "1");
    }
  }, [token]);

  return {
    loading,
    success,
    getInvoices,
    data,
  };
};
