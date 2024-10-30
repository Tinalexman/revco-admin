import { useAxios } from "@/api/base";
import { useToken } from "@/providers/AuthProvider";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export interface iTaxPayer {
  data: iTaxPayerResponse[];
  count: number;
}

export interface iTaxPayerResponse {
  id: string;
  role: string;
  email: string;
  status: string;
  phone: string;
  name: string;
  createdAt: string;
}

export interface iUserTransaction {
  data: iUserTransactionResponse[];
  count: number;
}

export interface iUserTransactionResponse {
  payerId: string;
  mda: string;
  revenueHead: string;
  channel: string;
  serviceDescription: string;
  tin: any;
  amountPaid: string;
  charges: string;
  total: string;
  serviceAmount: string;
  commission: string;
  phoneNumber: string;
  externalReferenceNumber: string;
  payer: string;
  pin: any;
  tinType: any;
  status: any;
}

export const useGetTaxPayers = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iTaxPayer>({
    data: [],
    count: 0,
  });
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getUsers = async (pageNo: string, role: string) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/taxpayers?pageNumber=${pageNo}&pageSize=10&status=false&roleFilter=${role}`,
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
      getUsers("1", "");
    }
  }, [token]);

  return {
    loading,
    success,
    getUsers,
    data,
  };
};

export const useGetUserTransactions = (name: string, phoneNumber: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iUserTransaction>({
    data: [],
    count: 0,
  });
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getTransactions = async (pageNo: string, from: string, to: string) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/taxPayer/transactionHistory?pageNumber=${pageNo}&pageSize=10&from=${from}&to=${to}&name=${name}&phone=${phoneNumber}`,
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
      getTransactions("1", currentDate, currentDate);
    }
  }, [token]);

  return {
    loading,
    success,
    getTransactions,
    data,
  };
};
