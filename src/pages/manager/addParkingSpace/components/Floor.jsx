import React, { useState } from "react";
import {
  AccordionDeleteIcon,
  AccordionEditIcon,
} from "../../../../assets/svgs/Icon";
import Dropdown from "../../../../components/shared/small/Dropdown";
import Input from "../../../../components/shared/small/Input";
import BookParkingSpace from "./BookParkingSpace";

const floors = 2;

const FloorAccordion = () => {
  const [activeAccordionIndex, setActiveAccordionIndex] = useState(null);

  const handleAccordionToggle = (index) => {
    setActiveAccordionIndex((prevIndex) =>
      prevIndex === index ? null : index
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: floors }).map((_, index) => (
        <Floor
          key={index}
          isOpen={activeAccordionIndex === index}
          onToggle={() => handleAccordionToggle(index)}
        />
      ))}
    </div>
  );
};

const Floor = ({ isOpen, onToggle }) => {
  const selectFloorHandler = (name, value) => setFormData({...formData, [name]: value})
  const updateFloorImgAndCoordinates = (img, coordinates) => setFormData({...formData, floorImg: img, floorCoordinates: coordinates})
  const [formData, setFormData] = useState({
    floorName: "",
    numberOfParkingSpaces: "",
    floorImg: null,
    floorCoordinates: [],
  });
  const formDataHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  console.log("formData", formData);
  return (
    <div>
      {/* Accordion Header */}
      <div className="flex items-center justify-between bg-primary rounded-[4px] px-4 md:px-8 py-2">
        <h6 className="text-base md:text-lg font-bold text-white">
          Floor Name
        </h6>
        <div className="flex items-center gap-4">
          <div className="cursor-pointer">
            <AccordionDeleteIcon />
          </div>
          <div className="cursor-pointer" onClick={onToggle}>
            <AccordionEditIcon />
          </div>
        </div>
      </div>

      {/* Accordion Content */}
      {isOpen && (
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Dropdown
            defaultText="Select floor"
            options={[{ option: "Floor 1" , value: "floor-1"}]}
            onSelect={(value) => selectFloorHandler("floor", value)}
          />
          <Input
            type="text"
            placeholder="Floor name"
            name="floorName"
            value={formData.floorName}
            onChange={formDataHandler}
          />
          <Input
            type="text"
            placeholder="Number of parking spaces"
            name="numberOfParkingSpaces"
            value={formData.numberOfParkingSpaces}
            onChange={formDataHandler}
          />
          <div className="lg:col-span-3 flex justify-center">
            <BookParkingSpace onUpload={updateFloorImgAndCoordinates} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FloorAccordion;
