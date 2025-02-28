import { useNavigate } from "react-router-dom";
import GlobalTable from "../../../components/shared/large/GlobalTable";
import { parkingBookingData, parkingSummaryColumns } from "./components/ParkingSummaryColumns";

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
