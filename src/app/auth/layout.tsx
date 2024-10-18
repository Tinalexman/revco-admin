import React, { FC } from "react";

import Image from "next/image";
import Preview from "@/assets/auth/preview.png";

const AuthLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-[100vw] h-[100vh] flex bg-white">
      <div className="w-[50vw] h-[100vh] bg-[url('.././assets/auth/side.png')] bg-no-repeat bg-cover flex flex-col gap-5 items-center justify-center">
        <Image src={Preview} alt="preview" className="w-[55%] h-auto object-cover" />
        <div className="w-[55%] gap-3 flex flex-col">
          <h2 className="text-white font-medium text-[2rem] leading-[2.5rem]">Effortlessly Settle Bills and government payments</h2>
          <h2 className="text-white text-med-button">Whether it's state tax, school fees, waterboard charges, NECO,
            or WAEC payments, find a one-stop solution for all your financial transactions right here.</h2>
        </div>

      </div>
      <div className="w-[50vw] h-[100vh] grid place-content-center bg-[url('.././assets/Grid_Vectors.svg')] bg-no-repeat bg-cover">
        {children}
      </div>

    </div>
  );
};

export default AuthLayout;
