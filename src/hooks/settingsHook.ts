import { useAxios } from "@/api/base";
import { useToken } from "@/providers/AuthProvider";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export interface iNotificationSettings {
  email: boolean;
  sms: boolean;
  security: boolean;
  updates: boolean;
  maintenance: boolean;
  pushNotification: boolean;
}

export interface iChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export const useGetNotificationSettings = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<iNotificationSettings>({
    email: false,
    sms: false,
    security: false,
    updates: false,
    maintenance: false,
    pushNotification: false,
  });
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let getNotificationSettings = async () => {
    if (loading) return;
    setLoading(true);

    const { data, status } = await requestApi(
      `/auth/notification/get`,
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
      getNotificationSettings();
    }
  }, [token]);

  return {
    loading,
    data,
    success,
    getNotificationSettings,
  };
};

export const useUpdateNotificationSettings = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let updateNotificationSettings = async (payload: iNotificationSettings) => {
    if (loading) return;
    setLoading(true);

    const { data, status } = await requestApi(
      `/auth/notification/update`,
      "PUT",
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
    }
  };

  return {
    loading,
    success,
    updateNotificationSettings,
  };
};

export const useUpdatePassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();
  const token = useToken().getToken();

  let changePassword = async (payload: iChangePasswordPayload) => {
    if (loading) return;
    setLoading(true);

    const { data, status } = await requestApi(
      `/auth/changepassword`,
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
    }
  };

  return {
    loading,
    success,
    changePassword,
  };
};
