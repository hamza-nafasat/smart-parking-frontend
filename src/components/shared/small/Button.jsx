/* eslint-disable react/prop-types */
const Button = ({ text, bg, height, width, disabled = false, color, ...rest }) => {
  return (
    <button
      className={`grid place-items-center capitalize transition-all duration-300 text-sm md:text-base font-semibold ${
        color ? color : "text-white"
      } ${width ? width : "w-full sm:w-auto"} ${bg ? bg : "bg-primary hover:bg-transparent hover:text-primary"} ${
        height ? height : "h-[41px]"
      } border-2 border-primary rounded-md ${disabled && "cursor-not-allowed opacity-30"}`}
      {...rest}
    >
      {text}
    </button>
  );
};

export default Button;
