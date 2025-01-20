import React from "react";

const Button = ({ text, bg, border, height, width, color, ...rest }) => {
  return (
    <button
      className={`grid place-items-center capitalize transition-all duration-300 text-sm md:text-base font-semibold ${
        color ? color : "text-white"
      } ${width ? width : "w-full sm:w-auto"} ${
        bg ? bg : "bg-primary hover:bg-transparent hover:text-primary"
      } ${height ? height : "h-[41px]"} border-2 border-primary rounded-md`}
      {...rest}
    >
      {text}
    </button>
  );
};

export default Button;
