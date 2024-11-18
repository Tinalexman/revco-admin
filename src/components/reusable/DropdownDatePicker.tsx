"use client";

import {
  iDateRange,
  convertDateWithDayAndMonth,
  convertToISODateString,
} from "@/functions/dateFunctions";
import { Calendar } from "iconsax-react";
import React, { useState, FC } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

const DropdownDatePicker: FC<{
  onDatesChanged: (start: string, end: string) => void;
}> = ({ onDatesChanged }) => {
  const current = convertToISODateString(new Date());
  const [dateRange, setDateRange] = useState<iDateRange>({
    start: current,
    end: current,
  });

  const handleStartDateChange = (dates: Date[] | null) => {
    if (dates) {
      const startDate = new Date(dates[0]);
      const endDate = new Date(dateRange.end);

      if (startDate > endDate) {
        toast.error("Start date cannot be after the end date");
        return;
      }

      const convertedDate = convertToISODateString(startDate);

      setDateRange({
        ...dateRange,
        start: convertedDate,
      });

      if (onDatesChanged) {
        onDatesChanged(convertedDate, dateRange.end);
      }
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

      const convertedDate = convertToISODateString(endDate);

      setDateRange({
        ...dateRange,
        end: convertedDate,
      });

      if (onDatesChanged) {
        onDatesChanged(dateRange.start, convertedDate);
      }
    }
  };

  return (
    <div className="w-[140px] flex flex-col gap-1 mt-2">
      <p className=" text-[#333333] ml-2 font-semibold text-[0.815rem] leading-[0.975rem]">
        Custom Range
      </p>
      <div className="w-full h-[1px] bg-[#10101266]" />
      <div className="w-full flex flex-col  items-start px-2">
        <div className="w-full flex items-center gap-2">
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
        </div>
        <div className="w-full flex items-center gap-6">
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
      </div>
    </div>
  );
};

export default DropdownDatePicker;
