/* eslint-disable react/prop-types */
const Button = ({
  text,
  bg = "bg-primary hover:bg-transparent hover:text-primary",
  height = "h-[41px]",
  width = "w-full sm:w-auto",
  color = "text-white",
  className = "",
  ...rest
}) => {
  return (
    <button
      className={`grid place-items-center capitalize transition-all duration-300 text-sm md:text-base font-semibold 
        ${color} ${width} ${bg} ${height} border-2 border-primary rounded-md ${className}`}
      {...rest}
    >
      {text}
    </button>
  );
};

export default Button;
