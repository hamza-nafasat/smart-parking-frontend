/* eslint-disable react/prop-types */
import DataTable from 'react-data-table-component';
import { tableStyles } from '../small/dataTableStyles';
import { CiSearch } from 'react-icons/ci';
import { useState } from 'react';
import useDebounce from '../../hooks/useDebounce';

const GlobalTable = ({ heading, data, columns, searchData, orderData }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
    searchData(e.target.value);
  };
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm md:text-base font-bold text-[#414141]">{heading}</h3>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-[#F9FBFF] border border-[#e7e7e7] rounded-[10px] py-2 px-4">
            <CiSearch fontSize={20} color="#7E7E7E" />
            <input
              type="text"
              value={inputValue}
              placeholder="Search By Name"
              onChange={handleChange}
              className="w-full text-xs md:text-base bg-transparent border-none focus:outline-none text-[#7E7E7E]"
            />
          </div>
          <div className="flex items-center gap-2 bg-[#F9FBFF] border border-[#e7e7e7] rounded-[10px] py-2 px-4">
            <p className="text-xs md:text-base text-[#7E7E7E] text-nowrap">Short by:</p>
            <select
              className="w-full bg-transparent border-none focus:outline-none text-xs md:text-base text-[#3D3C42]"
              onChange={orderData}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Older</option>
            </select>
          </div>
        </div>
      </div>
      <div className="mt-4 md:mt-6">
        <DataTable columns={columns} data={data} customStyles={tableStyles} pagination />
      </div>
    </div>
  );
};

export default GlobalTable;
