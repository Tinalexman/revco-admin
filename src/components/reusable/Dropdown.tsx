import React, { FC } from "react";

const Dropdown: FC<{
  visible: boolean;
  menus: {
    name: string;
    onClick: () => void;
  }[];
}> = ({ visible, menus }) => {
  return (
    <div
      className={`flex flex-col gap-2 w-[200px] px-3 py-2 bg-white dark:bg-monokai shadow-custom-black dark:shadow-custom-white absolute -bottom-5 z-10 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
    >
      {menus.map((menu, index) => {
        return (
          <div
            className="cursor-pointer transition-all ease-out duration-200 px-2 py-1 rounded hover:bg-neutral-light dark:hover:bg-neutral-dark hover:text-monokai dark:hover:text-white text-lg"
            key={index}
            onClick={menu.onClick}
          >
            {menu.name}
          </div>
        );
      })}
    </div>
  );
};

export default Dropdown;
