import React, { FC } from "react";

import Image from "next/image";
import Preview from "@/assets/auth/preview.png";
import NDIC from "@/assets/auth/NDIC.png";
import CBN from "@/assets/auth/CBN.png";

import { RiMedalFill } from "react-icons/ri";
import { AiOutlineSafetyCertificate } from "react-icons/ai";

const AuthLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-[100vw] h-[100vh] flex bg-white font-inter">
      <div className="w-[50vw] h-[100vh] bg-[url('.././assets/auth/side.png')] bg-no-repeat bg-cover flex flex-col gap-5 items-center justify-center">
        <Image
          src={Preview}
          alt="preview"
          className="w-[65%] h-auto object-cover"
        />
        <div className="w-[65%] gap-3 flex flex-col">
          <h2 className="text-white font-medium text-[1.6rem] leading-[1.8rem]">
            Effortlessly Settle Bills and Government Payments
          </h2>
          <h2 className="text-white text-med-button">
            REVCO, a one-stop solution for all your financial transactions right
            here.
          </h2>
          <div className="w-full flex items-center gap-2">
            <div className="w-fit flex items-center gap-2">
              <div className="px-3 py-1 rounded text-black bg-[#F0E5FCC4] gap-1 flex items-center">
                <RiMedalFill />
                <h4 className="text-[0.55rem] leading-[0.9rem]">
                  Fully Licensed by CBN
                </h4>
              </div>
              <Image src={CBN} alt="CBN" className="w-[26px] h-auto" />
            </div>

            <div className="h-10 w-[1px] bg-white" />

            <div className="w-fit flex items-center gap-2">
              <div className="px-3 py-1 rounded text-black bg-[#F0E5FCC4] gap-1 flex items-center">
                <AiOutlineSafetyCertificate />
                <h4 className="text-[0.55rem] leading-[0.9rem]">
                  Deposits insured by
                </h4>
              </div>
              <Image src={NDIC} alt="NDIC" className="w-[72px] h-auto" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[50vw] h-[100vh] grid place-content-center bg-[url('.././assets/Grid_Vectors.svg')] bg-no-repeat bg-cover">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
