import toast from "react-hot-toast";

import { useState, useEffect } from "react";
import { useAxios } from "@/api/base";

export interface iLoginPayload {
  username: string;
  password: string;
}

export interface iResetPayload {
  resetCode: string;
  password: string;
}

export interface iCreateUserPayload {}

export const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<any>({});
  const { requestApi } = useAxios();

  let login = async (payload: iLoginPayload) => {
    if (loading) return;

    setLoading(true);

    const { data, status } = await requestApi("/auth/login", "POST", payload);

    setData(data);
    setLoading(false);
    setSuccess(status);

    if (status) {
      toast.success("Wlelcome back");
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

    setData(data);
    setLoading(false);
    setSuccess(status);

    if (status) {
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

    const { data, status } = await requestApi("/auth/forgotpassword", "POST", {
      email,
    });

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
      "/auth/resetpassword",
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
