import React, { useState } from "react";

import TransactionCard, { iTransactionData } from "./TransactionCard";

import { AreaChart } from "@mantine/charts";
import { data } from "./data";

const Statistics = () => {
  const transactionData: iTransactionData[] = [
    {
      title: "Transaction Channels",
      label: "Total Transactions",
      subLabel: 100,
      children: [
        {
          name: "POS",
          fraction: 0.75,
          value: "75%",
        },
        {
          name: "Card Payment",
          value: "15%",
          fraction: 0.15,
        },
        {
          name: "Bank Transfer",
          value: "5%",
          fraction: 0.05,
        },
        {
          name: "Online",
          value: "5%",
          fraction: 0.05,
        },
      ],
    },
    {
      title: "Transaction Status",
      label: "Total Transactions",
      subLabel: 5060,
      children: [
        {
          name: "None",
          value: "0",
          fraction: 0,
        },
        {
          name: "Successful",
          fraction: 0.6,
          value: "5000",
        },
        {
          name: "Pending",
          value: "50",
          fraction: 0.28,
        },
        {
          name: "Failed",
          value: "10",
          fraction: 0.12,
        },
      ],
    },
    {
      title: "Transaction Revenue",
      label: "Total Revenue",
      subLabel: 3000000,
      children: [
        {
          name: "None",
          value: "0",
          fraction: 0,
        },
        {
          name: "Taraba",
          fraction: 0.6,
          value: new Number(2000000).toLocaleString("en-US"),
        },
        {
          name: "Paysure",
          value: new Number(500000).toLocaleString("en-US"),
          fraction: 0.2,
        },
        {
          name: "Partners",
          value: new Number(500000).toLocaleString("en-US"),
          fraction: 0.2,
        },
      ],
    },
  ];

  const filters: string[] = ["7 days", "30 days", "12 months"];
  const [filterIndex, setFilterIndex] = useState<number>(2);

  return (
    <div className="w-full flex flex-col gap-2.5">
      <div className="bg-white w-full rounded-xl px-9 py-6 h-[500px] gap-5 flex flex-col items-center">
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col gap-0.5">
            <h5 className="text-[0.975rem] text-[#9291A5] leading-[1.1rem]">
              Statistics
            </h5>
            <h2 className="font-bold text-[#1E1B39] text-[1.19rem] leading-[1.52rem]">
              Financial Metrics
            </h2>
          </div>

          <div className="w-fit bg-[#F8F8FF] rounded-xl py-2 px-6 flex items-center gap-2.5">
            {filters.map((f, i) => (
              <div
                key={i}
                onClick={() => setFilterIndex(i)}
                className={`${
                  filterIndex === i
                    ? "text-white bg-[#1E1B39]"
                    : "text-[#9291A5]"
                } transition-colors duration-300 ease-out rounded-xl cursor-pointer py-2 px-3 text-[0.76rem] leading-[0.865rem]`}
              >
                {f}
              </div>
            ))}
          </div>
        </div>
        <AreaChart
          h={300}
          data={data}
          dataKey="month"
          series={[{ name: "amount", color: "primary.5" }]}
          curveType="bump"
          gridAxis="x"
          valueFormatter={(value) => {
            if (value < 999) return value.toLocaleString("en-US");
            if (value < 1000000) {
              let quotient = Math.ceil(value / 1000);
              return `${quotient.toLocaleString("en-US")}K`;
            } else if (value < 1000000000) {
              let quotient = Math.ceil(value / 1000000);
              return `${quotient.toLocaleString("en-US")}M`;
            }
            return value.toLocaleString("en-US");
          }}
          withXAxis={true}
          withYAxis={true}
        />
      </div>
      <div className="w-full grid grid-cols-3 gap-2.5">
        {transactionData.map((data, i) => (
          <TransactionCard key={i} data={data} />
        ))}
      </div>
    </div>
  );
};

export default Statistics;
