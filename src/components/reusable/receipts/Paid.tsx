"use client"

import React, { FC } from "react";

import Image from "next/image";
import Logo from "@/assets/image_261.svg";
import Qr from "@/assets/paysure qr.svg";
import PaidStamp from "@/assets/Paid Stamp.svg";
import Coat from "@/assets/Coat of Arms.svg";
import { FiDownload } from "react-icons/fi";
import { iStateColors, stateColorsData } from "@/constants/constants";
import { convertDateWithJustSlashes } from "@/functions/dateFunctions";
import { ArrowLeft } from 'iconsax-react'
import { useRouter } from "next/navigation";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export interface iPaidReceiptData {
  invoiceNo: string;
  transactionDate: string;
  payer: string;
  payerEmail: string;
  payerPhone: string;
  billerItem: string;
  mda: string;
  revenueHead: string;
  paymentRef: string;
  amount: number;
  paymentChannel: string;
}

const colors: iStateColors = stateColorsData["Taraba"];

const Paid: FC<{ receipt: iPaidReceiptData }> = ({ receipt }) => {

  const router = useRouter();

  const downloadReceipt = () => {
    const receiptElement = document.getElementById(
      "revco-desktop-receipt"
    ) as HTMLElement;

    const stateColumn = document.getElementById("state-column") as HTMLElement;
    stateColumn.style.justifyContent = "start";
    stateColumn.style.gap = "8px";

    const pinContainer = document.getElementById(
      "pin-header"
    ) as HTMLElement;

    pinContainer.style.paddingBottom = "12px";

    if (receiptElement) {
      html2canvas(receiptElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg", 0.8);
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: [receiptElement.offsetWidth, receiptElement.offsetHeight],
        });
        pdf.addImage(
          imgData,
          "JPEG",
          0,
          0,
          receiptElement.offsetWidth,
          receiptElement.offsetHeight
        );
        pdf.save(`Payment Receipt ${receipt.invoiceNo}.pdf`);

        stateColumn.style.justifyContent = "center";
        stateColumn.style.gap = "0";
        pinContainer.style.paddingBottom = "0";
      });
    }
  };

  return (
    <div className="w-[804px] flex flex-col gap-10 items-center">
      <div className="w-full flex items-center gap-4 justify-between mt-10">
        <button
          onClick={() => router.back()}
          className="border-2 border-[#555555] h-12 flex gap-2 justify-center items-center rounded-lg w-[200px] text-[#555555] font-medium"
        >
          <ArrowLeft size={'24'} />
          Go Back
        </button>
        <button
          onClick={downloadReceipt}
          className="bg-primary h-12 flex gap-2 justify-center items-center rounded-lg w-[200px] text-white font-semibold"
        >
          <FiDownload size={24} />
          Download
        </button>
      </div>


      <div
        id="revco-desktop-receipt"
        className="w-[804px] font-poppins shadow-sm border border-gray-200 flex flex-col bg-white text-black"
      >
        <div className="w-full h-full bg-[url('.././assets/Background.png')] bg-center bg-cover bg-no-repeat relative">
          <p className="text-[8px] font-medium left-5 top-3 absolute">
            E-Receipt
          </p>
          <div className="flex flex-col ml-[41px] mt-[51px]">
            <p className="font-semibold text-[14px] leading-[16.94px]">
              Payment Receipt
            </p>
            <p className="font-normal text-[10px] leading-[12.1px]">
              Generated on {convertDateWithJustSlashes(new Date())}
            </p>
          </div>
          <div className="mt-[11.38px] flex gap-4 w-full">
            <div
              style={{
                background: colors.state,
              }}
              className="h-[79.72px] w-[370px]"
            />
            <div className={`flex items-center gap-2 w-[320px] h-[79.72px]`}>
              <Image
                src={Logo}
                alt="logo"
                className="size-[79.72px] object-cover"
                width={72}
                height={72}
              />
              <div
                id="state-column"
                className="flex flex-col justify-center h-[79.72px] w-[230px]"
              >
                <h2
                  className={`text-[32px] leading-[32px] font-podkova font-bold text-[#333333] h-8`}
                >
                  {colors.name} STATE
                </h2>
                <p className="text-[#DA251D] text-[11.2px] leading-[11.52px] font-bold h-3">
                  BOARD OF INTERNAL REVENUE SERVICE
                </p>
              </div>
            </div>
            <div
              style={{
                background: colors.state,
              }}
              className="h-[79.72px] w-[82px]"
            />
          </div>
          <div
            className="mt-[12.28px] flex flex-col px-[41px] w-full relative"
          >
            <Image
              src={Coat}
              alt="coat of arms"
              className="w-[340px] h-[290px] top-[25%] left-1/2 -translate-x-1/2 absolute"
              width={160}
              height={160}
            />

            <div className="flex flex-col w-full">
              <div className="w-full h-[35px] rounded-t-[6px] flex items-center" style={{
                background: colors.sectionHeader
              }}>
                <h2 className="font-semibold text-[14px] leading-[16.94px] ml-[10px]">PAYER INFORMATION</h2>

              </div>
              <div className="w-full h-[29px] justify-between flex">
                <div className="w-[253px] h-full flex items-center" style={{
                  background: colors.sectionItemKey
                }}>
                  <h2 className="font-medium text-[12px] leading-[14.52px] ml-[10px]">PAYER&apos;S NAME</h2>

                </div>
                <div className="w-[549px] h-full flex items-center justify-end" style={{
                  background: colors.sectionItemValue
                }}>
                  <h2 className="font-medium text-[12px] leading-[14.52px] mr-[10px]">{receipt.payer}</h2>
                </div>
              </div>
              <div className="w-full h-[29px] justify-between flex mt-[3px]">
                <div className="w-[253px] h-full flex items-center" style={{
                  background: colors.sectionItemKey
                }}>
                  <h2 className="font-medium text-[12px] leading-[14.52px] ml-[10px]">EMAIL ADDRESS</h2>

                </div>
                <div className="w-[549px] h-full flex items-center justify-end" style={{
                  background: colors.sectionItemValue
                }}>
                  <h2 className="font-medium text-[12px] leading-[14.52px] mr-[10px]">{receipt.payerEmail}</h2>
                </div>
              </div>
              <div className="w-full h-[29px] gap-[1px] flex mt-[3px] rounded-b overflow-hidden">
                <div className="w-[253px] h-full flex items-center" style={{
                  background: colors.sectionItemKey
                }}>
                  <h2 className="font-medium text-[12px] leading-[14.52px] ml-[10px]">PHONE NUMEBR</h2>

                </div>
                <div className="w-[549px] h-full flex items-center justify-end" style={{
                  background: colors.sectionItemValue
                }}>
                  <h2 className="font-medium text-[12px] leading-[14.52px] mr-[10px]">{receipt.payerPhone}</h2>
                </div>
              </div>

            </div>

            <div className="flex flex-col w-full mt-[13px]">
              <div className="w-full h-[35px] rounded-t-[6px] flex items-center" style={{
                background: colors.sectionHeader
              }}>
                <h2 className="font-semibold text-[14px] leading-[16.94px] ml-[10px]">PAYMENT DETAILS</h2>
              </div>

              <div className="w-full flex gap-[2px] h-[44px] text-[11px] leading-[13.31px] font-medium">
                <div className="w-[82px] h-full px-[10px] py-[7px]" style={{
                  background: colors.otherSectionItemKey
                }}>
                  <h3>PAYMENT DATE</h3>
                </div>
                <div className="w-[100px] h-full px-[10px] py-[7px]" style={{
                  background: colors.otherSectionItemKey
                }}>
                  <h3>PAYMENT REF</h3>
                </div>
                <div className="w-[260px] h-full px-[10px] py-[7px]" style={{
                  background: colors.otherSectionItemKey
                }}>
                  <h3 >SERVICE DESCRIPTION</h3>
                </div>
                <div className="w-[150px] h-full px-[10px] py-[7px]" style={{
                  background: colors.otherSectionItemKey
                }}>
                  <h3>AMOUNT (₦)</h3>
                </div>

                <div className="w-[150px] h-full px-[10px] py-[7px]" style={{
                  background: colors.otherSectionItemKey
                }}>
                  <h3>TOTAL (₦)</h3>
                </div>
              </div>

              <div className="w-full h-full flex gap-[2px] text-[12px] leading-[14.52px] mt-[2px] font-medium">
                <div className="w-[82px] px-[10px] py-[7px]" style={{
                  background: colors.otherSectionItemValue
                }}>
                  <h3>{convertDateWithJustSlashes(new Date(receipt.transactionDate))}</h3>
                </div>
                <div className="w-[101px] px-[2px] py-[7px]" style={{
                  background: colors.otherSectionItemValue
                }}>
                  <h3>{receipt.paymentRef}</h3>
                </div>
                <div className="w-[260px] px-[10px] py-[7px]" style={{
                  background: colors.otherSectionItemValue
                }}>
                  <h3 >{receipt.revenueHead}</h3>
                </div>
                <div className="w-[150px] px-[10px] py-[7px]" style={{
                  background: colors.otherSectionItemValue
                }}>
                  <h3>{receipt.amount.toLocaleString("en-US")}.00</h3>
                </div>

                <div className="w-[150px] px-[10px] py-[7px]" style={{
                  background: colors.otherSectionItemValue
                }}>
                  <h3>{receipt.amount.toLocaleString("en-US")}.00</h3>
                </div>
              </div>

              <div className="w-full flex gap-[2px] h-[29px] mt-[2px] font-bold text-[12px] leading-[14.52px]">
                <div className="w-[451px] h-full flex justify-end items-center" style={{
                  background: colors.otherSectionItemValue
                }}>
                  <h3 className="mr-[18px]">TOTAL PAID</h3>
                </div>
                <div className="w-[150px] px-[10px] py-[7px]" style={{
                  background: colors.otherSectionItemValue
                }}>
                  <h3>{receipt.amount.toLocaleString("en-US")}.00</h3>
                </div>
                <div className="w-[150px] px-[10px] py-[7px]" style={{
                  background: colors.otherSectionItemValue
                }}>
                  <h3>{receipt.amount.toLocaleString("en-US")}.00</h3>
                </div>
              </div>
              <div className="w-full rounded-b overflow-hidden flex gap-[2px] h-[29px] mt-[2px] text-[#DA251D] font-medium text-[12px] leading-[14.52px]">
                <div className="w-[451px] h-full flex justify-end items-center" style={{
                  background: colors.otherSectionItemValue
                }}>
                  <h3 className="mr-[18px]">BALANCE DUE</h3>
                </div>

                <div className="w-[150px] px-[10px] py-[7px]" style={{
                  background: colors.otherSectionItemValue
                }}>

                </div>
                <div className="w-[150px] px-[10px] py-[7px]" style={{
                  background: colors.otherSectionItemValue
                }}>
                  <h3>0.00</h3>
                </div>
              </div>

            </div>

            <div className="flex flex-col w-full mt-[13px]">
              <div className="w-full h-[35px] rounded-t-[6px] flex items-center" style={{
                background: colors.sectionHeader
              }}>
                <h2 className="font-semibold text-[14px] leading-[16.94px] ml-[10px]">BILLER REQUIRED INFORMATION</h2>

              </div>
              <div className="w-full h-[29px] gap-[1px] flex">
                <div className="w-[253px] h-full flex items-center" style={{
                  background: colors.sectionItemKey
                }}>
                  <h2 className="font-medium text-[12px] leading-[14.52px] ml-[10px]">ITEM</h2>

                </div>
                <div className="w-[550px] h-full flex items-center justify-end" style={{
                  background: colors.sectionItemValue
                }}>
                  <h2 className="font-medium text-[12px] leading-[14.52px] mr-[10px]">{receipt.billerItem}</h2>
                </div>
              </div>
              <div className="w-full min-h-[29px] gap-[1px] flex mt-[3px]">
                <div className="w-[253px] flex items-center" style={{
                  background: colors.sectionItemKey
                }}>
                  <h2 className="font-medium text-[12px] leading-[14.52px] ml-[10px]">DESCRIPTION</h2>

                </div>
                <div className="w-[550px] flex items-center justify-end" style={{
                  background: colors.sectionItemValue
                }}>
                  <h2 className="font-medium text-[12px] leading-[14.52px] mr-[10px]">{receipt.revenueHead}</h2>
                </div>
              </div>
              <div className="w-full min-h-[29px] gap-[1px] flex mt-[3px] rounded-b overflow-hidden">
                <div className="w-[253px] flex items-center" style={{
                  background: colors.sectionItemKey
                }}>
                  <h2 className="font-medium text-[12px] leading-[14.52px] ml-[10px]">MDA</h2>

                </div>
                <div className="w-[550px] flex items-center justify-end" style={{
                  background: colors.sectionItemValue
                }}>
                  <h2 className="font-medium text-[12px] leading-[14.52px] mr-[10px]">{receipt.mda}</h2>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full mt-[13px]">
              <div className="w-full h-[35px] rounded-t-[6px] flex items-center" style={{
                background: colors.sectionHeader
              }}>
                <h2 className="font-semibold text-[14px] leading-[16.94px] ml-[10px]">PAYMENT CHANNEL INFORMATION</h2>

              </div>

              <div className="w-full flex gap-[2px] h-[44px] text-[11px] leading-[13.31px] font-medium">
                <div className="w-[179px] h-full px-[10px] py-[7px]" style={{
                  background: colors.otherSectionItemKey
                }}>
                  <h3>PAYMENT CHANNEL</h3>
                </div>
                <div className="w-[179px] h-full px-[10px] py-[7px]" style={{
                  background: colors.otherSectionItemKey
                }}>
                  <h3>MASKED CARD PAN</h3>
                </div>
                <div className="w-[179px] h-full px-[10px] py-[7px]" style={{
                  background: colors.otherSectionItemKey
                }}>
                  <h3>PAYMENT REF</h3>
                </div>
                <div className="w-[179px] h-full px-[10px] py-[7px]" style={{
                  background: colors.otherSectionItemKey
                }}>
                  <h3>CARD SCHEME</h3>
                </div>
              </div>

              <div className="w-full flex gap-[2px] h-[45px] text-[12px] leading-[14.52px] font-medium rounded-b overflow-hidden">
                <div className="w-[179px] h-full px-[10px] py-[7px]" style={{
                  background: colors.otherSectionItemValue
                }}>
                  <h3>{receipt.paymentChannel}</h3>
                </div>
                <div className="w-[179px] h-full px-[10px] py-[7px]" style={{
                  background: colors.otherSectionItemValue
                }}>
                  <h3></h3>
                </div>
                <div className="w-[179px] h-full px-[10px] py-[7px]" style={{
                  background: colors.otherSectionItemValue
                }}>
                  <h3>{receipt.paymentRef}</h3>
                </div>
                <div className="w-[179px] h-full px-[10px] py-[7px]" style={{
                  background: colors.otherSectionItemValue
                }}>
                  <h3></h3>
                </div>
              </div>
            </div>

            <div className="mt-[29px] w-[255px] flex flex-col">
              <div id="pin-header" className="w-full rounded-t-[8px] h-[25px] flex items-center" style={{
                background: colors.pinHeader
              }}>
                <h2 className="text-[13.3px] leading-[16.1px] ml-[12px] font-bold">PIN</h2>
              </div>
              <div className="w-full mt-[3px] h-[45px] flex items-center rounded-b overflow-hidden" style={{
                background: colors.pinValue
              }}>
                <h2 className="text-[20px] leading-[24.2px] ml-[12px] font-normal">{receipt.invoiceNo}</h2>
              </div>
              <div className="mt-[14px]">
                <Image
                  src={Qr}
                  alt="paysure qr code"
                  className="size-[127px] object-cover"
                  width={160}
                  height={160}
                />
              </div>
            </div>
          </div>

          <Image
            src={PaidStamp}
            alt="payment stamp"
            className="w-[256px] h-[150px] absolute bottom-[170px] right-[34.79px]"
            width={256}
            height={150}
          />

          <div
            style={{
              background: colors.footer,
            }}
            className="mt-[78.37px] w-full grid place-content-center  h-[56.75px]"
          >
            <p className="text-[12.16px] leading-[15.2px] text-black">
              Powered by: <span className="text-tertiary font-bold">paysure</span>
            </p>
          </div>
        </div>
      </div>

      <div className="h-20" />
    </div>
  )
}

export default Paid