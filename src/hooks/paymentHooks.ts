import { useAxios } from "@/api/base";
import { getDateRange } from "@/functions/dateFunctions";
import { useToken } from "@/providers/AuthProvider";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export interface iPaymentChannel {
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

export const useDownloadMDAReports = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let downloadReport = async (
    pageNumber: string | number,
    from: string,
    end: string
  ) => {
    if (loading) return;
    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/generated-invoices/resource?pageNumber=${pageNumber}&pageSize=50&from=${from}&to=${end}`,
      "GET",
      {},
      {
        Authorization: `Bearer ${token}`,
        ResponseType: "arraybuffer",
        ContentType: "application/pdf",
      }
    );

    setLoading(false);
    setSuccess(status);

    if (!status) {
      toast.error(
        data?.response?.data?.data ?? "An error occurred. Please try again"
      );
    } else {
      const url = window.URL.createObjectURL(
        new Blob([data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "invoices.pdf");

      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url);
      link.remove();
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
