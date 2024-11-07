import React, { FC, useState } from "react";

import TransactionCard, { iTransactionData } from "./TransactionCard";

import { AreaChart, getFilteredChartTooltipPayload } from "@mantine/charts";
import {
  useGetTransactionChannelsPieData,
  useGetMetrics,
  useGetTransactionStatusPieData,
  useGetTransactionRevenuePieData,
} from "@/hooks/dashboardHooks";
import { Loader } from "@mantine/core";

const Statistics: FC<{ mode: string | null }> = ({ mode }) => {
  const {
    data: metrics,
    getMetrics,
    loading: loadingMetrics,
  } = useGetMetrics(mode);

  const {
    loading: loadingTransactionChannelsPieData,
    data: transactionChannels,
    getPieChannelsData,
  } = useGetTransactionChannelsPieData(mode);

  const {
    loading: loadingTransactionStatusPieData,
    data: transactionStatus,
    getPieStatusData,
  } = useGetTransactionStatusPieData(mode);

  const {
    loading: loadingTransactionRevenuePieData,
    data: transactionRevenue,
    getPieRevenueData,
  } = useGetTransactionRevenuePieData(mode);

  const totalRevenue: number =
    transactionRevenue["TARABA STATE INTERNAL REVENUE SERVICE "] +
    (transactionRevenue?.["Participant 1"] ?? 0) +
    (transactionRevenue?.["Participant 2"] ?? 0) +
    transactionRevenue.Paysure;

  const transactionData: iTransactionData[] = [
    {
      title: "Transaction Channels",
      label: "Total Transactions",
      subLabel: 100,
      children: transactionChannels.map((tnc, i) => {
        const frac = Number.parseFloat(tnc.percentage);
        return {
          name: tnc.channel,
          fraction: frac,
          value: `${frac}%`,
        };
      }),
    },
    {
      title: "Transaction Status",
      label: "Total Transactions",
      subLabel: transactionStatus.total,
      children: [
        {
          name: "Successful",
          value: `${transactionStatus.success}`,
          fraction:
            transactionStatus.total === 0
              ? 0
              : transactionStatus.success / transactionStatus.total,
        },
        {
          name: "Pending",
          value: `${transactionStatus.pending}`,
          fraction:
            transactionStatus.total === 0
              ? 0
              : transactionStatus.pending / transactionStatus.total,
        },
      ],
    },
    {
      title: "Transaction Revenue",
      label: "Total Revenue",
      subLabel: 0,
      children: [
        {
          name: "Taraba IRS",
          value: `${transactionRevenue["TARABA STATE INTERNAL REVENUE SERVICE "]}`,
          fraction:
            totalRevenue === 0
              ? 0
              : transactionRevenue["TARABA STATE INTERNAL REVENUE SERVICE "] /
                totalRevenue,
        },
        {
          name: "Participant 1",
          value: `${transactionRevenue?.["Participant 1"] ?? 0}`,
          fraction:
            totalRevenue === 0
              ? 0
              : (transactionRevenue?.["Participant 1"] ?? 0) / totalRevenue,
        },
        {
          name: "Participant 2",
          value: `${transactionRevenue?.["Participant 2"] ?? 0}`,
          fraction:
            totalRevenue === 0
              ? 0
              : (transactionRevenue?.["Participant 2"] ?? 0) / totalRevenue,
        },
        {
          name: "Paysure",
          value: `${transactionRevenue.Paysure}`,
          fraction:
            totalRevenue === 0 ? 0 : transactionRevenue.Paysure / totalRevenue,
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
          <div className="w-fit gap-4 flex items-center text-[#1E1B39] text-[0.65rem] leading-[0.8rem]">
            <div className="flex w-fit items-center gap-1 px-2 py-1.5 rounded-lg border border-[#E5E5EF]">
              <div className="bg-primary rounded-full size-1.5" />
              <p>Completed Payment</p>
            </div>
            <div className="flex w-fit items-center gap-1 px-2 py-1.5 rounded-lg border border-[#E5E5EF]">
              <div className="bg-[#FF718B] rounded-full size-1.5" />
              <p>Invoice Generated</p>
            </div>
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
        {loadingMetrics ? (
          <div className="w-full h-[300px] grid place-content-center">
            <Loader color="primary.6" />
          </div>
        ) : (
          <AreaChart
            h={300}
            data={metrics.map((mt, i) => ({
              month: mt.referenceName,
              completedPayment: mt.invoicePaid,
              invoiceGenerated: mt.invoiceTotal,
            }))}
            dataKey="month"
            series={[
              { name: "completedPayment", color: "primary.5" },
              { name: "invoiceGenerated", color: "red.5" },
            ]}
            curveType="bump"
            gridAxis="x"
            tooltipProps={{
              content: ({ label, payload }) => (
                <ChartTooltip label={label} payload={payload} />
              ),
            }}
            valueFormatter={formatValue}
            withXAxis={true}
            withYAxis={true}
          />
        )}
      </div>

      <div className="w-full grid grid-cols-3 gap-2.5">
        {transactionData.map((data, i) => (
          <TransactionCard
            key={i}
            data={data}
            loading={
              i === 0
                ? loadingTransactionChannelsPieData
                : i === 1
                ? loadingTransactionStatusPieData
                : loadingTransactionRevenuePieData
            }
            onFilterChanged={(value) => {
              if (i === 0) {
                getPieChannelsData(value);
              } else if (i === 1) {
                getPieStatusData(value);
              } else if (i === 2) {
                getPieRevenueData(value);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

function formatValue(value: number): string {
  if (value < 999) return value.toLocaleString("en-US");
  if (value < 1000000) {
    let quotient = Math.ceil(value / 1000);
    return `${quotient.toLocaleString("en-US")}K`;
  } else if (value < 1000000000) {
    let quotient = Math.ceil(value / 1000000);
    return `${quotient.toLocaleString("en-US")}M`;
  }
  return value.toLocaleString("en-US");
}

interface ChartTooltipProps {
  label: string;
  payload: Record<string, any>[] | undefined;
}

function ChartTooltip({ label, payload }: ChartTooltipProps) {
  if (!payload) return null;

  return (
    <div className="flex flex-col gap-2 p-3 bg-white shadow-custom rounded">
      <h2 className="text-reg-caption text-[#555555] font-semibold">{label}</h2>
      {getFilteredChartTooltipPayload(payload).map((item: any) => (
        <h3 key={item.name} className="text-dash-slider text-monokai font-bold">
          {formatValue(item.value)}
        </h3>
      ))}
    </div>
  );
}

export default Statistics;
