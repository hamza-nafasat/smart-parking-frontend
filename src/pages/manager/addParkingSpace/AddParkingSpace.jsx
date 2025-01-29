/* eslint-disable react/prop-types */
import { useState } from "react";
import StepArrowIcon from "../../../assets/svgs/building/StepArrowIcon";
import Confirmation from "./components/Confirmation";
import FloorInfo from "./components/FloorInfo";
import GeneralInfo from "./components/GeneralInfo";

const AddParkingSpace = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ["General Info", "Floor/Sensor Information", "Confirmation"];
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <GeneralInfo setCurrentStep={setCurrentStep} />;
      case 1:
        return <FloorInfo setCurrentStep={setCurrentStep} />;
      case 2:
        return <Confirmation setCurrentStep={setCurrentStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="xl:px-12 xl:py-4">
      <h2 className="text-xl md:text-[28px] font-semibold text-[#414141]">Add Parking Space</h2>
      <div className="mt-4 md:mt-6 flex flex-wrap items-center md:justify-center gap-4  :gap-6 2xl:gap-8">
        {steps.map((step, i) => (
          <Step
            step={step}
            index={i}
            key={i}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            stepsLength={steps.length}
          />
        ))}
      </div>
      <div className="mt-4 md:mt-6 2xl:mt-8">{renderStepContent(currentStep)}</div>
    </div>
  );
};

export default AddParkingSpace;

const Step = ({ step, index, currentStep, setCurrentStep, stepsLength }) => {
  return (
    <div
      className={`flex items-center gap-1 ${
        currentStep >= index ? "opacity-100 cursor-pointer" : "opacity-50 grayscale pointer-events-none"
      }`}
      onClick={() => setCurrentStep(index)}
    >
      <span className="w-[32px] h-[32px] rounded-full border-2 border-primary text-primary text-xl font-semibold grid place-items-center">
        {index + 1}
      </span>
      <p className="text-xs sm:text-sm text-primary font-medium">{step}</p>
      {index < stepsLength - 1 && <StepArrowIcon />}
    </div>
  );
};
