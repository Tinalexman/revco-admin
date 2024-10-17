"use client";

import { ArrowLeft } from 'iconsax-react'
import React, { FC } from 'react'

import { useRouter } from "next/navigation";

const BackButton: FC<{ text: string, color: string }> = ({ text, color }) => {
  const router = useRouter();

  return (
    <div onClick={() => router.back()} className="flex gap-2 items-center w-fit cursor-pointer">
      <ArrowLeft size="30" color={color} variant="Broken" />
      <p style={{
        color: color
      }} className="text-reg-caption">{text}</p>
    </div>
  )
}

export default BackButton