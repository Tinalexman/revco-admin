import { useAxios } from "@/api/base";
import { getDateRange } from "@/functions/dateFunctions";
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
  firstName: string;
  lastName: string;
  createdAt: string;
  active: boolean;
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

export interface iAdminUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  lastLoginDate: string;
  nin: boolean;
  active: boolean;
}

export interface iAdminUserResponse {
  data: iAdminUser[];
  count: number;
}

export interface iCreateUserPayload {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role: string;
  userMda: {
    mdaId: number;
    mdaOfficeId: number;
    canCollect: boolean;
    collectionLimit: number;
    permissions: any;
  };
  project: {
    projectId: number;
  };
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
      `/mda-report/taxpayers?pageNumber=${pageNo}&pageSize=50${
        role !== "" ? `&roleFilter=${role}` : ""
      }`,
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

export const useGetAdminUsers = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iAdminUserResponse>({
    data: [],
    count: 0,
  });
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getUsers = async (pageNo: string) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/admin-users?pageNumber=${pageNo}&pageSize=50`,
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
      getUsers("1");
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
      const currentDate = getDateRange("Today");
      getTransactions("1", currentDate[0], currentDate[0]);
    }
  }, [token]);

  return {
    loading,
    success,
    getTransactions,
    data,
  };
};

export const useCreateUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let createUser = async (payload: iCreateUserPayload) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/auth/createuser`,
      "POST",
      payload,
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
      toast.success("Successfully created a new user");
    }
  };

  return {
    loading,
    success,
    createUser,
  };
};
