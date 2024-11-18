import { useAxios } from "@/api/base";
import { useToken } from "@/providers/AuthProvider";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import axios from "axios";

export interface iReport {
  id: number;
  reportName: string;
  generatedDate: string;
  reportCreator: string;
  userId: number;
  from: string;
  to: string;
  reportType: string;
}

export interface iCreateReportPayload {
  from: string;
  to: string;
  reportTypes: string;
  reportName: string;
}

export const useGetAllReports = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<iReport[]>([]);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getReports = async () => {
    if (loading) return;
    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/get/reports`,
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
      getReports();
    }
  }, [token]);

  return {
    loading,
    data,
    success,
    getReports,
  };
};

export const useGetReportTypes = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<string[]>([]);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getTypes = async () => {
    if (loading) return;
    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/get/report-types`,
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
      getTypes();
    }
  }, [token]);

  return {
    loading,
    data,
    success,
    getTypes,
  };
};

export const useCreateReport = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let createReport = async (payload: iCreateReportPayload) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/create/report`,
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
      toast.success("New Report Created");
    }
  };

  return {
    loading,
    success,
    createReport,
  };
};

export const useDeleteReport = (reportId: string | number) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let deleteReport = async () => {
    if (loading) return;
    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/delete/report/${reportId}`,
      "DELETE",
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
    }
  };

  return {
    loading,
    success,
    deleteReport,
  };
};

export const useDownloadReport = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const token = useToken().getToken();

  let downloadReport = async (
    reportType: string,
    reportRange: string,
    reportId: string | number
  ) => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axios.get(
        `https://core.revco.ng:9000/mda-report/get/get-report?id=${reportId}&type=PDF`,
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
      link.setAttribute("download", `${reportType} ${reportRange}.pdf`);
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
