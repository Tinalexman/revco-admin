import React from "react";

const DashboardSizerIcon: React.FC<{ expanded: boolean }> = ({ expanded }) => {
  return (
    <>
      {!expanded ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          // stroke="#00923F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-primary"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M14 12l-10 0" />
          <path d="M14 12l-4 4" />
          <path d="M14 12l-4 -4" />
          <path d="M20 4l0 16" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          // stroke="#00923F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-primary"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M10 12l10 0" />
          <path d="M10 12l4 4" />
          <path d="M10 12l4 -4" />
          <path d="M4 4l0 16" />
        </svg>
      )}
    </>
  );
};

export default DashboardSizerIcon;
