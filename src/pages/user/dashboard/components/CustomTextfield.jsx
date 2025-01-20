import React from "react";
import { CiSearch } from "react-icons/ci";
import { ImLocation2 } from "react-icons/im";

const CustomTextfield = ({ type = "text", placeholder, intext, icon }) => {
  return (
    <div className="flex items-center gap-1 bg-[#F9FBFF] border border-[#e7e7e7] rounded-[10px] py-2 px-4 w-full">
      {/* <{CiSearch} fontSize={20} color="#7E7E7E" /> */}
      {icon}
      <p className="text-xs font-bold md:text-base text-[#7E7E7E] text-nowrap">
        {intext}
      </p>
      <input
        type={type}
        placeholder={placeholder}
        className="placeholder:text-sm w-full text-xs md:text-base bg-transparent border-none focus:outline-none text-[#7E7E7E]"
      />
    </div>
  );
};

export default CustomTextfield;
