import { useNavigate } from 'react-router-dom';
import GlobalTable from '../../../components/shared/large/GlobalTable';
import { bookingSummaryColumns } from './components/ParkingSummaryColumns';
import { useGetAllBookingsQuery } from '../../../redux/apis/bookingApis';
import { useEffect, useState } from 'react';
import useDebounce from '../../../components/hooks/useDebounce';

const ParkingSummary = () => {
  const navigate = useNavigate();
  const [parkingSummaryData, setParkingSummaryData] = useState([]);
  const [bookingName, setBookingName] = useState('');
  const [bookingOrder, setBookingOrder] = useState('newest');
  const debouncedBookingName = useDebounce(bookingName, 500);
  const { data } = useGetAllBookingsQuery({ search: debouncedBookingName, order: bookingOrder });

  const handleBookingSearchData = (data) => {
    setBookingName(data);
  };

  const handleBookingOrderData = (data) => {
    setBookingOrder(data.target.value);
  };
  useEffect(() => {
    if (data) {
      setParkingSummaryData(data?.data);
    }
  });
  return (
    <div>
      <GlobalTable
        heading="Parking Booking Summary"
        columns={bookingSummaryColumns(navigate)}
        data={parkingSummaryData}
        searchData={handleBookingSearchData}
        orderData={handleBookingOrderData}
      />
    </div>
  );
};

export default ParkingSummary;
