import React from "react";
import Input from "../../../../components/shared/small/Input";
import Dropdown from "../../../../components/shared/small/Dropdown";
import UploadModel from "./UploadModel";
import Button from '../../../../components/shared/small/Button'

const GeneralInfo = ({setCurrentStep}) => {
    const validationHandler = () => setCurrentStep((prevStep) => prevStep + 1)
  return (
    <div className="mt-4">
      <h4 className="text-base md:text-xl font-medium text-[#414141] text-center">
        General Building Information
      </h4>
      <form className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 md:mt-6">
        <Input type="text" placeholder="Building Name" />
        <Input type="text" placeholder="Building address" />
        <Input type="number" placeholder="Total area (sq ft/m)" />
        <Input type="number" placeholder="Total number of floors" />
        <Input type="email" placeholder="Email address" />
        <Dropdown
          defaultText="Building Type"
          options={[
            { option: "Commercial", value: "commercial" },
            { option: "Residential", value: "residential" },
          ]}
        />
        <div className="lg:col-span-3">
          <UploadModel />
        </div>
        <textarea
          rows="5"
          className="lg:col-span-3 w-full p-4 border border-[#E0E0E9] rounded-lg text-sm text-[#383838E5] focus:outline-none"
          placeholder="Description"
        ></textarea>
        <div className="lg:col-span-3 flex justify-end">
            <Button width='w-[120px]' type="button" text="Next" onClick={validationHandler} />
        </div>
      </form> 
    </div>
  );
};

export default GeneralInfo;
