import React, { useState } from "react";
import Input from "../../../../components/shared/small/Input";
import Dropdown from "../../../../components/shared/small/Dropdown";
import UploadModel from "./UploadModel";
import Button from "../../../../components/shared/small/Button";

const GeneralInfo = ({ setCurrentStep }) => {
  const [formData, setFormData] = useState({
    buildingName: "",
    buildingAddresss: "",
    totalArea: "",
    numberOfFloors: "",
    email: "",
    buildingType: "",
    buildingImage: null,
    buildingFloorCoordinates:[],
    description: "",
  });

  const buildingImgCoordinatesHandler = (image, coordinates) => {
    setFormData({...formData, buildingImage: image, buildingFloorCoordinates: coordinates})
  }

  const buildingTypeHandler = (name, value) => setFormData({...formData, [name]: value})

  const formDataHandler = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  console.log('formData', formData)

  const validationHandler = () => setCurrentStep((prevStep) => prevStep + 1);
  return (
    <div className="mt-4">
      <h4 className="text-base md:text-xl font-medium text-[#414141] text-center">
        General Building Information
      </h4>
      <form className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 md:mt-6">
        <Input type="text" placeholder="Building Name" name="buildingName" value={formData.buildingName} onChange={formDataHandler} />
        <Input type="text" placeholder="Building address" name="buildingAddresss" value={formData.buildingAddresss} onChange={formDataHandler} />
        <Input type="number" placeholder="Total area (sq ft/m)" name="totalArea" value={formData.totalArea} onChange={formDataHandler} />
        <Input type="number" placeholder="Total number of floors" name="numberOfFloors" value={formData.numberOfFloors} onChange={formDataHandler} />
        <Input type="email" placeholder="Email address" name="email" value={formData.email} onChange={formDataHandler} />
        <Dropdown
          defaultText="Building Type"
          options={[
            { option: "Commercial", value: "commercial" },
            { option: "Residential", value: "residential" },
          ]}
          onSelect={(value) => buildingTypeHandler("buildingType", value)}
        />
        <div className="lg:col-span-3">
          <UploadModel onUpload={buildingImgCoordinatesHandler} />
        </div>
        <textarea
          rows="5"
          className="lg:col-span-3 w-full p-4 border border-[#E0E0E9] rounded-lg text-sm text-[#383838E5] focus:outline-none"
          placeholder="Description"
          name="description"
          value={formData.description}
          onChange={formDataHandler}
        ></textarea>
        <div className="lg:col-span-3 flex justify-end">
          <Button
            width="w-[120px]"
            type="button"
            text="Next"
            onClick={validationHandler}
          />
        </div>
      </form>
    </div>
  );
};

export default GeneralInfo;
