import React from "react";
import {
  parkingBookingData,
  parkingSummaryColumns,
} from "./components/ParkingSummaryColumns";
import { tableStyles } from "../../../components/shared/small/dataTableStyles";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import GlobalTable from "../../../components/shared/large/GlobalTable";

const ParkingSummary = () => {
  const navigate = useNavigate();
  return (
    <div>
      <GlobalTable
        heading="Today Parking Booking Summary"
        columns={parkingSummaryColumns(navigate)}
        data={parkingBookingData}
      />
    </div>
  );
};

export default ParkingSummary;
