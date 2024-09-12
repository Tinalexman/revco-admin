import React, { FC } from "react";
import Image from "next/image";
import Thumbnail from "@/assets/Grid Vectors.svg";

const AuthLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-[100vw] h-[100vh] grid place-content-center bg-white relative">
      <Image
        src={Thumbnail}
        alt="vector"
        className="w-full h-full object-cover absolute top-0 left-0 right-0 bottom-0"
      />
      {children}
    </div>
  );
};

export default AuthLayout;
