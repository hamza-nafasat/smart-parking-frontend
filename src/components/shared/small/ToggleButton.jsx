const ToggleButton = ({ isChecked, onToggle }) => {
    return (
      <div className="">
        <div className="relative inline-flex items-center cursor-pointer" onClick={onToggle}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => {}}
            className="sr-only"
          />
          <div
            className={`block w-12 h-7 rounded-full ${
              isChecked ? "bg-green-200" : "bg-gray-300"
            }`}
          >
            <div
              className={`dot absolute top-1 left-1 w-5 h-5 rounded-full transition-transform ${
                isChecked ? "transform translate-x-5 bg-green-500" : "bg-white"
              }`}
              style={{ transition: 'transform 0.3s' }}
            ></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ToggleButton;