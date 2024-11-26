import toast from "react-hot-toast";

import { useState } from "react";
import { useAxios } from "@/api/base";
import { useRevcoUserStore } from "@/stores/userStore";
import { useToken } from "@/providers/AuthProvider";

export interface iLoginPayload {
  username: string;
  password: string;
}

export interface iResetPayload {
  resetCode: string;
  confirmPassword: string;
  password: string;
}

export interface iChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface iLoginResponse {
  firstName: string;
  lastName: string;
  otherNames: any;
  email: string;
  phone: string;
  createdDate: string;
  lastUpdatedDate: string;
  role: "Admin" | "Sub-Admin1" | "Sub-Admin2" | "Sub-Admin3" | "Agent";
  lastLoginDate: string;
  token: string;
  mda: any;
  project: string;
  projectPaymentChannels: any;
  isDefaultPass: boolean;
  isEnumerated: boolean;
  isRemittanceLogin: boolean;
}

export const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<string>("");
  const { requestApi } = useAxios();
  const { setToken } = useToken();

  let login = async (payload: iLoginPayload) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi("/auth/login", "POST", payload);

    setLoading(false);
    setSuccess(status);

    if (status) {
      setData(data.data.role);
      setToken(data.data.token);
      useRevcoUserStore.setState({ ...data.data });
      toast.success(`Welcome back, ${data.data.lastName}`);
    } else {
      toast.error(
        data?.response?.data?.data ?? "An error occurred. Please try again"
      );
    }
  };

  return {
    loading,
    success,
    login,
    data,
  };
};

export const useRegister = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<any>({});
  const { requestApi } = useAxios();

  let login = async (payload: iLoginPayload) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      "/auth/createuser",
      "POST",
      payload
    );

    setLoading(false);
    setSuccess(status);

    if (status) {
      setData(data);
      toast.success("User created");
    } else {
      toast.error(
        data?.response?.data?.data ?? "An error occurred. Please try again"
      );
    }
  };

  return {
    loading,
    success,
    login,
    data,
  };
};

export const useForgotPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  let forgot = async (email: string) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      "/auth/forgotpassword/v2",
      "POST",
      {
        email,
      }
    );

    setLoading(false);
    setSuccess(status);

    if (status) {
      toast.success("A reset link has been sent to your mail");
    } else {
      toast.error(
        data?.response?.data?.data ?? "An error occurred. Please try again"
      );
    }
  };

  return {
    loading,
    success,
    forgot,
  };
};

export const useResetPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  let reset = async (payload: iResetPayload) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      "/auth/resetpassword/v2",
      "POST",
      payload
    );

    setLoading(false);
    setSuccess(status);

    if (status) {
      toast.success("Your password has been reset successfully");
    } else {
      toast.error(
        data?.response?.data?.data ?? "An error occurred. Please try again"
      );
    }
  };

  return {
    loading,
    success,
    reset,
  };
};

export const useChangePassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { requestApi } = useAxios();

  let change = async (payload: iChangePasswordPayload) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi(
      "/auth/changepassword",
      "POST",
      payload
    );

    setLoading(false);
    setSuccess(status);

    if (status) {
      toast.success("Your password has been changed successfully");
    } else {
      toast.error(
        data?.response?.data?.data ?? "An error occurred. Please try again"
      );
    }
  };

  return {
    loading,
    success,
    change,
  };
};
