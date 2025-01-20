import React, { useState } from "react";
import Slider from "react-slick";
import { buildingsManagersListData } from "../../../../pages/admin/buildingInfo/utils/buildingData";
import {
  Calender,
  FreeSpaceIcon,
  HouseIcon,
  LocationIcon,
  OccupiedParkingIcon,
  RedDelete,
  SensorIssueIcon,
  Time,
  TotalParkingIcon,
  TwentyFourSevenIcon,
} from "../../../../assets/svgs/Icon";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Button from "../../../../components/shared/small/Button";
import { GoDotFill } from "react-icons/go";

// Carousel settings for image slider
const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 700,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnHover: true,
};

// Main component
const BookingList = ({ listData }) => {
  const [currentPage, setCurrentPage] = useState(0); // current page state
  const itemsPerPage = 4; // number of items per page

  // Calculate the buildings to display based on the current page
  const offset = currentPage * itemsPerPage;
  const currentBuildings = listData.slice(offset, offset + itemsPerPage);

  // Handler for page change
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div>
      {currentBuildings.map((data, index) => (
        <SingleBuilding key={index} data={data} />
      ))}

      <ReactPaginate
        previousLabel={
          <button className="flex justify-center items-center h-[30px] w-[30px] bg-[#EEEEEE] text-[#404B52] font-semibold rounded hover:bg-primary transition hover:text-white ">
            <FaChevronLeft fontSize={12} />
          </button>
        }
        nextLabel={
          <button className="flex justify-center items-center h-[30px] w-[30px] bg-[#EEEEEE] text-[#404B52] font-semibold rounded hover:bg-primary transition hover:text-white">
            <FaChevronRight fontSize={12} />
          </button>
        }
        breakLabel={"..."}
        pageCount={Math.ceil(listData.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"flex justify-end px-0 md:px-10 mt-4 space-x-4"}
        pageClassName={"inline-block"}
        pageLinkClassName={
          "flex justify-center items-center h-[30px] w-[30px]  border border-gray-300 text-[#404B52] rounded hover:bg-gray-100 transition"
        }
        activeClassName={"bg-primary rounded  text-white"}
        previousClassName={"inline-block"}
        nextClassName={"inline-block"}
        disabledClassName={"opacity-50 cursor-not-allowed"}
      />
    </div>
  );
};

export default BookingList;

// Single building component
const SingleBuilding = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-wrap justify-between gap-4 md:gap-6 building-slider border-b border-[#00000037] py-4">
      <div className="flex flex-wrap gap-4">
        {/* Image carousel */}
        <div className="w-[249px] h-[150px] rounded-xl overflow-hidden">
          <Slider {...carouselSettings}>
            {data?.buildingImages?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="image"
                className="w-[249px] h-[150px] rounded-xl object-cover"
              />
            ))}
          </Slider>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex gap-3 items-center mb-1">
              <h4 className="text-base md:text-xl font-bold text-[#000]">
                {data?.buildingName}
              </h4>
              <h3
                className={`flex items-center text-xs font-bold capitalize border-[1px] px-2 py-1 rounded-full ${
                  data.status === "active"
                    ? "text-primary border-primary"
                    : data.status === "completed"
                    ? "text-[#015948] border-[#015948]"
                    : data.status === "cancelled"
                    ? "text-[#AD1702] border-[#AD1702]"
                    : ""
                }`}
              >
                <GoDotFill />
                {data?.status}
              </h3>
              {data.status == "active" && (
                <div className="cursor-pointer p-1 flex justify-center items-center bg-[#FF474F14] rounded-full border-[1px] border-[#FF474F]">
                  <RedDelete />
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <HouseIcon />
              <p className="text-sm font-semibold text-[#47484b]">
                {data?.address}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 xl:gap-9 mt-6">
            <ParkingList
              data={{
                title: "Parking Spot",
                value: "B-13",
                icon: <TotalParkingIcon />,
              }}
            />
            <ParkingList
              data={{
                title: "Date",
                value: "10/07/2024",
                icon: <Calender />,
              }}
            />
            <ParkingList
              data={{
                title: "Start Time",
                value: " 06:30 pm",
                icon: <Time />,
              }}
            />
            <ParkingList
              data={{
                title: "End Time",
                value: "11:00 am",
                icon: <Time />,
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col mx-auto md:mx-0 items-center justify-center md:justify-between md:gap-0 gap-4">
        <Button text="Book Again" width="w-[100px]" />
        <button
          className="text-primary text-sm md:text-base font-bold underline h-fit"
          onClick={() => navigate(`/user/view-slip`)}
        >
          View Slip
        </button>
      </div>
    </div>
  );
};

// Component for parking information
const ParkingList = ({ data }) => {
  return (
    <div className="flex items-center gap-2">
      {data?.icon}
      <div>
        <h4 className="text-sm md:text-base font-bold text-[#292D32]">
          {data?.title}
        </h4>
        <h6 className="text-sm md:text-base font-medium text-[#000000CC]">
          {data?.value}
        </h6>
      </div>
    </div>
  );
};
