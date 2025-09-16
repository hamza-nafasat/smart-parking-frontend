import { CiSearch } from 'react-icons/ci';
import BuildingList from '../../../components/shared/large/BuildingList';
import { useState } from 'react';
import useDebounce from '../../../components/hooks/useDebounce';

const BuildingInfo = () => {
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 500);
  return (
    <div className="md:border md:border-[#E7E7E7] md:shadow-md md:rounded-[16px]">
      <div className="flex items-center justify-between gap-4 py-4 md:px-6">
        <h2 className="text-base font-bold text-[#414141]">Building Manager List</h2>
        <div className="flex items-center gap-2 bg-[#F9FBFF] border border-[#e7e7e7] rounded-[10px] py-2 px-4">
          <CiSearch fontSize={20} color="#7E7E7E" />
          <input
            type="text"
            placeholder="Search"
            className="w-full text-xs md:text-base bg-transparent border-none focus:outline-none text-[#7E7E7E]"
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
      </div>
      <div className="border-t border-[#E7E7E7]"></div>
      <div className="pb-4 md:px-6">
        <BuildingList search={debouncedValue} />
      </div>
    </div>
  );
};

export default BuildingInfo;
