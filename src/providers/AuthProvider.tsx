"use client";
import { useEffect } from "react";

import { jwtDecode } from "jwt-decode";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const router = useRouter();
  const { getToken } = useToken();

  useEffect(() => {
    const token = getToken();
    if (
      token === undefined &&
      pathName !== "/" &&
      !pathName.startsWith("/auth")
    ) {
      toast.error("Please login to continue");
      router.replace("/auth/login");
    }
  }, [router]);

  return <>{children}</>;
}

const tokenKey = "revco-admin-token";

export const useToken = () => {
  const getToken = () => Cookies.get(tokenKey);
  const setToken = (token: string) => {
    const decoded = jwtDecode(token);
    let expiryDate: Date | undefined;
    if (decoded.exp) {
      expiryDate = new Date(decoded?.exp * 1000);
    }

    Cookies.set(tokenKey, token, {
      expires: expiryDate,
      secure: true,
      sameSite: "strict",
    });
  };
  const removeToken = () => {
    Cookies.remove(tokenKey);
  };

  const setOther = (key: string, value: string) => {
    Cookies.set(key, value, {
      secure: true,
      sameSite: "strict",
    });
  };

  const getOther = (key: string) => {
    return Cookies.get(key);
  };

  const removeOther = (key: string) => {
    Cookies.remove(key);
  };

  return { getToken, setToken, removeToken, setOther, getOther, removeOther };
};
