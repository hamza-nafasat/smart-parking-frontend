/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { drawCanvas } from "../utils/addParkingSpaceFeatures";

const TwoDModelView = ({ polygons, imageSrc }) => {
  const canvasRef = useRef(null);
  const [isDrawingEnabled, setIsDrawingEnabled] = useState(false);
  const [image, setImage] = useState(null);
  const [currentPolygon, setCurrentPolygon] = useState([]);

  useEffect(() => {
    if (isDrawingEnabled) {
      drawCanvas(canvasRef, isDrawingEnabled, image, polygons, currentPolygon);
    }
  }, [image, polygons, currentPolygon, isDrawingEnabled]);

  useEffect(() => {
    if (imageSrc) {
      const img = new Image();
      img.onload = () => {
        setImage(img);
        setIsDrawingEnabled(true);
      };
      img.onerror = (err) => console.log("Image failed to load", err);
      img.src = imageSrc;
    }
  }, [imageSrc]);

  return (
    <div className="relative">
      {!isDrawingEnabled && <BrowseFileBtn />}
      <canvas width={800} height={500} ref={canvasRef} className="border border-primary border-dashed rounded-lg" />
    </div>
  );
};

export default TwoDModelView;

const BrowseFileBtn = ({ onFileChange }) => {
  return (
    <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 cursor-pointer rounded-lg bg-primary text-white font-semibold">
      Browse File
      <input type="file" className="absolute inset-0 cursor-pointer opacity-0" onChange={onFileChange} />
    </button>
  );
};
