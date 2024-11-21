import { useAxios } from "@/api/base";
import { getDateRange } from "@/functions/dateFunctions";
import { useToken } from "@/providers/AuthProvider";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export interface iDispute {
  ticketNumber: string;
  username: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  agentAssignedTo: number;
  agentName: string;
  createdAt: string;
  updatedAt: string;
  businessId: number;
}

export interface iDisputeResponse {
  data: iDispute[];
  count: number;
}

export interface iCreateDisputePayload {
  username: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  agentAssignedTo?: number;
}

export interface iSupportStaff {
  id: number;
  createdBy: number;
  createdDate: string;
  isActive: boolean;
  sortBy: any;
  orderBy: any;
  recordsPerPage: number;
  from: number;
  firstName: string;
  lastName: string;
  otherNames: null;
  email: string;
  phone: string;
  lastUpdatedDate: any;
  role: string;
  lastLoginDate: any;
  loginFailedDate: any;
  loginFailedCount: number;
  isEmailConfirmed: boolean;
  isPhoneConfirmed: boolean;
  emailConfirmedDate: string;
  phoneConfirmedDate: any;
  emailConfirmationCode: any;
  phoneConfirmationCode: any;
  resetPasswordRequestDate: any;
  resetPasswordCode: any;
  resetPasswordCount: number;
  passwordHash: any;
  passwordSalt: any;
  businessId: number;
  updatedBy: number;
  updatedDate: any;
  isDefaultPass: boolean;
  permissions: any;
  password: any;
  defaultPass: boolean;
  authorities: {
    authority: string;
  }[];
  username: string;
  emailConfirmed: boolean;
  phoneConfirmed: boolean;
  enabled: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  active: boolean;
}

export const useGetAllDisputes = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<iDisputeResponse>({
    count: 0,
    data: [],
  });
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getDisputes = async (pageNo: number, start: string, end: string) => {
    if (loading) return;
    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/support/get?pageNumber=${pageNo}&pageSize=50&fromDate=${start}&toDate=${end}`,
      "GET",
      {}
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
      getDisputes(1, currentDate[0], currentDate[0]);
    }
  }, [token]);

  return {
    loading,
    data,
    success,
    getDisputes,
  };
};

export const useCreateDispute = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let createDispute = async (payload: iCreateDisputePayload) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/support/create`,
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
      toast.success("New Ticket Created");
    }
  };

  return {
    loading,
    success,
    createDispute,
  };
};

export const useGetAllSupportStaff = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<iSupportStaff[]>([]);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getStaff = async () => {
    if (loading) return;
    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/support/support-staffs`,
      "GET",
      {}
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
      getStaff();
    }
  }, [token]);

  return {
    loading,
    data,
    success,
    getStaff,
  };
};

export const changeDisputeStatus = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let changeStatus = async (
    ticketNumber: string,
    ticketStatus: "IN_PROGRESS" | "RESOLVED" | "CLOSED" | "OPEN"
  ) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/support/changeStatus?ticketNumber=${ticketNumber}&status=${ticketStatus}`,
      "POST",
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
      toast.success("Ticked Updated");
    }
  };

  return {
    loading,
    success,
    changeStatus,
  };
};
