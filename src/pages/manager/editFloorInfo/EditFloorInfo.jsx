import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { AccordionEditIcon } from "../../../assets/svgs/Icon";
import Button from "../../../components/shared/small/Button";
import Input from "../../../components/shared/small/Input";
import { useGetSingleFloorQuery, useUpdateSingleFloorMutation } from "../../../redux/apis/floorApis";
import UpdateModel from "../addParkingSpace/components/UpdateModel";
import { useGetAllSlotsQuery } from "../../../redux/apis/slotApis";

function EditFloorInfo() {
  const navigate = useNavigate();
  const params = useParams();
  const buildingId = params.buildingId;
  const floorId = params.id;

  const { data, refetch } = useGetSingleFloorQuery(floorId);
  const { data: slots } = useGetAllSlotsQuery(floorId);
  const [updateFloor, { isLoading }] = useUpdateSingleFloorMutation();

  const [name, setName] = useState("");
  const [noOfParkingSpace, setNumberOfParkingSpace] = useState();
  const [originalImage, setOriginalImage] = useState(null);
  const [polygons, setPolygons] = useState([]);
  const [polygonsForBackend, setPolygonsForBackend] = useState([]);
  const [imageSrc, setImageSrc] = useState(null);

  const [polygonsForCreate, setPolygonsForCreate] = useState([]);
  const [polygonsForDelete, setPolygonsForDelete] = useState([]);

  // if (!name || !noOfParkingSpace || !imageSrc || !polygonsForBackend) return toast.error("Fill all fields first");
  // const formData = new FormData();
  // formData.append("name", name);
  // formData.append("noOfParkingSpace", noOfParkingSpace);
  // formData.append("floorImage", imageSrc);
  // formData.append("polygonData", JSON.stringify(polygonsForBackend));
  // if (originalImage) formData.append("file", originalImage);
  // try {
  //   const res = await updateFloor({ id: floorId, data: formData }).unwrap();
  //   if (res?.success) toast.success(res?.message);
  //   await refetch();
  //   return navigate(`/manager/floor-view/${buildingId}/${floorId}`);
  // } catch (error) {
  //   console.log("Error in update floor", error);
  //   toast.error(error?.data?.message || "Something went wrong");
  // }

  const saveClickHandler = async () => {
    try {
      // make data for update
      let dataForUpdate = {};
      if (name) dataForUpdate.name = name;
      if (originalImage) dataForUpdate.file = originalImage;
      if (noOfParkingSpace) dataForUpdate.noOfParkingSpace = noOfParkingSpace;
      if (polygonsForCreate?.length)
        dataForUpdate.polygonsForCreate = polygonsForCreate?.filter(
          (p) => p.id && p.points && p.sensorId && p.color && p.fillColor
        );
      if (polygonsForDelete?.length) dataForUpdate.polygonsForDelete = polygonsForDelete;

      // hit apis and update data
    } catch (error) {}
  };

  const onUploadForFloorImage = (image, coordinates) => {
    setImageSrc(image);
    setPolygonsForBackend(coordinates);
  };

  useEffect(() => {
    if (data?.data) {
      const floor = data?.data;
      console.log("this is floor", floor);
      setName(floor.name);
      setNumberOfParkingSpace(floor.noOfParkingSpace);
      setImageSrc(floor?.twoDImage?.url);
    }
  }, [data?.data]);
  useEffect(() => {
    if (slots?.data) {
      const slotsData = slots?.data;
      const polygons = slotsData?.map((slot) => ({
        _id: slot._id,
        id: slot.id,
        points: slot?.points,
        color: slot?.color,
        fillColor: slot?.fillColor,
      }));
      setPolygons(polygons);
      setPolygonsForBackend(polygons);
    }
  }, [slots?.data]);

  console.log("polygonsForCreate", polygonsForCreate);
  console.log("polygonsForDelete", polygonsForDelete);

  return (
    <div>
      <div className="flex items-center justify-between bg-primary rounded-[4px] px-4 md:px-8 py-2">
        <h6 className="text-base md:text-lg font-bold text-white">Floor 1</h6>
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
            <UpdateModel
              heading="Upload Floor TwoD Model"
              onUpload={onUploadForFloorImage}
              polygons={polygons}
              setPolygons={setPolygons}
              imageSrc={imageSrc}
              setImageSrc={setImageSrc}
              setOriginalImage={setOriginalImage}
              newPolygons={polygonsForCreate}
              setNewPolygons={setPolygonsForCreate}
              deletePolygonIds={polygonsForDelete}
              setDeletedPolygonsIds={setPolygonsForDelete}
            />
          </div>
        </div>
        <div className="min-w-full flex justify-end pr-6 m-2">
          <Button
            disabled={isLoading}
            className={`${isLoading ? "cursor-not-allowed opacity-30" : ""}`}
            width="w-[200px]"
            type="button"
            text="Save Floor Data"
            onClick={saveClickHandler}
          />
        </div>
      </>
    </div>
  );
}

export default EditFloorInfo;
