"use client";

import { Loader } from "@mantine/core";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";
import { VscTools } from "react-icons/vsc";
import Details from "./Details";

const Transactions = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Content />
    </Suspense>
  );
};

const Content = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const taxPayerID = searchParams.get("id");

  useEffect(() => {
    if (taxPayerID === null) {
      router.back();
    }
  }, [router]);

  return (
    <div className="w-full flex flex-col gap-2.5">
      <div className="px-8 bg-white w-full h-[4.5rem]">
        <div className="w-full flex justify-between items-center border-t border-gray-4 py-2">
          <div className="flex flex-col">
            <h2 className="text-monokai font-semibold text-dash-intro-header">
              Tax Payers
            </h2>
            <h3 className="text-primary text-reg-caption">
              Manage all tax payers
            </h3>
          </div>
          <Link
            href={"/dashboard/users/roles-and-permissions"}
            className="bg-primary text-white rounded-lg h-9 gap-2 px-3 text-[0.825rem] flex items-center leading-[0.98rem]"
          >
            <VscTools size={18} color="#FFFFFF" />
            <h3>User Roles & Permissions</h3>
          </Link>
        </div>
      </div>
      <div className="py-5 px-10 w-full flex flex-col gap-2.5">
        <Details id={taxPayerID!} />
      </div>
    </div>
  );
};

export default Transactions;
