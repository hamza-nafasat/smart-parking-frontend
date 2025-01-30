/* eslint-disable react/prop-types */
import { useState } from "react";
import DeleteIcon from "../../../../assets/svgs/building/DeleteIcon";
import TwoDModel from "./TwoDModel";

const UploadModel = ({
  onUpload,
  polygons,
  setPolygons,
  imageSrc,
  setImageSrc,
}) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const deleteButtonHandler = () => setRefreshKey((prev) => prev + 1);
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm md:text-base font-semibold text-[rgba(6,6,6,0.8)]">
          Upload 2D Model Of Building
        </h3>
        <div className="cursor-pointer" onClick={deleteButtonHandler}>
          <DeleteIcon />
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <TwoDModel
          key={refreshKey}
          onUpload={onUpload}
          polygons={polygons}
          setPolygons={setPolygons}
          imageSrc={imageSrc}
          setImageSrc={setImageSrc}
        />
      </div>
    </div>
  );
};

export default UploadModel;
