import { useAxios } from "@/api/base";
import { getDateRange } from "@/functions/dateFunctions";
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

export interface iRemittanceSummaryResponse {
  totalCollectedAmount: number;
  totalGeneratedAmount: number;
  totalPendingAmount: number;
  pendingCount: number;
  generatedCount: number;
  totalComission: number;
  collectedCount: number;
}

export interface iRemittance {
  totalCollectedAmount: number;
  totalGeneratedAmount: number;
  totalPendingAmount: number;
  clientName: string;
  pendingCount: number;
  generatedCount: number;
  businessId: number;
  totalCommission: number;
  collectedCount: number;
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

export const useGetRecentActivity = (mode?: string | null) => {
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
    let query = "";
    if (mode !== undefined && mode !== null) {
      query = `&isFormal=${
        mode === "formal" ? "true" : mode === "informal" ? "false" : ""
      }`;
    }

    const { data, status } = await requestApi(
      `/mda-report/transaction-activity?pageNumber=${pageNo}&pageSize=50&from=${start}&to=${end}${query}`,
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
      const currentDate = getDateRange("Today");
      getActivity(currentDate[0], currentDate[0], "1");
    }
  }, [token]);

  return {
    loading,
    success,
    getActivity,
    data,
  };
};

export const useGetStatisticsSummary = (mode?: string | null) => {
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

    let query = "";
    if (mode !== undefined && mode !== null) {
      query = `&isFormal=${
        mode === "formal" ? "true" : mode === "informal" ? "false" : ""
      }`;
    }

    const { data, status } = await requestApi(
      `/mda-report/statistics-summary?from=${start}&to=${end}${query}`,
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
      const currentDate = getDateRange("Today");
      getStatisticsSummary(currentDate[0], currentDate[0]);
    }
  }, [token]);

  return {
    loading,
    getStatisticsSummary,
    data,
  };
};

export const useGetTransactionSummary = (mode?: string | null) => {
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

export const useGetMetrics = (mode?: string | null) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iMdaMetricsResponse[]>([]);
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getMetrics = async (type: string) => {
    if (loading) return;

    setLoading(true);
    let query = "";
    if (mode !== undefined && mode !== null) {
      query = `&isFormal=${
        mode === "formal" ? "true" : mode === "informal" ? "false" : ""
      }`;
    }

    const { data, status } = await requestApi(
      `/mda-report/metrics?type=${type}${query}`,
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

export const useGetUserActivity = (mode?: string | null) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iUserActivityResponse>({
    corporations: 0,
    individuals: 0,
    newSignUps: 0,
    nsCorporations: 0,
    nsIndividual: 0,
    taxpayers: 0,
  });
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getActivity = async () => {
    if (loading) return;

    setLoading(true);
    let query = "";
    if (mode !== undefined && mode !== null) {
      query = `?isFormal=${
        mode === "formal" ? "true" : mode === "informal" ? "false" : ""
      }`;
    }
    const { data, status } = await requestApi(
      `/mda-report/user-activity${query}`,
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
      getActivity();
    }
  }, [token]);

  return {
    loading,
    success,
    getActivity,
    data,
  };
};

export const useGetTransactionChannelsPieData = (mode?: string | null) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iTransactionChannelChartDataResponse[]>([]);
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getPieChannelsData = async (type: string) => {
    if (loading) return;

    setLoading(true);
    let query = "";
    if (mode !== undefined && mode !== null) {
      query = `&isFormal=${
        mode === "formal" ? "true" : mode === "informal" ? "false" : ""
      }`;
    }

    const { data, status } = await requestApi(
      `/mda-report/getChannelMetrics?type=${type}${query}`,
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

export const useGetTransactionStatusPieData = (mode?: string | null) => {
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
    let query = "";
    if (mode !== undefined && mode !== null) {
      query = `&isFormal=${
        mode === "formal" ? "true" : mode === "informal" ? "false" : ""
      }`;
    }

    const { data, status } = await requestApi(
      `/notifications/status/pie?type=${type}${query}`,
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

export const useGetTransactionRevenuePieData = (mode?: string | null) => {
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
    let query = "";
    if (mode !== undefined && mode !== null) {
      query = `&isFormal=${
        mode === "formal" ? "true" : mode === "informal" ? "false" : ""
      }`;
    }

    const { data, status } = await requestApi(
      `/notifications/total-revenue/pie?type=${type}${query}`,
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

export const useInformalRemittanceSummary = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<iRemittanceSummaryResponse>({
    collectedCount: 0,
    generatedCount: 0,
    pendingCount: 0,
    totalCollectedAmount: 0,
    totalGeneratedAmount: 0,
    totalComission: 0,
    totalPendingAmount: 0,
  });
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getRemittanceSummary = async (start: string, end: string) => {
    if (loading) return;

    setLoading(true);
    const { data, status } = await requestApi(
      `/mda-report/remittance/summary?fromDate=${start}&toDate=${end}&isFormal=false`,
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
      console.log(data[0]);
      // setData(data[0]);
    }
  };

  useEffect(() => {
    if (token) {
      const currentDate = getDateRange("Today");
      getRemittanceSummary(currentDate[0], currentDate[0]);
    }
  }, [token]);

  return {
    loading,
    getRemittanceSummary,
    data,
  };
};

export const useInformalRemittance = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<iRemittance[]>([]);
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getRemittance = async (start: string, end: string) => {
    if (loading) return;

    setLoading(true);
    const { data, status } = await requestApi(
      `/mda-report/remittance/states?fromDate=${start}&toDate=${end}`,
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
      const currentDate = getDateRange("Today");
      getRemittance(currentDate[0], currentDate[0]);
    }
  }, [token]);

  return {
    loading,
    getRemittance,
    data,
  };
};
