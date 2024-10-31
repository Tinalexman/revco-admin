import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SearchNormal1, Calendar } from "iconsax-react";
import React, { useState, FC } from "react";
import {
  allFilters,
  convertDateWithDayAndMonth,
  getDateRange,
  iDateRange,
} from "@/functions/dateFunctions";
import toast from "react-hot-toast";
import Dropdown from "@/components/reusable/Dropdown";

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
          className="w-full h-full rounded border text-[0.815rem] leading-[0.975rem] border-gray-4 pl-14 pr-8 text-[#16192C] bg-white focus:outline-none "
          onChange={(e) => {
            setSearch(e.target.value);
            onSearch?.(e.target.value);
          }}
        />
        <p className="absolute text-[#10101266] text-[0.815rem] leading-[0.975rem] top-1/2 left-2 -translate-y-1/2">
          Search
        </p>
        <SearchNormal1
          className="absolute top-1/2 -translate-y-1/2 right-2"
          size="16"
          color="#292D32"
        />
      </div>
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
      {showDatePicker && showDatePicker && (
        <div className="max-w-[17rem] w-fit h-10 flex gap-2 items-center rounded border border-gray-4 px-2">
          <p className=" text-[#10101266] text-[0.815rem] leading-[0.975rem]">
            From:
          </p>
          <DatePicker
            selected={new Date(dateRange.start)}
            onChange={handleStartDateChange}
            selectsMultiple={true}
            dateFormat="MMMM d, yyyy"
            customInput={
              <div className="flex items-center justify-start w-full h-full cursor-pointer text-[0.815rem] leading-[0.975rem]">
                <span className="text-[#16192C] font-medium">
                  {convertDateWithDayAndMonth(dateRange.start)}
                </span>
                <Calendar className="ml-1" size="16" color="#16192C" />
              </div>
            }
          />
          <div className="w-[1px] h-[60%] bg-gray-3" />
          <p className=" text-[#10101266] text-[0.815rem] leading-[0.975rem]">
            To:
          </p>
          <DatePicker
            selected={new Date(dateRange.end)}
            onChange={handleEndDateChange}
            selectsMultiple={true}
            dateFormat="MMMM d, yyyy"
            customInput={
              <div className="flex items-center justify-start w-full h-full cursor-pointer text-[0.815rem] leading-[0.975rem]">
                <span className="text-[#16192C] font-medium">
                  {convertDateWithDayAndMonth(dateRange.end)}
                </span>
                <Calendar className="ml-1" size="16" color="#16192C" />
              </div>
            }
          />
        </div>
      )}
    </div>
  );
};

export default Filters;
