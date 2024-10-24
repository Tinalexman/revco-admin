import { useAxios } from "@/api/base";
import { useToken } from "@/providers/AuthProvider";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export interface iDetail {
  name: string;
  active: number;
  inactive: number;
  count: number;
}

export interface iOrganizationResponse {
  name: string;
  id: number;
  createdDate: string;
  mdaCode: string;
  abbreviation: string;
  active: boolean;
  businessId: number;
  category: string;
}

export interface iOrganization {
  data: iOrganizationResponse[];
  count: number;
}

export interface iOrganizationUserResponse {
  userId: number;
  name: string;
  mdaId: number;
  mdaOfficeId: number;
  mdaName: string;
  email: string;
  role: string;
  status: boolean;
  mdaOfficeName: string;
  canCollect: boolean;
  collectionLimit: number;
}

export interface iOrganizationUser {
  data: iOrganizationUserResponse[];
  count: number;
}

export interface iOrganizationTransactionHistoryResponse {
  id: number;
  createdBy: number;
  createdDate: string;
  isActive: boolean;
  sortBy: any;
  orderBy: any;
  recordsPerPage: number;
  from: number;
  transactionId: string;
  transactionReference: string;
  transactionDate: string;
  transactionDescription: string;
  totalAmountPaid: number;
  serviceAmount: number;
  fee: number;
  commission: number;
  transactionType: string;
  channel: string;
  customerName: string;
  customerPhone: string;
  customerEmail: any;
  mdaId: number;
  officeId: number;
  createdDateStamp: number;
  businessId: number;
  terminalId: any;
  pan: any;
  payerId: number;
  monthNo: number;
  yearNo: number;
  comission: number;
  active: boolean;
}

export interface iOrganizationTransactionHistory {
  data: iOrganizationTransactionHistoryResponse[];
  count: number;
}

export const useGetOrganizations = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iOrganization>({
    data: [],
    count: 0,
  });
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getOrganizations = async (pageNo: string) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/mda/mdas?&pageNo=${pageNo}&pageSize=10`,
      "GET",
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );

    setData({
      data: data.data,
      count: data.count,
    });
    setLoading(false);
    setSuccess(status);

    if (!status) {
      toast.error(
        data?.response?.data?.data ?? "An error occurred. Please try again"
      );
    }
  };

  useEffect(() => {
    if (token) {
      getOrganizations("1");
    }
  }, [token]);

  return {
    loading,
    success,
    getOrganizations,
    data,
  };
};

export const useGetOrganizationsOverview = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iDetail[]>(
    Array(4).fill({
      name: "",
      active: 0,
      inactive: 0,
      count: 0,
    })
  );
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getOrganizationsOverview = async () => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/mda/summary`,
      "GET",
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );

    const totalDetail: iDetail = {
      name: "Total",
      active: data.TOTAL.active,
      inactive: data.TOTAL.inactive,
      count: data.TOTAL.count,
    };

    const ministryDetail: iDetail = {
      name: "Ministries",
      active: data.Ministry.active,
      inactive: data.Ministry.inactive,
      count: data.Ministry.count,
    };

    const commerceDetail: iDetail = {
      name: "Commerce",
      active: data.Commerce.active,
      inactive: data.Commerce.inactive,
      count: data.Commerce.count,
    };

    const otherDetail: iDetail = {
      name: "Others",
      active: data.Other.active,
      inactive: data.Other.inactive,
      count: data.Other.count,
    };

    setData([totalDetail, ministryDetail, commerceDetail, otherDetail]);
    setLoading(false);
    setSuccess(status);

    if (!status) {
      toast.error(
        data?.response?.data?.data ?? "An error occurred. Please try again"
      );
    }
  };

  useEffect(() => {
    if (token) {
      getOrganizationsOverview();
    }
  }, [token]);

  return {
    loading,
    success,
    getOrganizationsOverview,
    data,
  };
};

export const useGetOrganizationUsers = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iOrganizationUser>({
    data: [],
    count: 0,
  });
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getUsers = async (mdaId: string, pageNo: string) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/mda/mdas/user?mdaId=${mdaId}&pageNo=${pageNo}&pageSize=10`,
      "GET",
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );

    setData({
      data: data.data,
      count: data.count,
    });
    setLoading(false);
    setSuccess(status);

    if (!status) {
      toast.error(
        data?.response?.data?.data ?? "An error occurred. Please try again"
      );
    }
  };

  return {
    loading,
    success,
    getUsers,
    data,
  };
};

export const useGetOrganizationTransactionHistory = (mdaId: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iOrganizationTransactionHistory>({
    data: [],
    count: 0,
  });
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getHistory = async (pageNo: string) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/mda/transactions?mdaId=${mdaId}&pageNo=${pageNo}&pageSize=10`,
      "GET",
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );

    setData({
      data: data.data,
      count: data.count,
    });
    setLoading(false);
    setSuccess(status);

    if (!status) {
      toast.error(
        data?.response?.data?.data ?? "An error occurred. Please try again"
      );
    }
  };

  useEffect(() => {
    if (token) {
      getHistory("1");
    }
  }, [token]);

  return {
    loading,
    success,
    getHistory,
    data,
  };
};
