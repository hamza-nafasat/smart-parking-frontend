import React, { useState } from "react";
import DeleteIcon from "../../../../assets/svgs/building/DeleteIcon";
import BrowseFile from "../../../../components/shared/large/BrowseFile";

const UploadModel = () => {
    const [file, setFile] = useState(null)
    const [imagePreview, setImagePreview] = useState(null);

    const deleteButtonHandler = () => setImagePreview(null)
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
      <div className="mt-1">
        <BrowseFile setFile={setFile} imagePreview={imagePreview} setImagePreview={setImagePreview} />
      </div>
    </div>
  );
};

export default UploadModel;
