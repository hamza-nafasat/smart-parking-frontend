/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { useNavigate, useParams } from 'react-router-dom';
import { BackIcon, LocationIcon, TwentyFourSevenIcon } from '../../../../assets/svgs/Icon';
import { useGetSingleBuildingQuery } from '../../../../redux/apis/buildingApis';
import { useGetAllFloorsQuery } from '../../../../redux/apis/floorApis';
import { useGetAllSlotsQuery } from '../../../../redux/apis/slotApis';
import { canvasData } from '../utils/dashboardData';
import { AvailabilityBar } from './ParkingLotCard';
import ShowSingleFloor from './ShowSingleFloor';

const BookingSlots = () => {
  const buildingId = useParams().buildingId;
  const [bookingOpen, setBookingOpen] = useState(true);
  const [selectedFloor, setSelectedFloor] = useState([]);
  const [floors, setFloors] = useState(canvasData);
  const [polygons, setPolygons] = useState([]);
  const { data: building } = useGetSingleBuildingQuery(buildingId);
  const { data } = useGetAllFloorsQuery(buildingId);
  const { data: slots, refetch } = useGetAllSlotsQuery(selectedFloor?._id);

  useEffect(() => {
    if (data?.data) {
      setFloors(data.data);
      setSelectedFloor(data?.data?.[0]);
      refetch(data?.data?.[0]?._id);
    }
  }, [data?.data, refetch]);

  useEffect(() => {
    if (slots?.data) {
      setPolygons(slots?.data);
    }
  }, [slots?.data]);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-4 relative">
      <div onClick={() => navigate(-1)} className="cursor-pointer self-start">
        <BackIcon />
      </div>
      {/* ====================================== */}
      <div className="fixed top-80 right-0 z-[999]">
        <div
          onClick={() => setBookingOpen(!bookingOpen)}
          className="bg-primary text-white cursor-pointer py-3 px-20 rounded-t-md text-sm font-bold flex gap-2 items-center"
        >
          <HiOutlineArrowLeft
            className={`transition-all duration-300 ${bookingOpen ? 'rotate-180' : 'rotate-0'}`}
            fontSize={16}
          />
          Floors
        </div>
        <div
          className={`fixed right-0 transition-transform duration-300 ${
            bookingOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <CurrentFloorPlaceList floors={floors} setSelectedFloor={setSelectedFloor} refetch={refetch} />
        </div>
      </div>
      {/* ====================================== */}
      <div className="w-full flex items-start gap-5">
        <div className="flex flex-col md:flex-row gap-2 items-center mb-5">
          <div className={`flex flex-col gap-1"}`}>
            <h3 className="text-base md:text-lg font-bold">{selectedFloor?.name}</h3>
            <div className="flex gap-2 items-center">
              <LocationIcon />

              <p className="text-[#9FA1A8] text-[10px]">{building?.data?.address}</p>
            </div>
            <div className="flex gap-2 items-center">
              <TwentyFourSevenIcon />

              <p className="text-[#9FA1A8] text-[10px]">24 hours CCTV and Parking services</p>
            </div>
          </div>
        </div>
        <ShowSingleFloor image={selectedFloor?.twoDImage?.url} polygons={polygons} view="Floor View" />
      </div>
    </div>
  );
};

export default BookingSlots;

const CurrentFloorPlaceList = ({ floors, setSelectedFloor, refetch }) => {
  return (
    <div className="w-[246px] p-2 bg-white rounded-b-md border-[1px] border-primary shadow-md h-[500px] overflow-auto custom-scroll">
      <div className="flex items-center gap-2 bg-[#F9FBFF] border border-[#e7e7e7] rounded-[10px] py-1 px-2">
        <CiSearch fontSize={20} color="#18BC9C" />
        <input
          type="text"
          placeholder="Search"
          className="placeholder:text-primary w-full text-xs md:text-sm bg-transparent border-none focus:outline-none text-[#7E7E7E]"
        />
      </div>
      <div>
        {floors?.map((floor, i) => (
          <SingleBasement key={i} floor={floor} setSelectedFloor={setSelectedFloor} refetch={refetch} />
        ))}
      </div>
    </div>
  );
};

const SingleBasement = ({ floor, setSelectedFloor, refetch }) => {
  const onClick = async () => {
    await refetch(floor?._id);
    setSelectedFloor(floor);
  };
  return (
    <div className="py-2 border-b-[1px] cursor-pointer" onClick={onClick}>
      <AvailabilityBar level={floor?.availability} />
      <div className="flex items-center justify-between">
        <h1 className="text-base">{floor?.id}</h1>
        <div className="flex flex-col items-center">
          <p className="text-[8px] text-gray-500">{floor?.name}</p>
          <p className="font-bold">
            {floor?.availableSlots}/{floor?.totalSlots} free
          </p>
        </div>
      </div>
    </div>
  );
};
