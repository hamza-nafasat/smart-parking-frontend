/* eslint-disable react/prop-types */
const Input = ({ label, readOnly = false, className = "", ...rest }) => {
  return (
    <>
      {label && <label className="text-xs md:text-sm text-[#000] mb-1 block">{label}</label>}
      <input
        className={`w-full h-[45px] px-4 border border-[#E0E0E9] rounded-lg text-sm text-[#383838E5] outline-none $
          ${readOnly && "pointer-events-none opacity-50"} ${className}`}
        readOnly={readOnly}
        {...rest}
      />
    </>
  );
};

export default Input;
