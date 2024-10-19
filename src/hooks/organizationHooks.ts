import { useAxios } from "@/api/base";
import { useToken } from "@/providers/AuthProvider";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export interface iOrganizationResponse {
  id: number;
  name: string;
  abbreviation: string;
  mdaCode: string;
  location: any;
  isRetaining: boolean;
  isRetainingByPercentage: boolean;
  retainingValue: number;
  revenueSum: number;
  revenueCount: number;
  projectName: string;
  lga: string;
}

export interface iOrganization {
  data: iOrganizationResponse[];
  count: number;
}

export const useGetOrganizations = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iOrganization>({
    data: [],
    count: 0,
  });
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getOrganizations = async (pageNo: string) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/mda/mdas?sortBy=name&pageNo=${pageNo}&pageSize=10&search=%20`,
      "GET",
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );

    setData({
      data: data.data.data,
      count: data.data.total,
    });
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
      getOrganizations("1");
    }
  }, [token]);

  return {
    loading,
    success,
    getOrganizations,
    data,
  };
};
