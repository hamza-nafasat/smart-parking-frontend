/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { AccordionDeleteIcon, AccordionEditIcon } from "../../../../assets/svgs/Icon";
import Dropdown from "../../../../components/shared/small/Dropdown";
import Input from "../../../../components/shared/small/Input";
import BookParkingSpace from "./BookParkingSpace";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../components/shared/small/Button";
import TwoDModel from "./TwoDModel";
import toast from "react-hot-toast";
import { addFloor } from "../../../../redux/slices/floorSlice";

const FloorAccordion = () => {
  const { buildingGeneralInfo } = useSelector((state) => state.building);
  const [activeAccordionIndex, setActiveAccordionIndex] = useState(null);
  const handleAccordionToggle = (index) => {
    setActiveAccordionIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: buildingGeneralInfo?.noOfFloors }).map((_, index) => (
        <Floor
          key={index}
          index={index + 1}
          isOpen={activeAccordionIndex == index}
          onToggle={() => handleAccordionToggle(index)}
        />
      ))}
    </div>
  );
};

const Floor = ({ isOpen, onToggle, index }) => {
  const { floors } = useSelector((state) => state.floor);
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: "", noOfParkingSpace: "", floorImage: "" });
  const saveClickHandler = () => {
    if (!form.name || !form.noOfParkingSpace || !form.floorImage) return toast.error("Fill all fields first");
    dispatch(
      addFloor({ index: index, name: form.name, noOfParkingSpace: form.noOfParkingSpace, file: form.floorImage })
    );
  };
  const onUploadForFloorImage = (image, coordinates) => {
    setForm({ ...form, floorImage: image, floorCoordinates: coordinates });
  };

  useEffect(() => {
    if (floors?.length) {
      const floor = floors.find((floor) => floor?.index == index);
      if (floor)
        setForm({ ...form, name: floor?.name, noOfParkingSpace: floor?.noOfParkingSpace, floorImage: floor?.file });
    }
  }, [index]);
  return (
    <div>
      {/* Accordion Header */}
      <div className="flex items-center justify-between bg-primary rounded-[4px] px-4 md:px-8 py-2">
        <h6 className="text-base md:text-lg font-bold text-white">Floor {index}</h6>
        <div className="flex items-center gap-4">
          {/* <div className="cursor-pointer">
            <AccordionDeleteIcon />
          </div> */}
          <div className="cursor-pointer" onClick={onToggle}>
            <AccordionEditIcon />
          </div>
        </div>
      </div>

      {/* Accordion Content */}
      {isOpen && (
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* <Dropdown defaultText="Select floor" options={[{ option: "Floor 1" }]} /> */}
          <Input
            type="text"
            placeholder="Floor name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            type="text"
            placeholder="Number of parking spaces"
            value={form.noOfParkingSpace}
            onChange={(e) => setForm({ ...form, noOfParkingSpace: e.target.value })}
          />
          <div className="lg:col-span-3 flex justify-center">
            <TwoDModel onUpload={onUploadForFloorImage} />
          </div>
        </div>
      )}
      <div className="min-w-full flex justify-end pr-6 m-2">
        <Button width="w-[200px]" type="button" text="Save Floor Data" onClick={saveClickHandler} />
      </div>
    </div>
  );
};

export default FloorAccordion;
