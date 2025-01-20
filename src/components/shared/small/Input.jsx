import React from "react";

const Input = ({ label, ...rest }) => {
  return (
    <>
      {label && (
        <label className="text-xs md:text-sm text-[#000] mb-1 block">
          {label}
        </label>
      )}
      <input
        className="w-full h-[45px] px-4 border border-[#E0E0E9] rounded-lg text-sm text-[#383838E5] focus:outline-none"
        {...rest}
      />
    </>
  );
};

export default Input;
