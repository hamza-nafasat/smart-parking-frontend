import React from 'react';
import Wallet from './components/Wallet';
import CustomAreaChart from '../../../components/charts/CustomAreaChart';

import Map from './components/Map';
import CustomBarChart from '../../../components/charts/CustomBarChart';
import BookingTable from './components/BookingTable';
import MultiLineChart from '../../../components/charts/MultiLineChart';
import Weather from '../../../components/shared/large/Weather';
import weatherBg from '../../../assets/images/dashboard/WeatherBg.png';
import Button from '../../../components/shared/small/Button';
import Watchlist from './components/Watchlist';
import { revenueOverviewData, watchlistData } from '../../../data/data';
import { dashboardBookingData, dashboradColumns } from './utils/DashboardColumn';
import GlobalTable from '../../../components/shared/large/GlobalTable';
import { useNavigate } from 'react-router-dom';
import { useGetAllBookingsOfTodayForAdminQuery } from '../../../redux/apis/bookingApis';
import { useState, useEffect } from 'react';

const data = [
  {
    name: 'Page A',
    uv: 700,
    color: '#8884d8',
    startColor: '#0D5546',
    endColor: '#1CBB9B',
  },
  {
    name: 'Page B',
    uv: 700,
    color: '#82ca9d',
    startColor: '#0D5546',
    endColor: '#1CBB9B',
  },
  {
    name: 'Page C',
    uv: 600,
    color: '#ffc658',
    startColor: '#0D5546',
    endColor: '#1CBB9B',
  },
  {
    name: 'Page D',
    uv: 500,
    color: '#d84f91',
    startColor: '#0D5546',
    endColor: '#1CBB9B',
  },
  {
    name: 'Page E',
    uv: 800,
    color: '#f67280',
    startColor: '#0D5546',
    endColor: '#1CBB9B',
  },
  {
    name: 'Page F',
    uv: 800,
    color: '#6a0572',
    startColor: '#0D5546',
    endColor: '#1CBB9B',
  },
  {
    name: 'Page G',
    uv: 650,
    color: '#355c7d',
    startColor: '#0D5546',
    endColor: '#1CBB9B',
  },
  {
    name: 'Page H',
    uv: 950,
    color: '#c06c84',
    startColor: '#0D5546',
    endColor: '#1CBB9B',
  },
];
const gradients = [
  { startColor: '#0D5546', endColor: '#1CBB9B' },
  { startColor: '#90307B', endColor: '#F652D2' },
  { startColor: '#232178', endColor: '#3F3CD8' },
  { startColor: '#633639', endColor: '#C96E73' },
  { startColor: '#0D5546', endColor: '#1CBB9B' },
  { startColor: '#90307B', endColor: '#F652D2' },
  { startColor: '#232178', endColor: '#3F3CD8' },
  { startColor: '#633639', endColor: '#C96E73' },
];

const multiLineData = [
  { name: 'Monday', space1: 400, space2: 400, space3: 400, space4: 100 },
  { name: 'Tuesday', space1: 500, space2: 398, space3: 210, space4: 600 },
  { name: 'Wednesday', space1: 100, space2: 800, space3: 690, space4: 300 },
  { name: 'Thursday', space1: 700, space2: 608, space3: 200, space4: 500 },
  { name: 'Friday', space1: 250, space2: 200, space3: 681, space4: 400 },
  { name: 'Saturday', space1: 400, space2: 50, space3: 381, space4: 200 },

  { name: 'Sunday', space1: 100, space2: 250, space3: 281, space4: 100 },
];
const lineConfigs = [
  { dataKey: 'space1', stroke: '#FAA80E' },
  { dataKey: 'space2', stroke: '#18BC9C' },
  { dataKey: 'space3', stroke: '#1B7AA6' },
  { dataKey: 'space4', stroke: '#18BC9C' },
];

