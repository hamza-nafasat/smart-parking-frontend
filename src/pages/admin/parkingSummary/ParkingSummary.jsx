import { useNavigate } from 'react-router-dom';
import GlobalTable from '../../../components/shared/large/GlobalTable';
import { bookingSummaryColumns } from './components/ParkingSummaryColumns';
import { useGetAllBookingsForAdminQuery } from '../../../redux/apis/bookingApis';
import { useEffect, useState } from 'react';
const ParkingSummary = () => {
  const navigate = useNavigate();
  const [parkingSummaryData, setParkingSummaryData] = useState([]);
  const { data } = useGetAllBookingsForAdminQuery();
  useEffect(() => {
    if (data) {
      setParkingSummaryData(data?.data);
    }
  });
  return (
    <div>
      <GlobalTable
        heading="Today Parking Booking Summary"
        columns={bookingSummaryColumns(navigate)}
        data={parkingSummaryData}
      />
    </div>
  );
};

export default ParkingSummary;
