import React from "react";
import GlobalTable from "../../../components/shared/large/GlobalTable";
import {
  parkingBookingData,
  parkingSummaryColumns,
} from "./components/ParkingSummaryColumns";
import { useNavigate } from "react-router-dom";

const ParkingSummary = () => {
  const navigate = useNavigate();
  return (
    <div>
      <GlobalTable
        heading="Parking Booking Summary"
        columns={parkingSummaryColumns(navigate)}
        data={parkingBookingData}
      />
    </div>
  );
};

export default ParkingSummary;
