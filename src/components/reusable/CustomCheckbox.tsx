import React, { FC } from "react";

const CustomCheckbox: FC<{
  value: boolean;
  onChange: () => void;
}> = ({ value, onChange }) => {
  return (
    <div className="cursor-pointer" onClick={onChange}>
      {value ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4F4F4F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-2"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 11l3 3l8 -8" />
          <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4F4F4F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
        </svg>
      )}
    </div>
  );
};

export default CustomCheckbox;
