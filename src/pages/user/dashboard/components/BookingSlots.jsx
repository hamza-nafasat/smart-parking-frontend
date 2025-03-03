import { useEffect, useState } from "react";
import CustomTextfield from "./CustomTextfield";
import {
  BackIcon,
  CalenderSm,
  LocationIcon,
  TimeSm,
  TwentyFourSevenIcon,
} from "../../../../assets/svgs/Icon";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";
import { AvailabilityBar } from "./ParkingLotCard";
import { useNavigate } from "react-router-dom";
import ShowSingleFloor from "./ShowSingleFloor";
import { canvasData } from "../utils/dashboardData";

const BookingSlots = () => {
  const [bookingOpen, setBookingOpen] = useState(true);
  const [selectedFloor, setSelectedFloor] = useState(canvasData[0]);
  const handleToggleSideBooking = () => {
    setBookingOpen(!bookingOpen);
  };

  console.log("selectedFloor", selectedFloor);

  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-4 relative">
      <div className="md:flex-row flex-col items-center shadow-md rounded-lg p-3 border-[1px] flex justify-between gap-5 w-full">
        <div className="flex gap-4 items-center">
          <div onClick={() => navigate(-1)} className="cursor-pointer">
            <BackIcon />
          </div>
          <div>
            <h3>name</h3>
            <div className="flex items-center gap-3">
              <div>
                <LocationIcon />
              </div>
              <h5 className="text-[8px]">
                1220 E St NW, Washington, DC 20004{" "}
              </h5>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <CustomTextfield
            type="date"
            placeholder="Washington, DC"
            intext="Date:"
            icon={<CalenderSm fontSize={18} color="#7E7E7E" />}
          />
          <CustomTextfield
            type="time"
            placeholder="Independence Ave , NW"
            intext="Start time:"
            icon={<TimeSm fontSize={20} color="#7E7E7E" />}
          />
          <CustomTextfield
            type="time"
            placeholder="Independence Ave , NW"
            intext="End time:"
            icon={<TimeSm fontSize={20} color="#7E7E7E" />}
          />
        </div>
      </div>
      <div className="fixed top-80 right-0 z-[999]">
        <div
          onClick={handleToggleSideBooking}
          className="bg-primary text-white cursor-pointer py-3 px-20 rounded-t-md text-sm font-bold flex gap-2 items-center"
        >
          <HiOutlineArrowLeft
            className={`transition-all duration-300 ${
              bookingOpen ? "rotate-180" : "rotate-0"
            }`}
            fontSize={16}
          />
          Floor B-1
        </div>
        <div
          className={`fixed right-0 transition-transform duration-300 ${
            bookingOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <CurrentFloorPlaceList
            lists={canvasData}
            setSelectedFloor={setSelectedFloor}
          />
        </div>
      </div>
      <div className="w-full flex items-start gap-5">
        <div className="flex flex-col md:flex-row gap-2 items-center mb-5">
          <div className={`flex flex-col gap-1"}`}>
            <h3 className="text-base md:text-lg font-bold">Floor Name</h3>
            <div className="flex gap-2 items-center">
              <LocationIcon />

              <p className="text-[#9FA1A8] text-[10px]">
                1051 18th St NW, Washington, DC 20006
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <TwentyFourSevenIcon />

              <p className="text-[#9FA1A8] text-[10px]">
                24 hours CCTV and Parking services
              </p>
            </div>
          </div>
        </div>
        <ShowSingleFloor
          image={
            "http://res.cloudinary.com/hamzanafasat/image/upload/v1735559710/air-quality/buildings/xvb74louowwj6qa5vaj3.jpg"
          }
          polygons={[selectedFloor]}
          view="building-view"
        />
      </div>
    </div>
  );
};

export default BookingSlots;

const CurrentFloorPlaceList = ({ lists, setSelectedFloor }) => {
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
        {lists?.map((list, i) => (
          <SingleBasement
            key={i}
            list={list}
            setSelectedFloor={setSelectedFloor}
          />
        ))}
      </div>
    </div>
  );
};

const SingleBasement = ({ list, setSelectedFloor }) => {
  return (
    <div
      className="py-2 border-b-[1px] cursor-pointer"
      onClick={() => setSelectedFloor(list)}
    >
      <AvailabilityBar level="low" />
      <div className="flex items-center justify-between">
        <h1 className="text-base">{list?.id}</h1>
        <div className="flex flex-col items-center">
          <p className="text-[8px] text-gray-500">Free Space</p>
          <p className="font-bold">102 Sp</p>
        </div>
      </div>
    </div>
  );
};
