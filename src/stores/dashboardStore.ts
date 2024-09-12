import { create } from "zustand";

export type tDashboardNavigationData = {
  expanded: boolean;
  searchFilter: string;
  shouldRefresh: boolean;
  refresh: () => void;
};

export const useDashboardData = create<tDashboardNavigationData>(
  (set, get) => ({
    expanded: true,
    searchFilter: "",
    shouldRefresh: false,
    refresh: () => {
      set({ shouldRefresh: !get().shouldRefresh });
    },
  })
);
