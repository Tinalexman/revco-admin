"use client";
import { useEffect } from "react";

import { jwtDecode } from "jwt-decode";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();

  const determineIndex = () => {
    const current = pathName.split("/")[1];
    return current === "dashboard" ? 1 : -1;
  };

  const page = determineIndex();
  const router = useRouter();

  const { getToken } = useToken();

  useEffect(() => {
    // const token = getToken();
    // if (token === undefined && page !== -1) {
    //   toast.error("Please login to continue");
    //   router.replace("/auth/login");
    // }
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

  return { getToken, setToken, removeToken };
};
