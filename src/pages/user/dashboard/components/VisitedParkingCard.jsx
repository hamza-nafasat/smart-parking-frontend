/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import Button from '../../../../components/shared/small/Button';
import { useGetMostVisitedBuildingsQuery } from '../../../../redux/apis/buildingApis';

const VisitedParkingCard = ({ search }) => {
  const [buildings, setBuildings] = useState([]);
  const { data } = useGetMostVisitedBuildingsQuery({ search });
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const offset = currentPage * itemsPerPage;
  const parkingList = buildings?.slice(offset, offset + itemsPerPage);

  useEffect(() => {
    if (data?.data) {
      setBuildings(data?.data);
    }
  }, [data?.data]);

  return (
    <div>
      {parkingList?.length === 0 ? (
        <p className="text-center text-gray-500 my-4">No Record Found</p>
      ) : (
        parkingList.map((building, index) => <SingleVisitingWidget key={building._id || index} building={building} />)
      )}

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
        breakLabel={'...'}
        pageCount={Math.ceil(buildings?.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={(event) => setCurrentPage(event.selected)}
        containerClassName={'flex justify-end px-0 md:px-10 mt-4 space-x-4'}
        pageClassName={'inline-block'}
        pageLinkClassName={
          'flex justify-center items-center h-[30px] w-[30px]  border border-gray-300 text-[#404B52] rounded hover:bg-gray-100 transition'
        }
        activeClassName={'bg-primary rounded text-white'}
        previousClassName={'inline-block'}
        nextClassName={'inline-block'}
        disabledClassName={'opacity-50 cursor-not-allowed'}
      />
    </div>
  );
};

export default VisitedParkingCard;

const SingleVisitingWidget = ({ building }) => {
  return (
    <div className="border-[1px] rounded-lg p-2 my-3">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col md:flex-row  items-center gap-3">
          <img src={building?.twoDImage?.url} alt="image" className="w-[243px] h-[120px] rounded-xl object-cover" />
          <div className="flex flex-col gap-1">
            <h2 className="md:text-lg text-base">{building?.name}</h2>
            <h2 className="md:text-sm text-xs text-[#A7ADB7]">{building?.address}</h2>
            <h2 className="md:text-sm text-xs">
              {building?.availableSlots} / {building?.totalSlots} free
            </h2>
          </div>
        </div>
        <Link to={`/user/booking-slot/${building?._id}`}>
          <Button text="Book a Spot" width="w-full md:w-[120px]" />
        </Link>
      </div>
    </div>
  );
};
