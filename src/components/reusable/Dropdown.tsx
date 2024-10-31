import React, { useState, useRef, useEffect, FC } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

interface iMenuItem {
  name: string;
  onClick: () => void;
}

const Dropdown: FC<{
  menus: iMenuItem[];
  value: string;
  hint: string;
  bare?: boolean;
  loading?: boolean;
}> = ({ menus, value, hint, bare, loading }) => {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full h-full">
      <div
        onClick={() => {
          if (loading && loading) return;
          setOpen(!open);
        }}
        className={`
          ${
            bare && bare
              ? ""
              : open
              ? "ring-2 ring-purple-300"
              : "border border-gray-4"
          } 
        rounded-lg p-2 w-full h-full cursor-pointer text-filter-select`}
      >
        <div
          className={`relative flex items-center justify-start w-full h-full`}
        >
          {loading && loading ? (
            <p className="text-gray-2 font-medium">Loading</p>
          ) : (
            <>
              {value === "" && <p className="text-gray-3">{hint}</p>}
              <p className="line-clamp-1 text-gray-2 font-medium">{value}</p>
              <IoMdArrowDropdown
                size={16}
                className={`${
                  open ? "text-purple-300" : "text-gray-3"
                } absolute top-1/2 -translate-y-1/2 right-0`}
              />
            </>
          )}
        </div>
      </div>
      {open && (
        <div
          className={`flex justify-start items-center bg-white absolute z-50 p-2 w-fit left-0 right-0 rounded-lg top-8 shadow-custom`}
        >
          <div
            className={`w-full flex flex-col max-h-[200px] overflow-y-scroll gap-1 scrollbar-thin scrollbar-webkit `}
          >
            {menus.map((menu, i) => (
              <div
                key={i}
                className="w-full cursor-pointer hover:bg-secondary-accent p-1.5 rounded text-filter-select"
                onClick={() => {
                  menu.onClick();
                  setOpen(false);
                }}
              >
                {menu.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
