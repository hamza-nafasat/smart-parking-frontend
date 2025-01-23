import React, { useState } from "react";
import Slider from "react-slick";
import { buildingsManagersListData } from "../../../pages/admin/buildingInfo/utils/buildingData";
import {
  FreeSpaceIcon,
  LocationIcon,
  OccupiedParkingIcon,
  SensorIssueIcon,
  TotalParkingIcon,
  TwentyFourSevenIcon,
} from "../../../assets/svgs/Icon";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

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
// eslint-disable-next-line react/prop-types
const BuildingList = ({redirect = "admin"}) => {
  const [currentPage, setCurrentPage] = useState(0); // current page state
  const itemsPerPage = 4; // number of items per page

  // Calculate the buildings to display based on the current page
  const offset = currentPage * itemsPerPage;
  const currentBuildings = buildingsManagersListData.slice(
    offset,
    offset + itemsPerPage
  );

  // Handler for page change
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div>
      {currentBuildings.map((data, index) => (
        <SingleBuilding key={index} data={data} redirect={redirect} />
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
        pageCount={Math.ceil(buildingsManagersListData.length / itemsPerPage)}
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

export default BuildingList;

// Single building component
const SingleBuilding = ({ data, redirect }) => {
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
        <div>
          <h4 className="text-base md:text-xl font-bold text-[#000]">
            {data?.buildingName}
          </h4>
          <div className="flex items-center gap-2">
            <LocationIcon />
            <p className="text-[10px] font-semibold text-[#47484b]">
              {data?.address}
            </p>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <TwentyFourSevenIcon />
            <p className="text-[10px] font-semibold text-[#47484b]">
              {data?.parkingTime}
            </p>
          </div>
          <div className="flex flex-wrap gap-4 xl:gap-5 mt-6">
            <ParkingList
              data={{
                title: "Total No. of Parking Space",
                value: data?.totalParkingSpace,
                icon: <TotalParkingIcon />,
              }}
            />
            <ParkingList
              data={{
                title: "Total Occupied Parking",
                value: data?.totalOccupiedSpace,
                icon: <OccupiedParkingIcon />,
              }}
            />
            <ParkingList
              data={{
                title: "Total Free Space",
                value: data?.totalFreeSpace,
                icon: <FreeSpaceIcon />,
              }}
            />
            <ParkingList
              data={{
                title: "Sensor Issue",
                value: data?.sensorIssue,
                icon: <SensorIssueIcon />,
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex">
        <button
          className="text-primary text-sm md:text-base font-bold underline h-fit"
          onClick={() => navigate(`/${redirect}/building-view/${data?._id}`)}
        >
          View Details
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
          {data?.value} {data?.title === "Sensor Issue" ? "" : "Space"}
        </h6>
      </div>
    </div>
  );
};
