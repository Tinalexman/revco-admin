import { useAxios } from "@/api/base";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export interface iMda {
  abbreviation: string;
  id: number;
  isRetaining: boolean;
  isRetainingByPercentage: boolean;
  lga: string;
  location: string | null;
  mdaCode: string;
  name: string;
  projectName: string;
  retainingValue: number;
  revenueCount: number;
  revenueSum: number;
}

export interface iMdaService {
  amount: number;
  code: string;
  id: number;
  isAssessable: boolean;
  isFixedAmount: boolean;
  isRetaining: boolean;
  isRetainingByPercentage: boolean;
  mdaId: number;
  name: string;
  retainingValue: number;
}

export interface iProjectHead {
  projectId: number;
  projectName: string;
}

export const useGetMDAs = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<iMda[]>([]);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  let getMDA = async (projectId: number) => {
    if (loading) return;
    setLoading(true);

    const { data, status } = await requestApi(
      `/self-service/mdas?sortBy=name&clientId=${projectId}`,
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

  return {
    loading,
    data,
    success,
    getMDA,
  };
};

export const useGetMDAServices = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<iMdaService[]>([]);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  let getRevenueHeads = async (projectId: number, mdaId: number) => {
    if (loading) return;
    setLoading(true);

    const { data, status } = await requestApi(
      `/self-service/mdaservices?sortBy=name&clientId=${projectId}&mdaId=${mdaId}`,
      "GET",
      {}
    );

    console.log(data);

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

  return {
    loading,
    data,
    success,
    getRevenueHeads,
  };
};

export const useGetProjectHeads = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<iProjectHead[]>([]);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  let getProjectHeads = async () => {
    if (loading) return;
    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/project-heads`,
      "GET",
      {}
    );

    setLoading(false);
    setSuccess(status);

    if (!status) {
      toast.error("An error occurred. Please try again");
    } else {
      setData(data);
    }
  };

  useEffect(() => {
    getProjectHeads();
  }, []);

  return {
    loading,
    data,
    success,
  };
};
