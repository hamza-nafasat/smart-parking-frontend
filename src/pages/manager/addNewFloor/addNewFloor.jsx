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
    const formData = new FormData();
    formData.append("_id", customObjectId());
    formData.append("name", name);
    formData.append("buildingId", buildingId);
    formData.append("noOfParkingSpace", noOfParkingSpace);
    formData.append("polygonData", JSON.stringify(polygonsForBackend));
    if (originalImage) formData.append("file", originalImage);
    try {
      const res = await addFloor({ data: formData }).unwrap();
      if (res.success) {
        if (!res?.data?._id) return toast.error("floor id not found");
        const formDataForSlots = {};
        formDataForSlots.floorId = res?.data?._id;
        formDataForSlots.buildingId = buildingId;
        const slots = [];
        polygonsForBackend?.forEach((slot) => {
          if (!slot?.id || !slot?.points?.length) return toast.error("Please Fill all required fields each floor");
          slots.push({ id: slot?.id, points: slot?.points });
        });
        formDataForSlots.slots = slots;
        const resForSlots = await addSlotInBulk({ data: formDataForSlots }).unwrap();
        if (resForSlots?.success) {
          toast.success(`Floor ${name} and ${resForSlots?.data?.length} slots added successfully`);
          console.log("resForSlots", resForSlots);
        }
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
