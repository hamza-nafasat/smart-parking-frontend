import { useState } from "react";
import ParkingLotCard from "./components/ParkingLotCard";
import VisitedParkingCard from "./components/VisitedParkingCard";
import { parkingLotDatas, visitedParking } from "./utils/dashboardData";
import Map from "./components/Map";
import { CiSearch } from "react-icons/ci";
import { HiOutlineArrowLeft } from "react-icons/hi";
import CustomTextfield from "./components/CustomTextfield";
import { ImLocation2 } from "react-icons/im";
import { CalenderSm, TimeSm } from "../../../assets/svgs/Icon";

const UserDashboard = () => {
  const totalLot = parkingLotDatas.length;
  const [bookingOpen, setBookingOpen] = useState(false);
  const handleToggleSideBooking = () => {
    setBookingOpen(!bookingOpen);
  };

  return (
    <div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4  justify-between">
        <div className="">
          <h4 className="text-sm md:text-base font-bold">Where</h4>
          <div className="flex flex-col md:flex-row items-center md:gap-5 gap-2">
            <CustomTextfield
              placeholder="Washington, DC"
              intext="You are in:"
              icon={<ImLocation2 fontSize={20} color="#7E7E7E" />}
            />
            <CustomTextfield
              placeholder="Independence Ave , NW"
              intext="Street:"
              icon={<ImLocation2 fontSize={20} color="#7E7E7E" />}
            />
          </div>
        </div>
        <div>
          <h4 className="text-sm md:text-base font-bold">When</h4>
          <div className="flex flex-col md:flex-row items-center md:gap-5 gap-2 ">
            <CustomTextfield
              type="date"
              placeholder="Washington, DC"
              intext="Date:"
              icon={<CalenderSm fontSize={18} color="#7E7E7E" />}
            />
            <CustomTextfield
              type="time"
              placeholder="Independence Ave , NW"
              intext="Time:"
              icon={<TimeSm fontSize={20} color="#7E7E7E" />}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 relative">
        <div className="fixed right-0 z-[999]">
          <div
            onClick={handleToggleSideBooking}
            className="bg-primary text-white cursor-pointer py-3 px-7 rounded-t-md text-sm font-bold flex gap-2 items-center"
          >
            <HiOutlineArrowLeft
              className={`transition-all duration-300 ${
                bookingOpen ? "rotate-180" : "rotate-0"
              }`}
              fontSize={16}
            />
            View Current Bookings
          </div>
          <div
            className={`fixed right-0 transition-transform duration-300 ${
              bookingOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <CurrentBookingList />
          </div>
        </div>
        {/* Left Column (Fixed col-span-4) */}
        <div className="col-span-12 xl:col-span-4 mt-4">
          <p className="mb-2 flex items-center text-sm text-[#B5B7C0] gap-1">
            There are{" "}
            <span className="font-bold text-sm text-[#000]">
              {totalLot} parking lots
            </span>{" "}
            in Washington DC
          </p>
          <div className="space-y-2">
            {" "}
            {/* Wrap ParkingLotCard items in a container */}
            {parkingLotDatas?.map((item, i) => (
              <ParkingLotCard key={i} level={item?.level} name={item?.name} />
            ))}
          </div>
        </div>
        <div className="col-span-12 xl:col-span-8 mt-4 flex flex-col">
          <div className="mb-4">
            <Map />
          </div>
          <div className="p-5 border-[2px] shadow-md rounded-md">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
              <h2 className="text-base font-bold text-[#414141]">
                Your most visited car parks
              </h2>
              <div className="flex md:flex-row flex-col items-center gap-5">
                <div className="flex items-center gap-2 bg-[#F9FBFF] border border-[#e7e7e7] rounded-[10px] py-2 px-4">
                  <CiSearch fontSize={20} color="#7E7E7E" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full text-xs md:text-base bg-transparent border-none focus:outline-none text-[#7E7E7E]"
                  />
                </div>
                <div className="w-full flex items-center gap-2 bg-[#F9FBFF] border border-[#e7e7e7] rounded-[10px] py-2 px-4">
                  <p className="text-xs md:text-base text-[#7E7E7E] text-nowrap">
                    Short by:
                  </p>
                  <select className="w-full bg-transparent border-none focus:outline-none text-xs md:text-base text-[#3D3C42]">
                    <option value="">Newest</option>
                    <option value="">Older</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <VisitedParkingCard listData={visitedParking} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

const CurrentBookingList = () => {
  return (
    <div className="w-[230px] p-2 bg-white rounded-b-md border-[1px] border-primary shadow-md h-[500px] overflow-auto custom-scroll">
      <div className="flex items-center gap-2 bg-[#F9FBFF] border border-[#e7e7e7] rounded-[10px] py-1 px-2">
        <CiSearch fontSize={20} color="#18BC9C" />
        <input
          type="text"
          placeholder="Search"
          className="placeholder:text-primary w-full text-xs md:text-sm bg-transparent border-none focus:outline-none text-[#7E7E7E]"
        />
      </div>
      <div>
        <SingleBookingCard />
        <SingleBookingCard />

        <SingleBookingCard />
        <SingleBookingCard />
        <SingleBookingCard />
        <SingleBookingCard />
      </div>
    </div>
  );
};

const SingleBookingCard = () => {
  return (
    <div className="py-2 border-b-[2px] flex flex-col items-center gap-2">
      <img
        src="https://placehold.co/240x43"
        alt="image"
        className="w-[204px] h-[43px] rounded-xl object-cover"
      />
      <div className="w-full flex justify-between">
        <div className="flex flex-col">
          <p className="text-xs font-[700]">The Portals Parking</p>
          <p className="text-xs font-[500]">Basement Floor-B12</p>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-xs font-[700]">Date</p>
          <p className="text-xs font-[500]">10/07/2024</p>
        </div>
      </div>
      <div className="w-full flex justify-between items-center">
        <p className="text-base font-bold">B-12</p>
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <p className="text-xs font-[700]">Start Time</p>
            <p className="text-xs font-[500]">11:30 am</p>
          </div>
          <div className="flex flex-col">
            <p className="text-xs font-[700]">End Time</p>
            <p className="text-xs font-[500]">06:30 am</p>
          </div>
        </div>
      </div>
    </div>
  );
};
