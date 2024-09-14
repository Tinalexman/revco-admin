import Dropdown from "@/components/reusable/Dropdown";
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

const TransactionCard: FC<{ data: iTransactionData }> = ({
  data: transactionData,
}) => {
  const [filter, setFilter] = useState<string>("");

  const getDonutColor = (i: number) => {
    if (transactionData.children[0].fraction === 0) {
      return transactionDataColorList[i <= 1 ? 0 : i - 1];
    }
    return transactionDataColorList[i];
  };

  const getLegendColor = (i: number) => {
    if (transactionData.children[0].fraction === 0) {
      if (i === 0) return "#FFFFFF";
      return transactionDataColorList[i - 1];
    }
    return transactionDataColorList[i];
  };

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
              onClick: () => setFilter(v),
            }))}
            value={filter}
            hint={"Select"}
          />
        </div>
      </div>
      <DonutChart
        height={250}
        width={250}
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
        colorFunction={(v, i) => getDonutColor(i)}
      />
      <div className="w-full flex flex-col gap-2.5">
        {transactionData.children.map((ch, i) => (
          <div key={i} className="w-full justify-between items-center flex">
            <div className="w-fit flex items-center gap-2.5">
              <div
                className="size-2 rounded-full"
                style={{
                  backgroundColor: getLegendColor(i),
                }}
              />
              <h5
                className="text-[0.76rem] leading-[0.965rem] font-semibold"
                style={{
                  color:
                    transactionData.children[i].fraction === 0
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
                  transactionData.children[i].fraction === 0
                    ? "#FFFFFF"
                    : "#4F4F4F",
              }}
            >
              {ch.value}
            </h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionCard;
