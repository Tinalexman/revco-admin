"use client"

import React, { ReactNode, Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from "next/navigation"
import Paid from "@/components/reusable/receipts/Paid";
import Pending from "@/components/reusable/receipts/Pending";
import { Loader } from "@mantine/core";


const ViewReceipt = () => {
  return <Suspense fallback={<Loader color="primary.6" />}>
    <ViewRecieptContent />
  </Suspense>
}

const ViewRecieptContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const data = searchParams.get("data");
  const [child, setChild] = useState<ReactNode | null>(null)

  useEffect(() => {
    if (status === null || data === null) {
      router.back();
    } else {
      const payload: any = JSON.parse(Buffer.from(data!, "base64").toString("utf-8"))
      if (status === "paid") {
        setChild(<Paid receipt={payload} />)
      } else if (status === "pending") {
        setChild(<Pending receipt={payload} />)
      }
    }
  }, [router])




  return (
    <div className="w-full flex flex-col gap-5">
      <div className="px-8 bg-white w-full h-[4.5rem]">
        <div className="w-full flex flex-col justify-around py-2">
          <h2 className="text-monokai font-semibold text-dash-intro-header">
            Payments
          </h2>
          <h3 className="text-primary text-reg-caption">
            Manage all transactions and data on the Revco service
          </h3>
        </div>
      </div>
      <div className='w-full grid place-content-center'>
        {child}
      </div>
    </div>
  )
}

export default ViewReceipt