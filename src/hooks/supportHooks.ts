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
  agentAssignedTo: number;
}

export interface iAgent {
  id: number;
  firstName: string;
  lastName: string;
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

export const useGetAllAgents = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<iAgent[]>([]);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getAgents = async () => {
    if (loading) return;
    setLoading(true);

    const { data, status } = await requestApi(
      `/admin/users?multiple_filter=Agent&sort=asc&page=1&per_page=100`,
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
      setData(data.data.data);
    }
  };

  useEffect(() => {
    if (token) {
      getAgents();
    }
  }, [token]);

  return {
    loading,
    data,
    success,
    getAgents,
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
