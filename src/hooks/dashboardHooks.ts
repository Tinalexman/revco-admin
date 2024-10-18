import { useAxios } from "@/api/base";
import { useRevcoUserStore } from "@/stores/userStore";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export interface iRecentActivityResponse {
  invoiceNo: string;
  invoiceAmount: number;
  assesedService: string;
  paymentChannel: any;
  businessId: number;
  business: any;
  serviceId: number;
  mda: string;
  month: number;
  year: string;
  customerId: number;
  payerFirstName: any;
  payerLastName: any;
  tinType: any;
  payerId: string | null;
  payerTin: string | null;
  payer: any;
  payerEmail: string;
  payerPhone: string;
  payerType: any;
  paid: boolean;
}

export interface iTransactionSummaryChartDataResponse {
  channel: string;
  count: number;
  income: number;
  remitted: number;
  totalRev: number;
}

export const useGetRecentActivity = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iRecentActivityResponse[]>([]);
  const { requestApi } = useAxios();
  const token = useRevcoUserStore((state) => state.token);

  let getActivity = async (startDate: string, endDate: string) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/enroll/list-invoices?sortBy=id&pageNo=1&pageSize=1000&formStartDate=${startDate}&formEndDate=${endDate}&search=%20`,
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
      const currentDate = new Date();
      getActivity(currentDate.toISOString(), currentDate.toISOString());
    }
  }, [token]);

  return {
    loading,
    success,
    getActivity,
    data,
  };
};

export const useGetTransactionSummary = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iRecentActivityResponse[]>([]);
  const { requestApi } = useAxios();
  const token = useRevcoUserStore((state) => state.token);

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

export const useGetTwelveMonthTransactionSummary = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iRecentActivityResponse[]>([]);
  const { requestApi } = useAxios();
  const token = useRevcoUserStore((state) => state.token);

  let getSummary = async (
    projectId: string | number,
    mdaId: string | number
  ) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/twelve-months-summary?formProjectId=${projectId}&formMdaId=&${mdaId}`,
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
      getSummary(1, "");
    }
  }, [token]);

  return {
    loading,
    success,
    getSummary,
    data,
  };
};

export const useGetTransactionRemittanceSummary = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iRecentActivityResponse[]>([]);
  const { requestApi } = useAxios();
  const token = useRevcoUserStore((state) => state.token);

  let getSummary = async (agentId: string | number) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/remittance?agentId=${agentId}&isLastMonth=&${false}`,
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
      getSummary(1);
    }
  }, [token]);

  return {
    loading,
    success,
    getSummary,
    data,
  };
};

// export const useGetTransactionSummary = () => {
//   const [loading, setLoading] = useState<boolean>(false);
//   const [success, setSuccess] = useState<boolean>(false);
//   const [data, setData] = useState<iRecentActivityResponse[]>([]);
//   const { requestApi } = useAxios();
//   const token = useRevcoUserStore((state) => state.token);

//   let getSummary = async (
//     projectId: string | number,
//     mdaId: string | number
//   ) => {
//     if (loading) return;

//     setLoading(true);

//     const { data, status } = await requestApi(
//       `/mda-report/transactionsummary-monthly-split?formProjectId=${projectId}&formMdaId=&${mdaId}&isLastMonth=false`,
//       "GET",
//       {},
//       {
//         Authorization: `Bearer ${token}`,
//       }
//     );

//     setData(data.data.data);
//     setLoading(false);
//     setSuccess(status);

//     if (!status) {
//       toast.error(
//         data?.response?.data?.data ?? "An error occurred. Please try again"
//       );
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       getSummary(1, "");
//     }
//   }, [token]);

//   return {
//     loading,
//     success,
//     getSummary,
//     data,
//   };
// };

export const useGetTransactionChannelsPieData = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iTransactionSummaryChartDataResponse[]>([]);
  const { requestApi } = useAxios();
  const token = useRevcoUserStore((state) => state.token);

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
