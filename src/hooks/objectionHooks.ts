import { useAxios } from "@/api/base";
import { useToken } from "@/providers/AuthProvider";
import { count } from "console";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export interface iObjectionSummary {
  "total-amount-of-assessment": number;
  "total-objections": number;
  "rejected-objections": number;
  "pending-objections": number;
  "approved-objections": number;
}

export interface iObjectionSummaryResponse {
  count: number;
  data: iObjectionSummary;
}

export interface iObjectionAssessment {
  id: number;
  payerFirstName: string;
  payerLastName: string;
  invoiceNumber: string;
  payerTin: any;
  isSettled: boolean;
  taxType: any;
  taxYear: string;
  taxMonth: string;
  grossIncomeAmount: number;
  taxAmount: number;
  isObjected: boolean;
  assessmentOfficerRecommendation: string;
  recommendationDate: any;
  recommendedAmount: number;
  assesedService: string;
  assesedServiceCode: string;
  assessedBy: string;
  mdaId: number;
  balance: number;
  amountPaid: number;
  objectionReason: any;
  objectionAuthorizedBy: any;
  mdaName: string;
  mdaOffice: any;
  hasInvoice: number;
  settled: boolean;
  objected: boolean;
}

export interface iObjectionAssessmentResponse {
  count: number;
  data: iObjectionAssessment[];
}

export const useGetObjectionSummary = (fromObjections: boolean) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iObjectionSummaryResponse>({
    count: 0,
    data: {
      "total-amount-of-assessment": 0,
      "total-objections": 0,
      "rejected-objections": 0,
      "pending-objections": 0,
      "approved-objections": 0,
    },
  });
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getObjectionSummary = async (start: string, end: string) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/assessment/summary?fromDate=${start}&toDate=${end}${
        !fromObjections ? "&isFormal=false" : ""
      }`,
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
      getObjectionSummary(currentDate, currentDate);
    }
  }, [token]);

  return {
    loading,
    success,
    getObjectionSummary,
    data,
  };
};

export const useGetObjections = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iObjectionAssessmentResponse>({
    data: [],
    count: 0,
  });
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getObjections = async (
    start: string,
    end: string,
    pageNo: string | number
  ) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/assessments?pageNo=${pageNo}&pageSize=50&fromDate=${start}&toDate=${end}`,
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
      setData({
        count: data.count,
        data: data.data.assessments,
      });
    }
  };

  useEffect(() => {
    if (token) {
      const currentDate = new Date().toISOString().split("T")[0];
      getObjections(currentDate, currentDate, "1");
    }
  }, [token]);

  return {
    loading,
    success,
    getObjections,
    data,
  };
};
