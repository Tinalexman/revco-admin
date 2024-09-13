import React from "react";

const Settings = () => {
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
    </div>
  );
};

export default Settings;
