import React from "react";
import { CiSearch } from "react-icons/ci";
import {
  dashboardBookingData,
  dashboradColumns,
} from "../utils/DashboardColumn";
import DataTable from "react-data-table-component";
import { tableStyles } from "../../../../components/shared/small/dataTableStyles";
import { useNavigate } from "react-router-dom";

const BookingTable = () => {
  const navigate = useNavigate()
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm md:text-base font-bold text-[#414141]">
          Today Parking Booking Summary
        </h3>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-[#F9FBFF] border border-[#e7e7e7] rounded-[10px] py-2 px-4">
            <CiSearch fontSize={20} color="#7E7E7E" />
            <input
              type="text"
              placeholder="Search"
              className="w-full text-xs md:text-base bg-transparent border-none focus:outline-none text-[#7E7E7E]"
            />
          </div>
          <div className="flex items-center gap-2 bg-[#F9FBFF] border border-[#e7e7e7] rounded-[10px] py-2 px-4">
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
      <div className="mt-4 md:mt-6">
        <DataTable
          columns={dashboradColumns(navigate)}
          data={dashboardBookingData}
          customStyles={tableStyles}
          pagination
        />
      </div>
    </div>
  );
};

export default BookingTable;
