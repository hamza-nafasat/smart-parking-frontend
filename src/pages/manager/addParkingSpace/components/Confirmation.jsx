import Button from "../../../../components/shared/small/Button";
import {
  AccordionDeleteIcon,
  AccordionEditIcon,
} from "../../../../assets/svgs/Icon";
import { floors } from "../utils/addParkingSpaceFeatures";

// eslint-disable-next-line react/prop-types
const Confirmation = ({ setCurrentStep }) => {
  return (
    <div className="mt-4">
      <h4 className="text-base md:text-xl font-medium text-[#414141] text-center">
        Confirmation
      </h4>
      {/* General info */}
      <div className="mt-5">
        <GeneralInfoSec setCurrentStep={setCurrentStep} />
      </div>
      {/* Floor info */}
      {[1,2].map((_, i) => (
      <FloorSensorInfoSec setCurrentStep={setCurrentStep} key={i} />
      ))}
      <div className="mt-5 flex justify-end">
        <div className="flex items-center gap-4">
          <Button
            text="Back"
            width="w-20 sm:w-[110px]"
            bg="bg-transparent hover:bg-primary hover:text-white"
            color="text-primary"
            onClick={() => setCurrentStep((prevStep) => prevStep - 1)}
          />
          <Button width="w-[120px]" type="button" text="Save" />
        </div>
      </div>
    </div>
  );
};

export default Confirmation;

const GeneralInfoSec = ({ setCurrentStep }) => {
  return (
    <section>
      <div className="flex items-center justify-between">
        <h6 className="text-sm md:text-base font-medium text-primary">
          General Info
        </h6>
        <button onClick={() => setCurrentStep(0)}>
          <AccordionEditIcon color="#18BC9C" />
        </button>
      </div>
      <div className="mt-1 grid grid-cols-3 gap-4 md:gap-6">
        <img
          src="https://placehold.co/400x300"
          alt="image"
          className="w-full h-[160px] object-cover rounded-xl border-[4px] border-primary"
        />
        {/* building list */}
        <div className="flex flex-col justify-center">
          <List name="Building" value="Building 1" />
          <List name="Building Address" value="Country, city, Area" />
          <List name="Total Area" value="Square Feet 123" />
          <List name="Total number of floors" value="21 floors" />
          <List name="Second E-mail" value="xyz@gmail.com" />
          <List name="Building Type" value="Commercial" />
        </div>
        {/* Description */}
        <div>
          <h6 className="text-xs sm:text-sm font-semibold text-[#353535]">
            Description:
          </h6>
          <p className="mt-1 text-xs sm:text-sm font-medium text-[#41414199]">
            Nestled in the heart of the bustling city, this enigmatic building
            stands as a testament to modern architectural brilliance. Its sleek,
            glass facade mirrors the dynamic skyline, while its towering height
            commands attention from every corner. Its sleek, glass facade
            mirrors the dynamic skyline, while its towering height commands
            attention from every corner.{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

const FloorSensorInfoSec = ({ setCurrentStep }) => {
  return (
    <section className="mt-3">
      <h6 className="text-sm md:text-base font-medium text-primary">
        Floors/Sensor info
      </h6>
      <div className="mt-1 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        <img
          src="https://placehold.co/400x300"
          alt="image"
          className="lg:col-span-4 w-full h-[160px] object-cover rounded-xl border-[4px] border-primary"
        />
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between bg-primary rounded-t-[4px] px-[14px] py-2 -mb-[1px] relative z-10">
            <h6 className="text-xs sm:text-sm text-white font-bold">
              Floor Name-01
            </h6>
            <div className="flex items-center gap-3">
              <button onClick={() => setCurrentStep(1)}>
                <AccordionEditIcon />
              </button>
              <button>
                <AccordionDeleteIcon />
              </button>
            </div>
          </div>
          <div className="rounded-b-[4px] border border-[#0000003f] h-[125px] overflow-y-scroll custom-scroll">
             {floors.map((floor, i) => (
              <SensorList key={i} floor={floor} />
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const SensorList = ({floor}) => {
  return (
    <div className="flex items-center justify-between py-[6px] px-[14px] border-b border-[#B0B0B080]">
      <h6 className="text-[10px] text-[#313131] font-medium">{floor.parking}</h6>
      <p className="text-[10px] text-[#313131] font-medium">{floor.sensor}</p>
    </div>
  )
}

const List = ({ name, value }) => {
  return (
    <div className="flex items-center justify-between gap-4 mt-1">
      <h6 className="text-xs sm:text-sm font-semibold text-[#353535]">
        {name}:
      </h6>
      <p className="text-xs sm:text-sm font-medium text-[#41414199] min-w-[130px]">
        {value}
      </p>
    </div>
  );
};
