import { iDateRange } from "@/functions/dateFunctions";
import { create } from "zustand";

export type tInformalSector = {
  range: iDateRange;
};

export const useInformalSector = create<tInformalSector>((set) => ({
  range: {
    start: new Date().toISOString().split("T")[0],
    end: new Date().toISOString().split("T")[0],
  },
}));
