import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

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

const VisitedParkingCard = ({ listData }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const offset = currentPage * itemsPerPage;
  const parkingList = listData.slice(offset, offset + itemsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div>
      {parkingList.map((data, index) => (
        <SingleVisitingWidget key={index} name={data.name} />
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
        activeClassName={"bg-primary rounded text-white"}
        previousClassName={"inline-block"}
        nextClassName={"inline-block"}
        disabledClassName={"opacity-50 cursor-not-allowed"}
      />
    </div>
  );
};

export default VisitedParkingCard;

const SingleVisitingWidget = ({ name }) => {
  return (
    <div className="border-[1px] rounded-lg p-2 my-3">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col md:flex-row  items-center gap-3">
          <img
            src="https://placehold.co/243x84"
            alt="image"
            className="w-[243px] h-[84px] rounded-xl object-cover"
          />
          <div className="flex flex-col gap-1">
            <h2 className="md:text-lg text-base">{name}</h2>
            <h2 className="md:text-sm text-xs text-[#A7ADB7]">
              1415 Av Maguire
            </h2>
            <h2 className="md:text-sm text-xs">$ 6 / 24 free</h2>
          </div>
        </div>
        <h4 className="font-bold text-base md:text-lg">4,8 km</h4>
      </div>
    </div>
  );
};
