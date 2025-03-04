/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { FreeSpaceIcon, OccupiedParkingIcon, SensorIssueIcon, TotalParkingIcon } from "../../../assets/svgs/Icon";

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

const ParkingFloor = ({ data, linkTo }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const offset = currentPage * itemsPerPage;
  const currentBuildings = data?.slice(offset, offset + itemsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div>
      {currentBuildings?.map((data, index) => (
        <SingleFloor key={index} data={data} linkTo={linkTo(data._id)} />
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
        pageCount={Math.ceil(data?.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"flex justify-end px-0 md:px-10 mt-4 space-x-4"}
        pageClassName={"inline-block"}
        pageLinkClassName={
          "flex justify-center items-center h-[30px] w-[30px]  border border-gray-300 text-[#404B52] rounded hover:bg-gray-100 transition"
        }
        activeClassName={"bg-primary rounded text-white"}
        previousClassName={"inline-block"}
        nextClassName={"inline-block"}
        disabledClassName={"opacity-50 cursor-not-allowed"}
      />
    </div>
  );
};

export default ParkingFloor;

const SingleFloor = ({ data, linkTo }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-wrap justify-between gap-4 md:gap-6 building-slider border-b border-[#00000037] py-4">
      <div className="flex flex-wrap gap-4">
        {/* image carousel */}
        <div className="w-[249px] h-[150px] rounded-xl overflow-hidden">
          <Slider {...carouselSettings}>
            {/* {data?.buildingImages?.map((img, i) => ( */}
            <img src={data?.twoDImage?.url} alt="image" className="w-[249px] h-[150px] rounded-xl object-cover" />
            {/* ))} */}
          </Slider>
        </div>
        {/* content */}
        <div>
          <h4 className="text-base md:text-xl font-bold text-[#000]">{data?.name}</h4>
          {/* <div className="flex items-center gap-2">
            <LocationIcon />
            <p className="text-[10px] font-semibold text-[#47484b]">{data?.address}</p>
          </div> */}
          {/* <div className="flex items-center gap-2 mt-1">
            <TwentyFourSevenIcon />
            <p className="text-[10px] font-semibold text-[#47484b]">{data?.parkingTime}</p>
          </div> */}
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

      <div className="flex items-center xl:items-end flex-row xl:flex-col justify-between xl:justify-around min-w-full xl:min-w-[300px]">
        {/* <div className="flex items-center gap-3">
          <BlankAreaChart width={100} data={data?.data} areaColor={data?.color} />
          <h4 className="text-xl md:text-[27px] font-bold" style={{ color: data?.color }}>
            {data?.value}%
          </h4>
        </div> */}

        <div className="flex justify-end">
          <button
            className="text-primary text-sm md:text-base font-bold underline h-fit"
            onClick={() => navigate(`${linkTo}`)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

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
