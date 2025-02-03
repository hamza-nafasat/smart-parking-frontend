/* eslint-disable react/prop-types */
const ToggleButton = ({ isChecked, onToggle, className }) => {
  return (
    <div className={`relative inline-flex items-center ${className}`} onClick={onToggle}>
      <input className={`sr-only`} type="checkbox" checked={isChecked} onChange={() => {}} />
      <div className={`block w-12 h-7 rounded-full ${isChecked ? "bg-green-200" : "bg-gray-300"}`}>
        <div
          className={`dot absolute top-1 left-1 w-5 h-5 rounded-full transition-transform ${
            isChecked ? "transform translate-x-5 bg-green-500" : "bg-white"
          }`}
          style={{ transition: "transform 0.3s" }}
        ></div>
      </div>
    </div>
  );
};

export default ToggleButton;
