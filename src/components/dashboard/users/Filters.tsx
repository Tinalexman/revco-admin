import Dropdown from "@/components/reusable/Dropdown";
import { SearchNormal1 } from "iconsax-react";
import React, { useState } from "react";

const Filters = () => {
  const [search, setSearch] = useState<string>("");
  const [type, setType] = useState<string>("");

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
      {/* <div className="w-40 h-10 flex gap-2 items-center rounded border border-gray-4 pl-2">
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
      </div> */}
    </div>
  );
};

export default Filters;
