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

const FloorAccordion = ({ polygons, setPolygons, imageSrc, setImageSrc, }) => {
  const { buildingGeneralInfo } = useSelector((state) => state.building);
  const { floors } = useSelector((state) => state.floor);
  const [activeAccordionIndex, setActiveAccordionIndex] = useState(null);
  const handleAccordionToggle = (index) => {
    setActiveAccordionIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: floors?.length || 0 }).map((_, index) => (
        <Floor
          key={index}
          floorNumber={index + 1}
          polygons={polygons}
          setPolygons={setPolygons}
          imageSrc={imageSrc}
          setImageSrc={setImageSrc}
          isOpen={activeAccordionIndex == index}
          onToggle={() => handleAccordionToggle(index)}
        />
      ))}
    </div>
  );
};

const Floor = ({ isOpen, onToggle, floorNumber, }) => {
  const { floors } = useSelector((state) => state.floor);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [noOfParkingSpace, setNumberOfParkingSpace] = useState()

  const [polygons, setPolygons] = useState([]);
  const [imageSrc, setImageSrc] = useState(null);
  const saveClickHandler = () => {
    console.log('saveClickHandler', floorNumber, name, noOfParkingSpace, imageSrc, polygons)
    if (!name || !noOfParkingSpace || !imageSrc || !polygons) return toast.error("Fill all fields first");

    dispatch(
      addFloor({ floorNumber, name, noOfParkingSpace, floorImage: imageSrc, polygons })
    );
  };
  const onUploadForFloorImage = (image, coordinates) => {
    setImageSrc(image);
    setPolygons(coordinates);
  };


  useEffect(() => {
    console.log("floor image", floors)
    if (floors?.length) {
      const floor = floors.find((floor) => floor?.floorNumber == floorNumber);
      if (floor)
        setName(floor?.name);
      setNumberOfParkingSpace(floor?.noOfParkingSpace);
      setPolygons(floor?.polygons || []);
      setImageSrc(floor?.floorImage || null);
    }
  }, [floors]);


  return (
    <div>
      {/* Accordion Header */}
      <div className="flex items-center justify-between bg-primary rounded-[4px] px-4 md:px-8 py-2">
        <h6 className="text-base md:text-lg font-bold text-white">Floor {floorNumber}</h6>
        <div className="flex items-center gap-4">
          <div className="cursor-pointer" onClick={onToggle}>
            <AccordionEditIcon />
          </div>
        </div>
      </div>

      {/* Accordion Content */}
      {isOpen && (
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Input
            type="text"
            placeholder="Floor name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Number of parking spaces"
            value={noOfParkingSpace}
            onChange={(e) => setNumberOfParkingSpace(e.target.value)}
          />
          <div className="lg:col-span-3 flex justify-center">
            <TwoDModel onUpload={onUploadForFloorImage}

              polygons={polygons}
              setPolygons={setPolygons}
              imageSrc={imageSrc}
              setImageSrc={setImageSrc}
            />
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
