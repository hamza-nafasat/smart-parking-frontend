/* eslint-disable react/prop-types */
import { useState } from "react";
import DeleteIcon from "../../../../assets/svgs/building/DeleteIcon";
import UpdateFloorModel from "./UpdateFloorModel";

const UpdateModel = ({
  onUpload,
  polygons,
  setPolygons,
  imageSrc,
  setImageSrc,
  setOriginalImage,
  heading = "Upload TwoD Model",
  isBuilding = false,
  newPolygons,
  setNewPolygons,
  deletePolygonIds,
  setDeletedPolygonsIds,
}) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const deleteButtonHandler = () => {
    setRefreshKey((prev) => prev + 1);
    setImageSrc(null);
    setOriginalImage(null);
  };
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm md:text-base font-semibold text-[rgba(6,6,6,0.8)]">{heading}</h3>
        <div className="cursor-pointer" onClick={deleteButtonHandler}>
          <DeleteIcon />
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <UpdateFloorModel
          key={refreshKey}
          onUpload={onUpload}
          polygons={polygons}
          setPolygons={setPolygons}
          imageSrc={imageSrc}
          setImageSrc={setImageSrc}
          setOriginalImage={setOriginalImage}
          isBuilding={isBuilding}
          newPolygons={newPolygons}
          setNewPolygons={setNewPolygons}
          deletePolygonIds={deletePolygonIds}
          setDeletedPolygonsIds={setDeletedPolygonsIds}
        />
      </div>
    </div>
  );
};

export default UpdateModel;
