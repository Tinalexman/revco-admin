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

export interface iStatisticsSummaryResponse {
  totalRevenue: number;
  totalInvoiceGeneratedInNaira: number;
  totalCommissionInNaira: number;
  totalAmountRemitted: number;
}

export interface iMdaMetricsResponse {
  amount: number;
  referenceName: string;
  invoiceTotal: number;
  others: number;
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
      `/mda-report/transaction-activity?pageNo=${pageNo}&pageSize=10&type=Y`,
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
  const [data, setData] = useState<iStatisticsSummaryResponse | null>(null);
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getStatisticsSummary = async (type: string) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/statistics-summary?type=${type}`,
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
      getStatisticsSummary("Y");
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

  let getActivity = async (type: string) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/user-activity?type=${type}`,
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
      getActivity("Y");
    }
  }, [token]);

  return {
    loading,
    success,
    getActivity,
    data,
  };
};

export const useGetTransactionChannelsPieData = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iTransactionSummaryChartDataResponse[]>([]);
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getPieData = async (
    projectId: string | number,
    mdaId: string | number
  ) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/transactionsummary-monthly-channel?formProjectId=${projectId}&formMdaId=&${mdaId}&isLastMonth=false`,
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
      getPieData(1, "");
    }
  }, [token]);

  return {
    loading,
    success,
    getPieData,
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
