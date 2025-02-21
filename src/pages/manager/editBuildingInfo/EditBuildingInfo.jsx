import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/shared/small/Button";
import Dropdown from "../../../components/shared/small/Dropdown";
import Input from "../../../components/shared/small/Input";
import { useGetSingleBuildingQuery, useUpdateSingleBuildingMutation } from "../../../redux/apis/buildingApis";
import UploadModel from "../addParkingSpace/components/UploadModel";

function EditBuildingInfo() {
  const navigate = useNavigate();
  const buildingId = useParams().id;
  const [updateBuilding, { isLoading }] = useUpdateSingleBuildingMutation();
  const { data, refetch } = useGetSingleBuildingQuery(buildingId);
  const [polygons, setPolygons] = useState([]);
  const [oldImageSrc, setOldImageSrc] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [building, setBuilding] = useState({
    name: "",
    address: "",
    area: "",
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
  const buildingTypeHandler = (name, value) => setBuilding({ ...building, [name]: value });
  const formDataHandler = (e) => setBuilding({ ...building, [e.target.name]: e.target.value });

  const updateBuildingHandler = async () => {
    if (
      !building.name ||
      !building.address ||
      !building.area ||
      !building.email ||
      !building.type ||
      !building.description ||
      !building.buildingCoordinates
    )
      return toast.error("Please fill all the fields");
    try {
      const formDate = new FormData();
      formDate.append("name", building.name);
      formDate.append("address", building.address);
      formDate.append("area", building.area);
      formDate.append("email", building.email);
      formDate.append("type", building.type);
      formDate.append("description", building.description);
      formDate.append("polygonData", JSON.stringify(building.buildingCoordinates));
      if (building.buildingImage !== oldImageSrc) formDate.append("file", building.buildingImage);
      const res = await updateBuilding({ id: buildingId, data: formDate }).unwrap();
      if (res?.success) toast.success(res?.message);
      await refetch();
      return navigate(`/manager/building-view/${buildingId}`);
    } catch (error) {
      console.log("error while update building", error);
    }
  };

  useEffect(() => {
    if (data?.data) {
      const building = data?.data;
      setBuilding({
        name: building.name || "",
        address: building.address || "",
        area: building.area || "",
        email: building.email || "",
        type: building.type || "",
        buildingImage: building?.twoDImage?.url || null,
        buildingCoordinates: building.polygonData || [],
        description: building.description || "",
      });
      setOldImageSrc(building?.twoDImage?.url || null);
      setImageSrc(building?.twoDImage?.url || null);
      setPolygons(building?.polygonData || []);
    }
  }, [data?.data]);

  useEffect(() => {
    if (oldImageSrc) setImageSrc(oldImageSrc);
    if (polygons?.length) setBuilding({ ...building, buildingCoordinates: polygons });
  }, [building, oldImageSrc, polygons]);
  return (
    <div className="mt-4">
      <h4 className="text-base md:text-xl font-medium text-[#414141] text-center">General Building Information</h4>
      <form className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 md:mt-6">
        <Input type="text" placeholder="Building Name" name="name" value={building.name} onChange={formDataHandler} />
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
          className="col-span-2"
          type="email"
          placeholder="Email address"
          name="email"
          value={building.email}
          onChange={formDataHandler}
        />
        <Dropdown
          defaultText={building.type || "Select Type"}
          options={[
            { option: "Commercial", value: "commercial" },
            { option: "Residential", value: "residential" },
          ]}
          onSelect={(value) => buildingTypeHandler("type", value)}
        />
        <div className="lg:col-span-3">
          <UploadModel
            heading="Upload Building Model"
            onUpload={onUploadForBuildingImage}
            polygons={polygons}
            setPolygons={setPolygons}
            imageSrc={imageSrc}
            setImageSrc={setImageSrc}
            isBuilding
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
            disabled={isLoading}
            className={`${isLoading ? "opacity-50 pointer-events-none" : ""}`}
            width="w-[150px]"
            type="button"
            text="Update Building"
            onClick={updateBuildingHandler}
          />
        </div>
      </form>
    </div>
  );
}

export default EditBuildingInfo;
