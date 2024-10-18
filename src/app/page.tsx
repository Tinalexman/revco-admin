"use client";

import React, { useEffect } from "react";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Thumbnail from "@/assets/Grid_Vectors.svg";
import Revco from "@/assets/Revco.svg";

const Loader = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/auth/login");
    }, 1500);
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] grid place-content-center bg-white relative">
      <Image
        src={Thumbnail}
        alt="vector"
        className="w-full h-full object-cover absolute top-0 left-0 right-0 bottom-0"
      />
      <div className="w-full h-full grid place-content-center">
        <Image
          src={Revco}
          alt="revco"
          className="w-auto h-auto"
          width={300}
          height={100}
        />
      </div>
    </div>
  );
};

export default Loader;
