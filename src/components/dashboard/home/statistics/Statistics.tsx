import React, { useState } from "react";

import TransactionCard, { iTransactionData } from "./TransactionCard";

import { AreaChart } from "@mantine/charts";
import { useGetTransactionChannelsPieData, useGetMetrics } from "@/hooks/dashboardHooks";
import { Loader } from "@mantine/core";

const Statistics = () => {

  const { data: metrics, getMetrics, loading: loadingMetrics } = useGetMetrics();


  const { loading: loadingTransactionChannelsPieData,
    data: transactionChannels, } = useGetTransactionChannelsPieData();

  const totalChannelsCount = transactionChannels.reduce((acc, tnc) => {
    return acc + tnc.count
  }, 0)

  const totalChannelsRevenue = transactionChannels.reduce((acc, tnc) => {
    return acc + tnc.totalRev
  }, 0)


  const transactionData: iTransactionData[] = [
    {
      title: "Transaction Channels",
      label: "Total Transactions",
      subLabel: totalChannelsRevenue,
      children: [
        ...(transactionChannels.map((tnc, i) => {
          const frac = totalChannelsCount === 0 ? 0 : tnc.count / totalChannelsCount;
          return {
            name: tnc.channel,
            fraction: frac,
            value: `${(frac * 100).toFixed(0)}%`,
          };
        })),


      ]
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
      <div className="w-full bg-white h-[450px] flex flex-col justify-between px-9 py-6 rounded-xl">
        <div className="h-[60px] w-full items-center flex justify-between">
          <div className="flex flex-col gap-0.5">
            <h5 className="text-[0.975rem] text-[#9291A5] leading-[1.1rem]">
              Statistics
            </h5>
            <h2 className="font-bold text-[#1E1B39] text-[1.19rem] leading-[1.52rem]">
              Financial Metrics
            </h2>
          </div>
          <div className="w-fit h-fit bg-[#F8F8FF] rounded-xl py-2 px-6 flex items-center gap-2.5">
            {filters.map((f, i) => (
              <div
                key={i}
                onClick={() => {
                  setFilterIndex(i);
                  if (i === 0) getMetrics("D");
                  if (i === 1) getMetrics("M");
                  if (i === 2) getMetrics("Y");
                }}
                className={`${filterIndex === i
                  ? "text-white bg-[#1E1B39]"
                  : "text-[#9291A5]"
                  } transition-colors duration-300 ease-out rounded-xl cursor-pointer py-2 px-3 text-[0.76rem] leading-[0.865rem]`}
              >
                {f}
              </div>
            ))}
          </div>
        </div>
        {
          loadingMetrics ? <div className="w-full h-[300px] grid place-content-center">
            <Loader color="primary.6" />

          </div> : <AreaChart
            h={300}
            data={metrics.map((mt, i) => ({
              month: mt.referenceName,
              amount: mt.amount,
            }))}
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
        }
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
