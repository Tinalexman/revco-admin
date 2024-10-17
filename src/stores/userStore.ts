import { create } from "zustand";
import { persist } from "zustand/middleware";

export type tRevcoUser = {
  firstName: string;
  lastName: string;
  otherNames: any;
  email: string;
  phone: string;
  createdDate: string;
  lastUpdatedDate: string;
  role: "Admin" | "Sub-Admin1" | "Sub-Admin2" | "Sub-Admin3" | "Agent" | "";
  lastLoginDate: string;
  token: string;
  mda: any;
  project: string;
  projectPaymentChannels: any;
  isDefaultPass: boolean;
  isEnumerated: boolean;
  isRemittanceLogin: boolean;
  clear: () => void;
};

export const useRevcoUserStore = create<tRevcoUser>()(
  persist(
    (set, get) => ({
      firstName: "",
      lastName: "",
      otherNames: null,
      email: "",
      phone: "",
      createdDate: "",
      lastUpdatedDate: "",
      role: "",
      lastLoginDate: "",
      token: "",
      mda: null,
      project: "",
      projectPaymentChannels: null,
      isDefaultPass: false,
      isEnumerated: false,
      isRemittanceLogin: false,
      clear: () =>
        set({
          firstName: "",
          lastName: "",
          otherNames: null,
          email: "",
          phone: "",
          createdDate: "",
          lastUpdatedDate: "",
          role: "",
          lastLoginDate: "",
          token: "",
          mda: null,
          project: "",
          projectPaymentChannels: null,
          isDefaultPass: false,
          isEnumerated: false,
          isRemittanceLogin: false,
        }),
    }),
    {
      name: "rvc-ad",
    }
  )
);
