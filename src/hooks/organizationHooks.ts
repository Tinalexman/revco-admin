import { useAxios } from "@/api/base";
import { useToken } from "@/providers/AuthProvider";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export interface iOrganizationResponse {
  mdaName: string;
  mdaId: string;
  createdDate: string;
  officeCode: string;
  organizationName: string;
  active: boolean;
  businessId: string;
  category: string;
  officeId: number;
  hq: boolean;
}

export interface iOrganization {
  data: iOrganizationResponse[];
  count: number;
}

export interface iOrganizationUserResponse {
  userId: number;
  name: string;
  mdaId: number;
  mdaOfficeId: number;
  mdaName: string;
  email: string;
  role: string;
  status: boolean;
  mdaOfficeName: string;
  canCollect: boolean;
  collectionLimit: number;
}

export interface iOrganizationUser {
  data: iOrganizationUserResponse[];
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
      `/mda-report/mda/office?&pageNo=${pageNo}&pageSize=10`,
      "GET",
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );

    setData({
      data: data.data,
      count: data.count,
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

export const useGetOrganizationUsers = (officeId: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iOrganizationUser>({
    data: [],
    count: 0,
  });
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getUsers = async (pageNo: string) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/mda/office/user?officeId=${officeId}&pageNo=${pageNo}&pageSize=10`,
      "GET",
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );

    setData({
      data: data.data,
      count: data.count,
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
      getUsers("1");
    }
  }, [token]);

  return {
    loading,
    success,
    getUsers,
    data,
  };
};
