import { useAxios } from "@/api/base";
import { useToken } from "@/providers/AuthProvider";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export interface iRecentActivity {
  count: number;
  data: iRecentActivityResponse[];
}

export interface iRecentActivityResponse {
  txid: string;
  mda: string;
  amountPaid: number;
  paymentDate: string;
  username: string;
  description: string;
  channel: string;
  type: string;
}

export interface iTransactionSummaryChartDataResponse {
  channel: string;
  count: number;
  income: number;
  remitted: number;
  totalRev: number;
}

export interface iTransactionStatusChartDataResponse {
  total: number;
  success: number;
  pending: number;
}

export interface iStatisticsSummaryResponse {
  totalRevenue: number;
  totalInvoiceGeneratedInNaira: number;
  totalCommissionInNaira: {
    total: number;
    Paysure: number;
    "Participant 1": number;
    "Participant 2": number;
  };
  totalAmountRemitted: number;
}

export interface iMdaMetricsResponse {
  amount: any;
  referenceName: string;
  invoiceTotal: number;
  invoicePaid: number;
}

export interface iUserActivityResponse {
  taxpayers: number;
  individuals: number;
  corporations: number;
  newSignUps: number;
  nsIndividual: number;
  nsCorporations: number;
}

export const useGetRecentActivity = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iRecentActivity>({
    count: 0,
    data: [],
  });
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getActivity = async (pageNo: string) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/transaction-activity?pageNo=${pageNo}&pageSize=50&type=Y`,
      "GET",
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );

    setData(data);
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
      getActivity("1");
    }
  }, [token]);

  return {
    loading,
    success,
    getActivity,
    data,
  };
};

export const useGetStatisticsSummary = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<iStatisticsSummaryResponse>({
    totalAmountRemitted: 0,
    totalCommissionInNaira: {
      "Participant 1": 0,
      "Participant 2": 0,
      Paysure: 0,
      total: 0,
    },
    totalInvoiceGeneratedInNaira: 0,
    totalRevenue: 0,
  });
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getStatisticsSummary = async (start: string, end: string) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/statistics-summary?from=${start}&to=${end}`,
      "GET",
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );

    setData(data);
    setLoading(false);

    if (!status) {
      toast.error(
        data?.response?.data?.data ?? "An error occurred. Please try again"
      );
    }
  };

  useEffect(() => {
    if (token) {
      const currentDate = new Date().toISOString().split("T")[0];
      getStatisticsSummary(currentDate, currentDate);
    }
  }, [token]);

  return {
    loading,
    getStatisticsSummary,
    data,
  };
};

export const useGetTransactionSummary = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iRecentActivityResponse[]>([]);
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getSummary = async (
    projectId: string | number,
    mdaId: string | number,
    agentId: string | number
  ) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/transactionsummary?formProjectId=${projectId}&formMdaId=&${mdaId}&formAgentId=${agentId}`,
      "GET",
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );

    setData(data.data.data);
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
      getSummary(1, "", "");
    }
  }, [token]);

  return {
    loading,
    success,
    getSummary,
    data,
  };
};

export const useGetMetrics = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iMdaMetricsResponse[]>([]);
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getMetrics = async (type: string) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/metrics?type=${type}`,
      "GET",
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );

    setData(data);
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
      getMetrics("Y");
    }
  }, [token]);

  return {
    loading,
    success,
    getMetrics,
    data,
  };
};

export const useGetUserActivity = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iUserActivityResponse | null>(null);
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getActivity = async (start: string, end: string) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/user-activity?from=${start}&to=${end}`,
      "GET",
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );

    setData(data);
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
      const currentDate = new Date().toISOString().split("T")[0];
      getActivity(currentDate, currentDate);
    }
  }, [token]);

  return {
    loading,
    success,
    data,
  };
};

export const useGetTransactionChannelsPieData = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iTransactionSummaryChartDataResponse[]>([]);
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getPieChannelsData = async (start: string, end: string) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/getChannelMetrics?from=${start}&to=${end}`,
      "GET",
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );

    setData(data.data);
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
      const currentDate = new Date().toISOString().split("T")[0];
      getPieChannelsData(currentDate, currentDate);
    }
  }, [token]);

  return {
    loading,
    success,
    getPieChannelsData,
    data,
  };
};

export const useGetTransactionStatusPieData = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iTransactionStatusChartDataResponse>({
    pending: 0,
    success: 0,
    total: 0,
  });
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getPieStatusData = async (type: string) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/notifications/status/pie?type=${type}`,
      "GET",
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );

    setData(data.data);
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
      getPieStatusData("D");
    }
  }, [token]);

  return {
    loading,
    success,
    getPieStatusData,
    data,
  };
};

export const useGetRecentTransaction = (txid: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iUserActivityResponse | null>(null);
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getTransaction = async () => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/transaction?ref=${txid}`,
      "GET",
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );

    setData(data);
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
      getTransaction();
    }
  }, [token]);

  return {
    loading,
    success,
    data,
  };
};
