import { useAxios } from "@/api/base";
import {
  ROLE_ADMIN,
  ROLE_PROJECT_REPORT,
  ROLE_SUB_ADMIN_1,
  ROLE_SUB_ADMIN_2,
  ROLE_SUB_ADMIN_3,
  ROLE_TAX_CLEARANCE,
} from "@/functions/navigationFunctions";
import { useToken } from "@/providers/AuthProvider";
import { useRevcoUserStore } from "@/stores/userStore";
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

export interface iGroup {
  id: number;
  groupType: string;
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

export const useGetMDAOffices = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  let getMDAOffices = async (mdaId: number) => {
    if (loading) return;
    setLoading(true);

    const { data, status } = await requestApi(
      `/mda/mdaoffices?mda_id=${mdaId}&per_page=50`,
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
    getMDAOffices,
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

export const useGetAllUserRoles = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<string[]>([]);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();
  const role = useRevcoUserStore((state) => state.role);

  let getUserRoles = async () => {
    if (loading) return;
    setLoading(true);

    const { data, status } = await requestApi(`/auth/roles`, "GET", {});

    setLoading(false);
    setSuccess(status);

    if (!status) {
      toast.error("An error occurred. Please try again");
    } else {
      let roles: string[] = data.filter((dt: string) => {
        return (
          dt !== ROLE_ADMIN &&
          dt !== ROLE_SUB_ADMIN_1 &&
          dt !== ROLE_SUB_ADMIN_2 &&
          dt !== ROLE_SUB_ADMIN_3 &&
          dt !== ROLE_PROJECT_REPORT &&
          dt !== ROLE_TAX_CLEARANCE
        );
      });

      if (role === ROLE_ADMIN) {
        roles.push(
          ROLE_SUB_ADMIN_1,
          ROLE_SUB_ADMIN_2,
          ROLE_SUB_ADMIN_3,
          ROLE_PROJECT_REPORT,
          ROLE_TAX_CLEARANCE
        );
      } else if (role == ROLE_SUB_ADMIN_1) {
        roles.push(ROLE_SUB_ADMIN_2, ROLE_SUB_ADMIN_3, ROLE_TAX_CLEARANCE);
      } else if (role === ROLE_SUB_ADMIN_2) {
        roles.push(ROLE_SUB_ADMIN_3);
      }

      setData(roles);
    }
  };

  useEffect(() => {
    getUserRoles();
  }, []);

  return {
    loading,
    data,
    success,
  };
};

export const useGetOrganizationGroups = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<iGroup[]>([]);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getGroups = async () => {
    if (loading) return;
    setLoading(true);

    const { data, status } = await requestApi(
      `/mda/service/groups`,
      "GET",
      {},
      {
        Authorization: `Bearer ${token}`,
      }
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
    getGroups();
  }, []);

  return {
    loading,
    data,
    success,
  };
};

export const useGetOrganizationServiceTypes = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<string[]>([]);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getServiceTypes = async () => {
    if (loading) return;
    setLoading(true);

    const { data, status } = await requestApi(
      `/mda/service/types`,
      "GET",
      {},
      {
        Authorization: `Bearer ${token}`,
      }
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
    getServiceTypes();
  }, []);

  return {
    loading,
    data,
    success,
  };
};
