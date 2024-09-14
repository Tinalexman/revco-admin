import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from "@/components/reusable/Dropdown";
import { SearchNormal1, Calendar } from "iconsax-react";
import React, { useState } from "react";
import { convertDateWithDayAndMonth } from "@/functions/dateFunctions";

interface DateRange {
  start: string;
  end: string;
}

const Filters = () => {
  const [search, setSearch] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateRange>({
    start: new Date().toISOString().split("T")[0],
    end: new Date().toISOString().split("T")[0],
  });

  const handleStartDateChange = (dates: Date[] | null) => {
    if (dates) {
      setDateRange({
        ...dateRange,
        start: dates[0].toISOString().split("T")[0],
      });
    }
  };

  const handleEndDateChange = (dates: Date[] | null) => {
    if (dates) {
      setDateRange({
        ...dateRange,
        end: dates[0].toISOString().split("T")[0],
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
          onChange={(e) => setSearch(e.target.value)}
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
      <div className="w-40 h-10 flex gap-2 items-center rounded border border-gray-4 pl-2">
        <p className=" text-[#10101266] text-[0.815rem] leading-[0.975rem]">
          Showing:
        </p>
        <div className="w-24">
          <Dropdown
            menus={["Users"].map((v, i) => ({
              name: v,
              onClick: () => {
                setType(v);
              },
            }))}
            hint="Select"
            bare={true}
            value={type}
          />
        </div>
      </div>
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
    </div>
  );
};

export default Filters;