import Button from "../../../../components/shared/small/Button";
import FloorAccordion from "./Floor";

// eslint-disable-next-line react/prop-types
const FloorInfo = ({ setCurrentStep }) => {
  const validationHandler = () => setCurrentStep((prevStep) => prevStep + 1);
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
