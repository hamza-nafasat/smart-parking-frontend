import GlobalTable from '../../../components/shared/large/GlobalTable';
import { useGetAllBookingsQuery } from '../../../redux/apis/bookingApis';

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
  const { data } = useGetAllBookingsQuery();
  return (
    <div>
      <GlobalTable heading="Parking Booking Summary" columns={parkingSummaryColumns()} data={data.data} />
    </div>
  );
};

export default ParkingSummary;
