import React from "react";
import Button from "../../../../components/shared/small/Button";
import { ParkingSensorIcon } from "../../../../assets/svgs/Icon";

const SensorStatus = () => {
  return (
    <div>
      <div className="flex items-center justify-between gap-4 border-b border-[#11111133] pb-3">
        <h6 className="text-xs md:text-sm text-[#414141] font-semibold">
          Sensor Status
        </h6>
        <Button text="See full report" width="w-[130px]" />
      </div>
      <div className="mt-3 flex flex-col items-center">
        <ParkingSensorIcon />
        <h6 className="text-xs md:text-sm text-[#414141] font-semibold">
          Parking Sensor
        </h6>
        <div className="flex justify-between gap-4 my-4">
          <List list={{ title: "Installed", value: "2342" }} />
          <List list={{ title: "Active", value: "2323" }} />
          <List list={{ title: "Offline", value: "342" }} />
        </div>
        <SensorError error={{ error: "1", value: "U84234353" }} />
        <SensorError error={{ error: "1", value: "U84234353" }} />
      </div>
    </div>
  );
};

export default SensorStatus;

const SensorError = ({ error }) => {
  return (
    <div className="flex items-center gap-4 bg-[#FFEAEB] rounded-md py-2 px-4 border-l-4 border-[#FA3D45] mb-2 w-full">
      <h6 className="basis-[60%] text-xs text-[#414141] font-medium">
        {error?.error} sensor has problem
      </h6>
      <p className="text-xs text-[#11111199] basis-[15%]">Error:</p>
      <p className="text-[10px] text-[#11111199] basis-[25%] bg-white py-1 px-2 text-center">
        {error?.value}
      </p>
    </div>
  );
};

const List = ({ list }) => {
  return (
    <div>
      <h6 className="text-xs md:text-sm text-[#11111199] text-center">
        {list?.title}
      </h6>
      <h6 className="text-sm md:text-base text-[#414141] text-center">
        {list?.value}
      </h6>
    </div>
  );
};
