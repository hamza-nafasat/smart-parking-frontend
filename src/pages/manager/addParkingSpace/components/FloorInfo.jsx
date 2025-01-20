import React from "react";
import FloorAccordion from "./Floor";
const floors = 2;

const FloorInfo = () => {
  return (
    <div className="mt-4">
      <h4 className="text-base md:text-xl font-medium text-[#414141] text-center">
        Floor/Sensor Information
      </h4>
      <div className="mt-4 md:mt-8">
        <FloorAccordion />
      </div>
    </div>
  );
};

export default FloorInfo;