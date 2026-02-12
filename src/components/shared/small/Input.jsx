/* eslint-disable react/prop-types */
const Input = ({ label, leftIcon, rightIcon, disabled = false, readOnly = false, className = '', ...rest }) => {
  return (
    <>
      {label && <label className="text-xs md:text-sm text-[#000] mb-1 block">{label}</label>}

      <div className="relative">
        {/* Left Icon */}
        {leftIcon && <span className="absolute top-1/2 left-4 -translate-y-1/2 text-[#666666]">{leftIcon}</span>}
        <input
          className={`w-full h-[45px] px-4 border border-[#E0E0E9] rounded-lg text-sm text-[#383838E5] outline-none $
          ${readOnly && 'pointer-events-none opacity-50'} ${className}`}
          readOnly={readOnly}
          {...rest}
        />
        {rightIcon && (
          <span
            className={`absolute top-1/2 right-4 -translate-y-1/2 ${
              disabled ? 'cursor-not-allowed text-[#999]' : 'cursor-pointer text-[#666666]'
            }`}
          >
            {rightIcon}
          </span>
        )}
      </div>
    </>
  );
};

export default Input;
