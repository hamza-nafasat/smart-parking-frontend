/* eslint-disable react/prop-types */
import Input from "../../../../components/shared/small/Input";
import Dropdown from "../../../../components/shared/small/Dropdown";
import UploadModel from "./UploadModel";
import Button from "../../../../components/shared/small/Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addBuildingGeneralInfo } from "../../../../redux/slices/buildingSlice";

const GeneralInfo = ({ setCurrentStep }) => {
  const [polygons, setPolygons] = useState([]);
  const [imageSrc, setImageSrc] = useState(null);
  const dispatch = useDispatch();
  const { buildingGeneralInfo } = useSelector((state) => state.building);
  const [building, setBuilding] = useState({
    name: "",
    address: "",
    area: "",
    noOfFloors: "",
    email: "",
    type: "",
    buildingImage: null,
    buildingCoordinates: [],
    description: "",
  });

  const onUploadForBuildingImage = (image, coordinates) => {
    setBuilding({
      ...building,
      buildingImage: image,
      buildingCoordinates: coordinates,
    });
  };
  const buildingTypeHandler = (name, value) =>
    setBuilding({ ...building, [name]: value });
  const formDataHandler = (e) =>
    setBuilding({ ...building, [e.target.name]: e.target.value });

  const validationHandler = () => {
    if (
      !building.name ||
      !building.address ||
      !building.area ||
      !building.noOfFloors ||
      !building.email ||
      !building.type ||
      !building.description ||
      !building.buildingImage
    )
      return toast.error("Please fill all the fields");
    console.log("building", building);
    dispatch(addBuildingGeneralInfo(building));
    setCurrentStep(1);
  };

  useEffect(() => {
    if (buildingGeneralInfo) {
      setBuilding({
        name: buildingGeneralInfo.name || "",
        address: buildingGeneralInfo.address || "",
        area: buildingGeneralInfo.area || "",
        noOfFloors: buildingGeneralInfo.noOfFloors || "",
        email: buildingGeneralInfo.email || "",
        type: buildingGeneralInfo.type || "",
        buildingImage: buildingGeneralInfo.buildingImage || null,
        buildingCoordinates: buildingGeneralInfo.buildingCoordinates || [],
        description: buildingGeneralInfo.description || "",
      });

      setImageSrc(buildingGeneralInfo.buildingImage || null);
      setPolygons(buildingGeneralInfo.buildingCoordinates || []);
    }
  }, [buildingGeneralInfo]);
  return (
    <div className="mt-4">
      <h4 className="text-base md:text-xl font-medium text-[#414141] text-center">
        General Building Information
      </h4>
      <form className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 md:mt-6">
        <Input
          type="text"
          placeholder="Building Name"
          name="name"
          value={building.name}
          onChange={formDataHandler}
        />
        <Input
          type="text"
          placeholder="Building address"
          name="address"
          value={building.address}
          onChange={formDataHandler}
        />
        <Input
          type="text"
          placeholder="Total area (sq ft/m)"
          name="area"
          value={building.area}
          onChange={formDataHandler}
        />
        <Input
          type="number"
          placeholder="Total number of floors"
          name="noOfFloors"
          value={building.noOfFloors}
          onChange={formDataHandler}
        />
        <Input
          type="email"
          placeholder="Email address"
          name="email"
          value={building.email}
          onChange={formDataHandler}
        />
        <Dropdown
          defaultText="Building Type"
          options={[
            { option: "Commercial", value: "commercial" },
            { option: "Residential", value: "residential" },
          ]}
          onSelect={(value) => buildingTypeHandler("type", value)}
        />
        <div className="lg:col-span-3">
          <UploadModel
            onUpload={onUploadForBuildingImage}
            polygons={polygons}
            setPolygons={setPolygons}
            imageSrc={imageSrc}
            setImageSrc={setImageSrc}
          />
        </div>
        <textarea
          rows="5"
          className="lg:col-span-3 w-full p-4 border border-[#E0E0E9] rounded-lg text-sm text-[#383838E5] focus:outline-none"
          placeholder="Description"
          name="description"
          value={building.description}
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
