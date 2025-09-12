import React from 'react';
import FloorView from './components/FloorView';
import Weather from '../../../components/shared/large/Weather';
import MultiLineChart from '../../../components/charts/MultiLineChart';
import { lineConfigs, multiLineData, parkingSpaceBarChartData } from './utils/ManagerDashboard';
import CustomBarChart from '../../../components/charts/CustomBarChart';
import GlobalTable from '../../../components/shared/large/GlobalTable';
import { dashboradColumns } from './components/ParkingColumns';
import { useNavigate } from 'react-router-dom';
import SpacesCard from './components/SpacesCard';
import SensorStatus from './components/SensorStatus';
import LineBarChart from '../../../components/charts/LineBarChart';
import Button from '../../../components/shared/small/Button';
import { useGetAllBookingsOfTodayForAdminAndManagerQuery } from '../../../redux/apis/bookingApis';
import { useState, useEffect } from 'react';
import useDebounce from '../../../components/hooks/useDebounce';

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const [bookingName, setBookingName] = useState('');
  const [bookingOrder, setBookingOrder] = useState('newest');
  const debouncedBookingName = useDebounce(bookingName, 500);
  const [dashboardBookingData, setDashboardBookingData] = useState([]);
  const { data: bookingData } = useGetAllBookingsOfTodayForAdminAndManagerQuery({
    search: debouncedBookingName,
    order: bookingOrder,
  });

  const handleBookingSearchData = (data) => {
    setBookingName(data);
  };

  const handleBookingOrderData = (data) => {
    setBookingOrder(data.target.value);
  };

  useEffect(() => {
    if (bookingData) {
      setDashboardBookingData(bookingData?.data);
    }
  }, [bookingData]);
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 lg:col-span-9 border border-[#2B2B2B33] rounded-lg shadow-md">
        <FloorView />
      </div>
      <div className="col-span-12 lg:col-span-3 border border-[#2B2B2B33] rounded-lg shadow-md p-4">
        <Weather />
      </div>
      <div className="col-span-12 lg:col-span-3 border border-[#2B2B2B33] rounded-lg shadow-md p-4">
        <SpacesCard
          data={{
            title: 'Today Overall Performance',
            value: 23,
            description: 'Sales up 27% from last month.',
            color: '#18BC9C',
            data: [23, 43, 140, 90, 30, 120, 33, 22],
          }}
        />
        <div className="flex justify-center">
          <LineBarChart fill="#18BC9C" />
        </div>
        <div className="flex justify-center">
          <Button text="Details" width="w-[100px]" bg="bg-[#18BC9C] text-[#18BC9C] border-none" />
        </div>
      </div>
      <div className="col-span-12 lg:col-span-3 border border-[#2B2B2B33] rounded-lg shadow-md p-4">
        <SpacesCard
          data={{
            title: 'Today Overall Performance',
            value: 78,
            description: 'Occupied space up 21% today.',
            color: '#F39C11',
            data: [999, 23, 44, 888, 678, 800, 33, 22],
          }}
        />
        <div className="flex justify-center">
          <LineBarChart fill="#F39C11" />
        </div>
        <div className="flex justify-center">
          <Button text="Details" width="w-[100px]" bg="bg-[#FAA80E] text-[#F39C11] border-none" />
        </div>
      </div>
      <div className="col-span-12 lg:col-span-3 border border-[#2B2B2B33] rounded-lg shadow-md p-4">
        <SpacesCard
          data={{
            title: 'Today Overall Performance',
            value: 45,
            description: 'Free parking space down 18% today.',
            color: '#1B7AA6',
            data: [222, 23, 455, 33, 1, 566, 33, 22],
          }}
        />
        <div className="flex justify-center">
          <LineBarChart fill="#1B7AA6" />
        </div>
        <div className="flex justify-center">
          <Button text="Details" width="w-[100px]" bg="bg-[#1B7AA6] text-[#1B7AA6] border-none" />
        </div>
      </div>
      <div className="col-span-12 lg:col-span-3 border border-[#2B2B2B33] rounded-lg shadow-md p-4">
        <SensorStatus />
      </div>
      <div className="col-span-12 lg:col-span-8 border border-[#2B2B2B33] rounded-lg shadow-md p-4">
        <h3 className="font-bold text-base">Top 4 Parking Space</h3>
        <MultiLineChart data={multiLineData} lineConfigs={lineConfigs} height={300} showGrid />
      </div>
      <div className="col-span-12 lg:col-span-4 border border-[#2B2B2B33] rounded-lg shadow-md p-4">
        <h3 className="font-bold text-base mb-4">Top parking space details</h3>
        <CustomBarChart
          data={parkingSpaceBarChartData}
          // gradients={parkingSpaceGradients}
        />
      </div>
      <div className="col-span-12 border border-[#2B2B2B33] rounded-lg shadow-md p-4">
        <GlobalTable
          columns={dashboradColumns(navigate)}
          data={dashboardBookingData}
          heading="Today Parking Booking Summary"
          searchData={handleBookingSearchData}
          orderData={handleBookingOrderData}
        />
      </div>
    </div>
  );
};

export default ManagerDashboard;
