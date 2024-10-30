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
  invoiceAmount: number;
  paymentDate: string;
  username: string;
  description: string;
  channel: any;
  type: string;
  phoneNumber: string;
  paid: boolean;
}

export interface iTransactionSummaryChartDataResponse {
  channel: string;
  count: number;
  income: number;
  remitted: number;
  totalRev: number;
}

export interface iTransactionChannelChartDataResponse {
  channel: string;
  percentage: string;
}

export interface iTransactionStatusChartDataResponse {
  total: number;
  success: number;
  pending: number;
}

export interface iTransactionRevenueChartDataResponse {
  "TARABA STATE INTERNAL REVENUE SERVICE ": number;
  Paysure: number;
  "Participant 1": number;
  "Participant 2": number;
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

export interface iRecentActivityDetailsResponse {
  userDetails: {
    lastname: string; //
    firstname: string; //
    email: string; //
    tin: any;
    tinType: string; //
    businessName: any;
    phone: string; //
  };
  transactionDetails: {
    invoiceNumber: string; //
    createdDate: string; //
    modifiedDate: string; //
    paymentStatus: string; //
    totalAmount: string; //
    channel: string; //
    paymentDate: string; ///
  };
  organizationDetails: {
    mdaName: string; //
    mdaCode: string; //
    serviceDescription: string; //
  };
  payment: {
    transactionId: string; //
    transactionReference: string; //;
    transactionDate: string; //
    transactionDescription: string; //
    totalAmountPaid: number; //
    serviceAmount: number; //
    fee: number; ///
    commission: number; //
    channel: string; //
    customerName: string; //
    customerPhone: string; //
    customerEmail: string; //
    terminalId: string; //
    pan: string; //
    mdaId: number; //
    mdaName: string; //
    mdaOfficeId: number; //
    mdaOfficeName: string; //
    project: string; //
    individualPayerTempTin: any;
    individualPayerJtbTin: any;
    corporatePayerTempTin: string; //
    corporatePayerJtbTin: any;
    agentId: number; //
    agentName: string; //
    payerId: number; //
    cashTransactionId: any;
  }[];
  payerId: string; //
  assessment: {
    assessmentId: string; //
    taxAmount: string; //
    amountPaid: string; //
    balance: string; //
    grossIncomeAmount: string; //
    isSettled: string; //
  };
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

  let getActivity = async (start: string, end: string, pageNo: string) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/transaction-activity?pageNumber=${pageNo}&pageSize=50&from=${start}&to=${end}`,
      "GET",
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );

    setLoading(false);
    setSuccess(status);

    if (status) {
      setData(data);
    }

    if (!status) {
      toast.error(
        data?.response?.data?.data ?? "An error occurred. Please try again"
      );
    }
  };

  useEffect(() => {
    if (token) {
      const currentDate = new Date().toISOString().split("T")[0];
      getActivity(currentDate, currentDate, "1");
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

    setLoading(false);

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
      getActivity(currentDate, currentDate);
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
  const [data, setData] = useState<iTransactionChannelChartDataResponse[]>([]);
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getPieChannelsData = async (type: string) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/getChannelMetrics?type=${type}`,
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
      getPieChannelsData("D");
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

export const useGetTransactionRevenuePieData = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iTransactionRevenueChartDataResponse>({
    "Participant 1": 0,
    "Participant 2": 0,
    "TARABA STATE INTERNAL REVENUE SERVICE ": 0,
    Paysure: 0,
  });
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getPieRevenueData = async (type: string) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/notifications/total-revenue/pie?type=${type}`,
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
      getPieRevenueData("D");
    }
  }, [token]);

  return {
    loading,
    success,
    getPieRevenueData,
    data,
  };
};

export const useGetRecentTransactionDetails = (txid?: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iRecentActivityDetailsResponse>({
    userDetails: {
      lastname: "",
      firstname: "",
      email: "",
      tin: null,
      tinType: "",
      businessName: null,
      phone: "",
    },
    transactionDetails: {
      invoiceNumber: "",
      createdDate: "",
      modifiedDate: "",
      paymentStatus: "",
      totalAmount: "",
      channel: "",
      paymentDate: "",
    },
    organizationDetails: {
      mdaName: "",
      mdaCode: "",
      serviceDescription: "",
    },
    payment: [],
    payerId: "",
    assessment: {
      assessmentId: "",
      taxAmount: "",
      amountPaid: "",
      balance: "",
      grossIncomeAmount: "",
      isSettled: "",
    },
  });
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getTransaction = async (invoiceNo?: string) => {
    if (txid === undefined && invoiceNo === undefined) return;

    if (loading) return;
    setLoading(true);

    const query = txid !== undefined ? txid : invoiceNo!;

    const { data, status } = await requestApi(
      `/enroll/invoice?invoiceNumber=${query}`,
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
    if (token && txid !== undefined) {
      getTransaction();
    }
  }, [token]);

  return {
    loading,
    success,
    getTransaction,
    data,
  };
};
