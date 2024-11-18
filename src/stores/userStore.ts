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
  role: string;
  lastLoginDate: string;
  mda: any;
  project: string;
  projectPaymentChannels: any;
  isDefaultPass: boolean;
  isEnumerated: boolean;
  isRemittanceLogin: boolean;
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
      mda: null,
      project: "",
      projectPaymentChannels: null,
      isDefaultPass: false,
      isEnumerated: false,
      isRemittanceLogin: false,
    }),
    {
      name: "rvc-ad",
    }
  )
);
