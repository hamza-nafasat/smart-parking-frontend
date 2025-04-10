/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import {
  FreeSpaceIcon,
  LocationIcon,
  OccupiedParkingIcon,
  SensorIssueIcon,
  TotalParkingIcon,
} from "../../../assets/svgs/Icon";
import { useGetAllBuildingsQuery } from "../../../redux/apis/buildingApis";

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
const BuildingList = ({ redirect = "admin" }) => {
  const [buildingsData, setBuildingsData] = useState([]);
  const { data } = useGetAllBuildingsQuery();

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  // Calculate the buildings to display based on the current page
  const offset = currentPage * itemsPerPage;
  const currentBuildings = buildingsData.slice(offset, offset + itemsPerPage);

  // Handler for page change
  const handlePageClick = (event) => setCurrentPage(event.selected);

  useEffect(() => {
    if (data) setBuildingsData(data?.data);
  }, [data]);

  return (
    <div>
      {currentBuildings?.map((building, index) => (
        <SingleBuilding key={index} building={building} redirect={redirect} />
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
        pageCount={Math.ceil(buildingsData?.length / itemsPerPage)}
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
const SingleBuilding = ({ building, redirect }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-wrap justify-between gap-4 md:gap-6 building-slider border-b border-[#00000037] py-4">
      <div className="flex flex-wrap gap-4">
        {/* Image carousel */}
        <div className="w-[249px] h-[150px] rounded-xl overflow-hidden">
          <Slider {...carouselSettings}>
            {/* {building?.buildingImages?.map((img, i) => ( */}
            <img src={building?.twoDImage?.url} alt="image" className="w-[249px] h-[150px] rounded-xl object-cover" />
            {/* ))} */}
          </Slider>
        </div>

        {/* Content */}
        <div>
          <h4 className="text-base md:text-xl font-bold text-[#000]">{building?.name}</h4>
          <div className="flex items-center gap-2">
            <LocationIcon />
            <p className="text-[10px] font-semibold text-[#47484b]">{building?.address}</p>
          </div>
          {/* <div className="flex items-center gap-2 mt-1">
            <TwentyFourSevenIcon />
            <p className="text-[10px] font-semibold text-[#47484b]">{building?.parkingTime}</p>
          </div> */}
          <div className="flex flex-wrap gap-4 xl:gap-5 mt-6">
            <ParkingList
              data={{
                title: "Total No. of Parking Space",
                value: building?.totalParkingSpace,
                icon: <TotalParkingIcon />,
              }}
            />
            <ParkingList
              data={{
                title: "Total Occupied Parking",
                value: building?.totalOccupiedSpace,
                icon: <OccupiedParkingIcon />,
              }}
            />
            <ParkingList
              data={{
                title: "Total Free Space",
                value: building?.totalFreeSpace,
                icon: <FreeSpaceIcon />,
              }}
            />
            <ParkingList
              data={{
                title: "Sensor Issue",
                value: building?.sensorIssue,
                icon: <SensorIssueIcon />,
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex">
        <button
          className="text-primary text-sm md:text-base font-bold underline h-fit"
          onClick={() => navigate(`/${redirect}/building-view/${building?._id}`)}
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
        <h4 className="text-sm md:text-base font-bold text-[#292D32]">{data?.title}</h4>
        <h6 className="text-sm md:text-base font-medium text-[#000000CC]">
          {data?.value} {data?.title === "Sensor Issue" ? "" : "Space"}
        </h6>
      </div>
    </div>
  );
};
