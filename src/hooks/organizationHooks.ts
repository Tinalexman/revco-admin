import { useAxios } from "@/api/base";
import { getDateRange } from "@/functions/dateFunctions";
import { useToken } from "@/providers/AuthProvider";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export interface iDetail {
  name: string;
  active: number;
  inactive: number;
  count: number;
}

export interface iOrganizationResponse {
  name: string;
  id: number;
  createdDate: string;
  mdaCode: string;
  abbreviation: string;
  active: boolean;
  businessId: number;
  category: string;
}

export interface iOrganization {
  data: iOrganizationResponse[];
  count: number;
}

export interface iOrganizationBranch {
  id: number;
  name: string;
  officeCode: string;
  isHq: boolean;
}

export interface iOrganizationBranchResponse {
  data: iOrganizationBranch[];
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

export interface iOrganizationTransactionHistoryResponse {
  id: number;
  totalAmount: string;
  mdaId: number;
  businessId: number;
  number: string;
  type: string;
  createdDate: string;
  transaction: any;
  paid: boolean;
}

export interface iOrganizationTransactionHistory {
  data: iOrganizationTransactionHistoryResponse[];
  totalItems: number;
}

export interface iOrganizationTypeOverviewResponse {
  TotalInvoicePaid: number;
  TotalInvoiceGenerated: number;
  TotalInvoiceUnpaid: number;
}

export interface iCreateOrganizationPayload {
  businessId: number;
  name: string;
  abbreviation: string;
  mdaCode: string;
  isRetaining: false;
  isRetainingByPercentage: false;
  retainingValue: number;
  businessServiceType: string;
  groupType: string;
}

export interface iCreateOrganizationBranchPayload {
  mdaId: number;
  name: string;
  officeCode: string;
  isHq: boolean;
}

export interface iEditOrganizationBranchPayload {
  id: number;
  name: string;
  officeCode: string;
  isHq: boolean;
}

export const useGetOrganizations = (category?: string) => {
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

    let query = `/mda-report/mda/mdas?&pageNo=${pageNo}&pageSize=50`;
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

export const useCreateOrganization = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let createOrganization = async (payload: iCreateOrganizationPayload) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(`/mda/addmda`, "POST", payload, {
      Authorization: `Bearer ${token}`,
    });

    setLoading(false);
    setSuccess(status);

    if (!status) {
      toast.error(
        data?.response?.data?.data ?? "An error occurred. Please try again"
      );
    } else {
      toast.success("Organization Created Successfully");
    }
  };

  return {
    loading,
    success,
    createOrganization,
  };
};

export const useCreateOrganizationBranch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let createBranch = async (payload: iCreateOrganizationBranchPayload) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/mda/addmdaoffice`,
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
      toast.success("Organization Branch Created Successfully");
    }
  };

  return {
    loading,
    success,
    createBranch,
  };
};

export const useEditOrganizationBranch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let editBranch = async (payload: iEditOrganizationBranchPayload) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/mda/update_mdaoffice`,
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
      toast.success("Organization Branch Updated Successfully");
    }
  };

  return {
    loading,
    success,
    editBranch,
  };
};

export const useGetOrganizationsOverview = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iDetail[]>(
    Array(4).fill({
      name: "",
      active: 0,
      inactive: 0,
      count: 0,
    })
  );
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getOrganizationsOverview = async () => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/mda/summary`,
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
      const totalDetail: iDetail = {
        name: "Total",
        active: data.TOTAL.active,
        inactive: data.TOTAL.inactive,
        count: data.TOTAL.count,
      };

      const bankDetail: iDetail = {
        name: "Banks",
        active: data.BANKS.active,
        inactive: data.BANKS.inactive,
        count: data.BANKS.count,
      };

      const ministryDetail: iDetail = {
        name: "Ministries",
        active: data.MINISTRY.active,
        inactive: data.MINISTRY.inactive,
        count: data.MINISTRY.count,
      };

      const otherDetail: iDetail = {
        name: "Others",
        active: data.OTHERS.active,
        inactive: data.OTHERS.inactive,
        count: data.OTHERS.count,
      };

      setData([totalDetail, bankDetail, ministryDetail, otherDetail]);
    }
  };

  useEffect(() => {
    if (token) {
      getOrganizationsOverview();
    }
  }, [token]);

  return {
    loading,
    success,
    getOrganizationsOverview,
    data,
  };
};

export const useGetOrganizationUsers = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iOrganizationUser>({
    data: [],
    count: 0,
  });
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getUsers = async (mdaId: string | number, pageNo: string) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/mda/mdas/user?mdaId=${mdaId}&pageNo=${pageNo}&pageSize=50`,
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

  return {
    loading,
    success,
    getUsers,
    data,
  };
};

export const useGetOrganizationTypeOverview = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iOrganizationTypeOverviewResponse>({
    TotalInvoiceGenerated: 0,
    TotalInvoicePaid: 0,
    TotalInvoiceUnpaid: 0,
  });
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getOverview = async (category?: string, mdaId?: string) => {
    if (loading) return;

    setLoading(true);

    let query = `/mda-report/mda/transaction/summary?`;
    if (category) {
      query += `category=${category}`;
    }

    if (mdaId) {
      query += `mdaId=${mdaId}`;
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

  return {
    loading,
    success,
    getOverview,
    data,
  };
};

export const useGetOrganizationTransactionHistory = (
  mdaId: string | number
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iOrganizationTransactionHistory>({
    data: [],
    totalItems: 0,
  });
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getHistory = async (fromDate: string, toDate: string, pageNo: string) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/mda/transactions?mdaId=${mdaId}&pageNo=${pageNo}&pageSize=50&from=${fromDate}&to=${toDate}`,
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
      getHistory(currentDate[0], currentDate[0], "1");
    }
  }, [token]);

  return {
    loading,
    success,
    getHistory,
    data,
  };
};

export const useSearchOrganization = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iOrganization>({
    count: 0,
    data: [],
  });
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let searchOrganization = async (search: string, pageNo: string) => {
    setLoading(true);

    const { data, status } = await requestApi(
      `/mda-report/mda/search?search=${search}&pageNumber=${pageNo}&pageSize=50`,
      "GET",
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );

    setLoading(false);
    setSuccess(status);

    if (status) {
      setData({
        count: 0,
        data,
      });
    }

    if (!status) {
      toast.error(
        data?.response?.data?.data ?? "An error occurred. Please try again"
      );
    }
  };

  return {
    loading,
    success,
    searchOrganization,
    data,
  };
};

export const useGetOrganizationBranches = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<iOrganizationBranchResponse>({
    data: [],
    count: 0,
  });
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getBranches = async (mdaId: string | number, pageNo: string | number) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      `/mda/mdaoffices?mda_id=${mdaId}&page=${pageNo}&per_page=50`,
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
        data: data.data.data,
        count: data.data.total,
      });
    }
  };

  return {
    loading,
    success,
    getBranches,
    data,
  };
};
