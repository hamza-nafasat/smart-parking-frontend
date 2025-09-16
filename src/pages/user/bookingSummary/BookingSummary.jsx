import { CiSearch } from 'react-icons/ci';
import BookingList from './components/BookingList';
import { buildingSummaryListData } from './utils/booking';
import { useState } from 'react';
import useDebounce from '../../../components/hooks/useDebounce';

const BookingSummary = () => {
  const [searchValue, setSearchValue] = useState('');
  const [orderStatus, setOrderStatus] = useState('newest');

  const handleSearch = (e) => setSearchValue(e.target.value);

  const handleOrderStatus = (e) => setOrderStatus(e.target.value);

  const debouncedValue = useDebounce(searchValue, 500);

  return (
    <div className="md:border md:border-[#E7E7E7] md:shadow-md md:rounded-[16px] p-5">
      <div className="flex items-center justify-between gap-4 mb-3">
        <h2 className="text-base font-bold text-[#414141]">Booking History</h2>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 bg-[#F9FBFF] border border-[#e7e7e7] rounded-[10px] py-2 px-4">
            <CiSearch fontSize={20} color="#7E7E7E" />
            <input
              type="text"
              placeholder="Search"
              className="w-full text-xs md:text-base bg-transparent border-none focus:outline-none text-[#7E7E7E]"
              onChange={handleSearch}
            />
          </div>
          <div className="flex items-center gap-2 bg-[#F9FBFF] border border-[#e7e7e7] rounded-[10px] py-2 px-4">
            <p className="text-xs md:text-base text-[#7E7E7E] text-nowrap">Short by:</p>
            <select
              className="w-full bg-transparent border-none focus:outline-none text-xs md:text-base text-[#3D3C42]"
              onChange={handleOrderStatus}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Older</option>
            </select>
          </div>
        </div>
      </div>
      <BookingList listData={buildingSummaryListData} search={debouncedValue} order={orderStatus} />
    </div>
  );
};

export default BookingSummary;
