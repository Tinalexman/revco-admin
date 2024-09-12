"use client";

import React, { useEffect } from "react";

// import { isEmptyStaff, useCurrentStaffStore } from "@/src/stores/userStore";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathName = usePathname();
  // const currentStaff = useCurrentStaffStore((state) => state);
  // const viewLog = useCurrentStaffStore((state) => state.permissions.view_log);
  // const createSection = useCurrentStaffStore(
  //   (state) => state.permissions.create_section
  // );
  // const manageInventory = useCurrentStaffStore(
  //   (state) => state.permissions.manage_inventory
  // );
  // const manageStaff = useCurrentStaffStore(
  //   (state) => state.permissions.manage_staff
  // );

  // useEffect(() => {
  //   if (isEmptyStaff(currentStaff)) return;

  //   let home = "";
  //   const currentPath = pathName.split("/")[2];

  //   // CHECK IF USER IS AUTHORIZED TO GO TO THE ROUTE INDICIATED BY CURRENT PATH

  //   if (currentPath === undefined) {
  //     if (createSection && home.length === 0) {
  //       home = "sections";
  //     }

  //     if (manageInventory && home.length === 0) {
  //       home = "inventory";
  //     }

  //     if (manageStaff && home.length === 0) {
  //       home = "staff";
  //     }

  //     if (viewLog && home.length === 0) {
  //       home = "logs";
  //     }
  //   }

  //   if (home === "") {
  //     toast.error("Permissions not assigned by organization owner");
  //   } else {
  //     if (currentPath === undefined) {
  //       router.replace(`/dashboard/${home}`);
  //     }
  //   }
  // }, [currentStaff]);

  return <>{children}</>;
}
