import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { AccordionEditIcon } from "../../../assets/svgs/Icon";
import Button from "../../../components/shared/small/Button";
import Input from "../../../components/shared/small/Input";
import { useCreateFloorMutation } from "../../../redux/apis/floorApis";
import { customObjectId } from "../../../utils/features";
import UploadModel from "../addParkingSpace/components/UploadModel";
import { useCreateSlotsInBulkMutation } from "../../../redux/apis/slotApis";

function AddNewFloor() {
  const navigate = useNavigate();
  const params = useParams();
  const buildingId = params.buildingId;
  const [addFloor, { isLoading }] = useCreateFloorMutation();
  const [addSlotInBulk, { isLoading: isLoadingForSlot }] = useCreateSlotsInBulkMutation();
  const [name, setName] = useState("");
  const [noOfParkingSpace, setNumberOfParkingSpace] = useState();
  const [originalImage, setOriginalImage] = useState(null);
  const [polygons, setPolygons] = useState([]);
  const [polygonsForBackend, setPolygonsForBackend] = useState([]);
  const [imageSrc, setImageSrc] = useState(null);

  const saveClickHandler = async () => {
    if (!name || !noOfParkingSpace || !polygonsForBackend || !originalImage)
      return toast.error("Fill all fields first");
    const floorId = customObjectId();
    const formData = new FormData();
    const slotData = { slots: [] };
    // create data for floor
    formData.append("_id", floorId);
    formData.append("name", name);
    formData.append("buildingId", buildingId);
    formData.append("noOfParkingSpace", noOfParkingSpace);
    formData.append("polygonData", JSON.stringify(polygonsForBackend));
    if (originalImage) formData.append("file", originalImage);
    // create slots data
    slotData.floorId = floorId;
    slotData.buildingId = buildingId;
    polygonsForBackend?.forEach((polygon) => {
      if (!polygon.id || !polygon.points || !polygon.sensorId)
        return toast.error("Please Fill all required fields each Slot");
      const singleSlot = {
        id: polygon.id,
        color: polygon?.color,
        fillColor: polygon?.fillColor,
        points: polygon?.points,
        sensorId: polygon.sensorId,
      };
      slotData.slots.push(singleSlot);
    });
    // create floor and slots in db
    try {
      const res = await addFloor({ data: formData }).unwrap();
      if (res.success) {
        const slotRes = await addSlotInBulk(slotData).unwrap();
        if (slotRes?.success) toast.success(`Floor and ${slotRes?.data?.length} slots created successfully`);
        return navigate(`/manager/building-view/${buildingId}`);
      }
    } catch (error) {
      console.log("Error in update floor", error);
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  const onUploadForFloorImage = (image, coordinates) => {
    setImageSrc(image);
    setPolygonsForBackend(coordinates);
  };

  return (
    <div>
      <div className="flex items-center justify-between bg-primary rounded-[4px] px-4 md:px-8 py-2">
        <h6 className="text-base md:text-lg font-bold text-white">Add new Floor</h6>
        <div className="flex items-center gap-4">
          <div className="cursor-pointer">
            <AccordionEditIcon />
          </div>
        </div>
      </div>

      <>
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Input type="text" placeholder="Floor name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input
            type="text"
            placeholder="Number of parking spaces"
            value={noOfParkingSpace}
            onChange={(e) => setNumberOfParkingSpace(e.target.value)}
          />
          <div className="lg:col-span-3 flex justify-center">
            <UploadModel
              heading="Upload Floor TwoD Model"
              onUpload={onUploadForFloorImage}
              polygons={polygons}
              setPolygons={setPolygons}
              imageSrc={imageSrc}
              setImageSrc={setImageSrc}
              setOriginalImage={setOriginalImage}
            />
          </div>
        </div>
        <div className="min-w-full flex justify-end pr-6 m-2">
          <Button
            disabled={isLoading || isLoadingForSlot}
            className={`${isLoading ? "cursor-not-allowed opacity-30" : ""}`}
            width="w-[200px]"
            type="button"
            text="Add Floor"
            onClick={saveClickHandler}
          />
        </div>
      </>
    </div>
  );
}

export default AddNewFloor;
