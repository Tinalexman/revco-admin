import Dropdown from "@/components/reusable/Dropdown";
import { Loader } from "@mantine/core";
import React, { useState, FC } from "react";

import DonutChart from "react-donut-chart";

const transactionDataColorList: string[] = [
  "#27AE60",
  "#F2994A",
  "#EB5757",
  "#32ADE6",
];

export interface iTransactionData {
  title: string;
  label: string;
  subLabel: number;
  children: {
    name: string;
    value: string;
    fraction: number;
  }[];
}

const TransactionCard: FC<{
  data: iTransactionData;
  loading: boolean;
  onFilterChanged: (value: string) => void;
}> = ({ data: transactionData, loading, onFilterChanged }) => {
  const [filter, setFilter] = useState<string>("Daily");

  return (
    <div className="bg-white w-full rounded-xl p-5 h-[400px] gap-5 flex flex-col items-center">
      <div className="w-full flex justify-between items-center pb-2 border-b border-[#E5E5EF]">
        <div className="flex flex-col">
          <p className="text-[0.625rem] leading-[0.69rem] text-[#9291A5]">
            Statistics
          </p>
          <h3 className="font-bold text-[#1E1B39] text-[0.76rem] leading-[0.975rem]">
            {transactionData.title}
          </h3>
        </div>
        <div className="w-[90px]">
          <Dropdown
            menus={["Daily", "Monthly", "Yearly"].map((v, i) => ({
              name: v,
              onClick: () => {
                setFilter(v);
                onFilterChanged(v.substring(0, 1));
              },
            }))}
            value={filter}
            hint={"Select"}
          />
        </div>
      </div>
      {loading ? (
        <div className="w-full h-40 grid place-content-center">
          <Loader color="primary.6" />
        </div>
      ) : (
        <>
          <div className="size-[180px]">
            <DonutChart
              height={180}
              width={180}
              innerRadius={0.6}
              legend={false}
              formatValues={(v) => new Number(v).toLocaleString("en-US")}
              data={transactionData.children.map((ch, i) => ({
                label: transactionData.label,
                value: ch.fraction,
                isEmpty: false,
              }))}
              strokeColor=""
              interactive={false}
              colors={transactionDataColorList}
              className="text-gray-950"
            />
          </div>
          <div className="w-full flex flex-col gap-2.5">
            {transactionData.children.map((ch, i) => (
              <div key={i} className="w-full justify-between items-center flex">
                <div className="w-fit flex items-center gap-2.5">
                  <div
                    className="size-2 rounded-full"
                    style={{
                      backgroundColor: transactionDataColorList[i],
                    }}
                  />
                  <h5
                    className="text-[0.76rem] leading-[0.965rem] font-semibold"
                    style={{
                      color:
                        transactionData.children[i].fraction === -1
                          ? "#FFFFFF"
                          : "#615E83",
                    }}
                  >
                    {ch.name}
                  </h5>
                </div>
                <h5
                  className="text-[0.65rem] leading-[0.72rem]"
                  style={{
                    color:
                      transactionData.children[i].fraction === -1
                        ? "#FFFFFF"
                        : "#4F4F4F",
                  }}
                >
                  {ch.value}
                </h5>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TransactionCard;
