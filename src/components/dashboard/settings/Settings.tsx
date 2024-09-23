"use client";

import React, { useState, ReactNode } from "react";
import GeneralSettings from "./GeneralSettings";
import NotificationSettings from "./NotificationSettings";
import SecuritySettings from "./SecuritySettings";

const Settings = () => {
  const [indexOfChildToBeViewed, setIndexOfChildToBeViewed] =
    useState<number>(0);
  const children: ReactNode[] = [
    <GeneralSettings />,
    <NotificationSettings />,
    <SecuritySettings />,
  ];
  const childrenNames: string[] = [
    "General Settings",
    "Notification Settings",
    "Security Settings",
  ];

  return (
    <div className="w-full flex flex-col">
      <div className="px-8 bg-white w-full h-[4.5rem]">
        <div className="w-full flex flex-col justify-around border-t border-gray-4 py-2">
          <h2 className="text-monokai font-semibold text-dash-intro-header">
            Account Settings
          </h2>
          <h3 className="text-primary text-reg-caption">
            Modify the settings of your account
          </h3>
        </div>
      </div>
      <div className="py-5 px-10 w-full flex flex-col gap-2.5">
        <div className="h-14 bg-white rounded-xl w-full flex items-center justify-start px-5">
          <div className="p-0.5 h-9 bg-background w-fit rounded-xl flex overflow-hidden">
            {childrenNames.map((childName, index) => (
              <div
                key={index}
                onClick={() => setIndexOfChildToBeViewed(index)}
                className={`text-reg-caption cursor-pointer transition-all duration-300 ease-out px-4 grid place-content-center font-semibold ${
                  indexOfChildToBeViewed === index
                    ? "text-primary bg-white"
                    : "text-[#A9A9A9]"
                } ${
                  index === 0
                    ? "rounded-l-xl"
                    : index === childrenNames.length - 1
                    ? "rounded-r-xl"
                    : ""
                }`}
              >
                <h3>{childName}</h3>
              </div>
            ))}
          </div>
        </div>
        {children[indexOfChildToBeViewed]}
      </div>
    </div>
  );
};

export default Settings;
