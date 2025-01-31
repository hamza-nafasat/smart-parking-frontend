/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import Button from "../../../../components/shared/small/Button";
import FloorAccordion from "./Floor";
import { toast } from "react-hot-toast";

const FloorInfo = ({ setCurrentStep }) => {
  const { floors } = useSelector((state) => state.floor);

  const validationHandler = () => {
    if (floors?.length == 0) return toast.error("Please add at least one floor");
    let isMissingData = false;
    let message = "";
    floors.forEach((floor) => {
      if (isMissingData) return;
      if (!floor?.name || !floor?.noOfParkingSpace || !floor?.floorImage || !floor?.polygonData) isMissingData = true;
      return (message = `Please Fill all fields for Floor ${floor?.floorNumber} or Reduce No Of Floors in Building Info `);
    });
    if (isMissingData) return toast.error(message);
    setCurrentStep((prevStep) => prevStep + 1);
  };

  return (
    <div className="mt-4">
      <h4 className="text-base md:text-xl font-medium text-[#414141] text-center">Floor/Sensor Information</h4>
      <div className="mt-4 md:mt-8">
        <FloorAccordion />
      </div>
      <div className="mt-5 flex justify-end">
        <div className="flex items-center gap-4">
          <Button
            text="Back"
            width="w-20 sm:w-[110px]"
            bg="bg-transparent hover:bg-primary hover:text-white"
            color="text-primary"
            onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
          />
          <Button width="w-[120px]" type="button" text="Next" onClick={validationHandler} />
        </div>
      </div>
    </div>
  );
};

export default FloorInfo;
