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
  invoiceNumber: string;
  payer: string;
  mdaName: string;
  mdaId: number;
  invoiceAmount: number;
  serviceCode: string;
  mdaService: string;
  email: string;
  tin: string;
  paid: boolean;
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
      `/mda-report/generated-invoices?from=${fromDate}&to=${endDate}&pageNumber=${pageNo}&pageSize=50&mdaId=1`,
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
