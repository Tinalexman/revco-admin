import { useAxios } from "@/api/base";
import { getDateRange } from "@/functions/dateFunctions";
import { useToken } from "@/providers/AuthProvider";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import axios from "axios";

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
  generatedDate: string;
  channel: any;
  type: string;
  phoneNumber: string;
  paid: boolean;
}

export interface iPaymentChannel {
  total: number;
  channel: string;
  percentage: string;
}

export interface iRecentInvoice {
  data: iRecentInvoiceData[];
  count: number;
}
export interface iRecentInvoiceData {
  invoiceNumber: string;
  payer: string;
  mdaName: string;
  mdaId: number;
  invoiceAmount: number;
  serviceCode: string;
  mdaService: string;
  email: string;
  tin: string;
  paid: boolean;
}

export interface iGenerateIndividualInvoice {
  enumerate: {
    title: string;
    dateOfBirth: string;
    maritalStatus: string;
    nationality: string;
    residenceLga: number;
    residenceState: number;
    residentialAddress: string;
    occupation: string;
    officeAddress: string;
    employerName: string;
    temporaryTin: string;
    jtbTin: string;
    nin: string;
    customer: {
      firstName: string;
      lastName: string;
      phone: string;
      email: string;
      role: string;
    };
  };
  invoice: {
    invoiceAmount: number;
    isAssessment: boolean;
    assessmentId: number;
    serviceId: number;
    businessId: number;
    mdaId: number;
    Month: number;
    year: string;
    userId: number;
    month: number;
    assessment: boolean;
  };
  projectId: number;
}

export interface iGenerateNonIndividualInvoice {
  enumerate: {
    cacRegNo: string;
    companyName: string;
    companyAddress: string;
    city: string;
    lgaId: number;
    phoneNumber1: string;
    phoneNumber2: string;
    email: string;
    nin: string;
    website: string;
    temporaryTin: string;
    jtbTin: string;
    companyRegistrationDate: string;
    companyCommencementDate: string;
    businessType: string;
    customer: {
      firstName: string;
      lastName: string;
      phone: string;
      email: string;
      role: string;
    };
  };
  invoice: {
    invoiceAmount: number;
    isAssessment: boolean;
    assessmentId: number;
    serviceId: number;
    businessId: number;
    mdaId: number;
    Month: number;
    year: string;
    userId: number;
    month: number;
    assessment: boolean;
  };
  projectId: number;
}

export interface iGenerateInvoiceResponse {
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

export const useGetPaymentChannels = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iPaymentChannel[]>([]);
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getChannels = async () => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/getChannelMetrics`,
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
      getChannels();
    }
  }, [token]);

  return {
    loading,
    success,
    getChannels,
    data,
  };
};

export const useGetRecentInvoices = (category?: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iRecentInvoice>({
    data: [],
    count: 0,
  });
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getInvoices = async (
    fromDate: string,
    endDate: string,
    pageNo: string
  ) => {
    if (loading) return;

    setLoading(true);

    let query = `/mda-report/generated-invoices?from=${fromDate}&to=${endDate}&pageNumber=${pageNo}&pageSize=50`;
    if (category) {
      query += `&category=${category}`;
    }

    const { data, status } = await requestApi(
      query,
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
      getInvoices(currentDate[0], currentDate[0], "1");
    }
  }, [token]);

  return {
    loading,
    success,
    getInvoices,
    data,
  };
};

export const useDownloadGeneratedInvoices = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const token = useToken().getToken();

  let downloadReport = async (
    pageNumber: string | number,
    from: string,
    end: string
  ) => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axios.get(
        `https://core.revco.ng:9000/mda-report/generated-invoices/resource?pageNumber=${pageNumber}&pageSize=50&from=${from}&to=${end}`,
        {
          responseType: "arraybuffer",
          headers: {
            "Content-Type": "application/pdf",
            Accept: "application/pdf",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoading(false);
      setSuccess(true);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Generated Invoices ${from} to ${end}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (e) {
      toast.error("An error occurred while downloading the report");
      setLoading(false);
      setSuccess(false);
    }
  };

  return {
    loading,
    success,
    downloadReport,
  };
};

export const useGenerateIndividualInvoice = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iGenerateInvoiceResponse | null>(null);
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let generate = async (payload: iGenerateIndividualInvoice) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/self-service/generate-invoice/individual`,
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
      toast.success("Invoice generated");
      setData(data.data);
    }
  };

  return {
    loading,
    success,
    data,
    generate,
  };
};

export const useGenerateNonIndividualInvoice = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iGenerateInvoiceResponse | null>(null);
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let generate = async (payload: iGenerateNonIndividualInvoice) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/self-service/generate-invoice/nonindividual`,
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
      toast.success("Invoice generated");
      setData(data.data);
    }
  };

  return {
    loading,
    success,
    generate,
    data,
  };
};

export const useGetRecentTransactionActivity = (mode?: string | null) => {
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
