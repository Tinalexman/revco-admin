import React, { FC } from "react";

const Tooltip: FC<{ text: string; visible: boolean }> = ({ text, visible }) => {
  return (
    <div
      className={`absolute left-16 z-10 ${
        visible
          ? "opacity-100 translate-x-0 scale-100"
          : "opacity-0 translate-x-40 scale-0"
      } text-dash-slider rounded px-3 py-1 shadow-custom bg-primary-accent transition-all duration-300 ease-in-out`}
    >
      {text}
    </div>
  );
};

export default Tooltip;
