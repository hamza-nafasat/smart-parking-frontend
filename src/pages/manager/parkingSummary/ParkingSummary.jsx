import GlobalTable from '../../../components/shared/large/GlobalTable';
import { useGetAllBookingsQuery } from '../../../redux/apis/bookingApis';
import useDebounce from '../../../components/hooks/useDebounce';
import { useState } from 'react';

const parkingSummaryColumns = () => [
  {
    name: 'Reservation ID',
    selector: (row) => row?._id,
  },
  {
    name: 'Building Name',
    selector: (row) => row?.building?.name,
  },
  {
    name: 'Phone Number',
    selector: (row) => row?.contactNumber,
  },
  {
    name: 'Vehicle Info',
    selector: (row) => row?.plateNumber,
  },
  {
    name: 'Start Date',
    selector: (row) => row?.startTime,
  },
  {
    name: 'End Date',
    selector: (row) => row?.endTime,
  },
  {
    name: 'Payment Status',
    selector: (row) => row?.paymentStatus,
  },
];
const ParkingSummary = () => {
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

  return (
    <div>
      <GlobalTable
        heading="Parking Booking Summary"
        columns={parkingSummaryColumns()}
        data={data?.data}
        searchData={handleBookingSearchData}
        orderData={handleBookingOrderData}
      />
    </div>
  );
};

export default ParkingSummary;
