"use client";

import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import { useRevcoUserStore } from "@/stores/userStore";
import { canViewTargetPage } from "@/functions/navigationFunctions";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathName = usePathname();
  const role = useRevcoUserStore((state) => state.role);

  useEffect(() => {
    if (role) {
      const split = pathName.split("/");
      const adjustedPathName = `/${split.slice(2).join("/")}`;
      if (!canViewTargetPage(role, adjustedPathName)) {
        toast.error("You do not have permissions to view this page");
        router.back();
      }
    }
  }, [role, router]);

  return <>{children}</>;
}
