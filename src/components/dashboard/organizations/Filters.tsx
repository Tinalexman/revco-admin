import Dropdown from "@/components/reusable/Dropdown";
import {
  iDateRange,
  allFilters,
  getDateRange,
} from "@/functions/dateFunctions";
import { SearchNormal1 } from "iconsax-react";
import React, { FC, useState } from "react";
import toast from "react-hot-toast";

const Filters: FC<{
  onDatesChanged?: (startDate: string, endDate: string) => void;
  showDatePicker?: boolean;
  onSearch?: (search: string) => void;
}> = ({ onDatesChanged, showDatePicker, onSearch }) => {
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("Today");
  const [dateRange, setDateRange] = useState<iDateRange>({
    start: new Date().toISOString().split("T")[0],
    end: new Date().toISOString().split("T")[0],
  });

  const handleStartDateChange = (dates: Date[] | null) => {
    if (dates) {
      const startDate = new Date(dates[0]);
      const endDate = new Date(dateRange.end);

      if (startDate > endDate) {
        toast.error("Start date cannot be after the end date");
        return;
      }

      if (onDatesChanged) {
        onDatesChanged(startDate.toISOString().split("T")[0], dateRange.end);
      }

      setDateRange({
        ...dateRange,
        start: startDate.toISOString().split("T")[0],
      });
    }
  };

  const handleEndDateChange = (dates: Date[] | null) => {
    if (dates) {
      const endDate = new Date(dates[0]);
      const startDate = new Date(dateRange.start);

      if (endDate < startDate) {
        toast.error("End date cannot be before the start date");
        return;
      }

      if (onDatesChanged) {
        onDatesChanged(dateRange.start, endDate.toISOString().split("T")[0]);
      }

      setDateRange({
        ...dateRange,
        end: endDate.toISOString().split("T")[0],
      });
    }
  };

  return (
    <div className="w-fit gap-2.5 flex items-center">
      <div className="w-44 h-10 relative">
        <input
          type="text"
          value={search}
          placeholder="Search"
          className="w-full h-full rounded outline-none focus:ring-1 focus:ring-purple-300 placeholder:text-[#10101266] border text-[0.815rem] leading-[0.975rem] border-gray-4 pl-4 pr-8 text-[#16192C] bg-white focus:outline-none "
          onChange={(e) => {
            const res = e.target.value.trim();
            setSearch(res);
            onSearch?.(res);
          }}
        />

        <SearchNormal1
          className="absolute top-1/2 -translate-y-1/2 right-2"
          size="16"
          color="#292D32"
        />
      </div>
      {showDatePicker && showDatePicker && (
        <div className="w-[120px] h-10">
          <Dropdown
            menus={allFilters.map((v, i) => ({
              name: v,
              onClick: () => {
                setFilter(v);
                const dateRange = getDateRange(v);
                onDatesChanged?.(dateRange[0], dateRange[1]);
              },
            }))}
            hint="Select"
            value={filter}
          />
        </div>
      )}
    </div>
  );
};

export default Filters;