const reveniewData = [
  { name: 'Mon', uv: 1000 },
  { name: 'Tue', uv: 1200 },
  { name: 'Wed', uv: 1800 },
  { name: 'Thu', uv: 1200 },
  { name: 'Fri', uv: 1900 },
  { name: 'Sat', uv: 1000 },
  { name: 'Sun', uv: 1600 },
  { name: 'Mon', uv: 1000 },
  { name: 'Tue', uv: 1500 },
  { name: 'Wed', uv: 1100 },
  { name: 'Thu', uv: 800 },
  { name: 'Fri', uv: 1900 },
  { name: 'Sat', uv: 300 },
  { name: 'Sun', uv: 1500 },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [dashboardBookingData, setDashboardBookingData] = useState([]);
  const { data: bookingData } = useGetAllBookingsOfTodayForAdminQuery();

  console.log('dashboardBookingData', dashboardBookingData);

  useEffect(() => {
    if (bookingData) {
      setDashboardBookingData(bookingData?.data);
    }
  }, [bookingData]);
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 xl:col-span-4">
        <Wallet />
      </div>
      <div className="col-span-12 xl:col-span-8">
        <div className="bg-white rounded-lg border-[1px] shadow-lg h-full">
          <h3 className="font-bold text-base p-3">Revenue Overview</h3>
          <CustomAreaChart data={revenueOverviewData} color="#00C49F" showGradient />
        </div>
      </div>
      <div className="col-span-12 xl:col-span-3">
        <div className="bg-white rounded-lg border-[1px] shadow-lg h-full p-3">
          <div className="flex justify-between items-center mb-3">
            <h5 className="text-sm md:text-base">Watchlist</h5>
            {/* <button className="text-primary flex gap-1 items-center"> */}
            {/* Daily AVG <BiChevronDown fontSize={22} />{" "} */}
            <select className="w-[90px] bg-transparent border-none focus:outline-none text-xs md:text-base text-primary">
              <option value="">Daily</option>
              <option value="">Weekly</option>
              <option value="">Monthly</option>
            </select>
            {/* </button> */}
          </div>
          <div className="max-h-[275px] overflow-y-auto custom-scroll">
            {watchlistData.map((watchlist) => (
              <Watchlist
                key={watchlist.id}
                name={watchlist.name}
                id={watchlist.id}
                arrow={watchlist.arrow}
                blankChartData={watchlist.blankChartData}
                areaColor={watchlist.areaColor}
              />
            ))}
          </div>
          <div className="flex justify-center mt-5">
            <Button
              text="Details"
              width="w-[100px]"
              bg=" hover:bg-[#18BC9C4D] hover:text-[#18BC9C] text-[#fff] bg-[#18BC9C] border-none"
            />
          </div>
        </div>
      </div>
      <div className="border-[1px] col-span-12 xl:col-span-6 ">
        <Map />
      </div>
      <div className=" col-span-12 xl:col-span-3 ">
        <div
          className="bg-white p-3 rounded-lg border-[1px] shadow-lg h-full bg-auto bg-no-repeat"
          style={{ backgroundImage: `url(${weatherBg})` }}
        >
          <Weather />
        </div>
      </div>
      <div className="col-span-12 xl:col-span-7">
        <div className="bg-white rounded-lg border-[1px] shadow-lg h-full">
          <h3 className="font-bold text-base p-3">Top 4 Building Parking Space</h3>
          <MultiLineChart
            data={multiLineData}
            lineConfigs={lineConfigs}
            showGrid={false}
            showXAxis={true}
            showYAxis={true}
            height={300}
          />
        </div>
      </div>
      <div className="col-span-12 xl:col-span-5">
        <div className="bg-white rounded-lg border-[1px] shadow-lg h-full">
          <h3 className="font-bold text-base p-3">Top 4 Building Parking Space</h3>
          <CustomBarChart gradients={gradients} data={data} showGrid={false} />
        </div>
      </div>

      <div className="col-span-12">
        <div className="bg-white rounded-lg border-[1px] shadow-lg h-full p-3">
          <GlobalTable
            columns={dashboradColumns(navigate)}
            data={dashboardBookingData}
            heading="Today Parking Booking Summary"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
