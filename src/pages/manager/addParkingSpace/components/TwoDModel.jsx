/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { SlCursorMove } from "react-icons/sl";
import { VscCopy } from "react-icons/vsc";
import {
  drawCanvas,
  getCroppedImg,
  handleCancelPolygon,
  handleCanvasClick,
  handleCanvasMouseDown,
  handleCanvasMouseMove,
  handleCanvasMouseUp,
  handleCopyMode,
  handleDeleteMode,
  handleDeletePolygon,
  handleMoveMode,
  polygonsLabelHandler,
  sensorInfoSubmitHandler,
} from "../utils/addParkingSpaceFeatures";
import Dropdown from "../../../../components/shared/small/Dropdown";
import Button from "../../../../components/shared/small/Button";
import Modal from '../../../../components/shared/small/Modal'
import Input from "../../../../components/shared/small/Input";

const TwoDModel = ({ onUpload, polygons, setPolygons, imageSrc, setImageSrc, setOriginalImage, isBuilding }) => {
  const canvasRef = useRef(null);
  const [isDrawingEnabled, setIsDrawingEnabled] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [showCropper, setShowCropper] = useState(false);
  const [image, setImage] = useState(null);
  const [currentPolygon, setCurrentPolygon] = useState([]);
  const [polygonCount, setPolygonCount] = useState(1);
  const [isEditMode, setIsEditMode] = useState(true);
  const [isCopyMode, setIsCopyMode] = useState(false);
  const [isMoveMode, setIsMoveMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [draggedPolygon, setDraggedPolygon] = useState(null);
  const [draggingPolygon, setDraggingPolygon] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [sensorPopup, setSensorPopup] = useState(false);
  const [selectedPolygon, setSelectedPolygon] = useState(null);
  const [polygonName, setPolygonName] = useState("");
  const [selectedSensor, setSelectedSensor] = useState("No sensor");
  const [color, setColor] = useState("#18bc9c");

  const openSensorPopup = (polygon) => {
    setSelectedPolygon(polygon);
    setSensorPopup(true);
    setPolygonName("");
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setOriginalImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        setShowCropper(true);
        setIsDrawingEnabled(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropConfirm = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      const img = new Image();
      img.src = croppedImage;
      img.onload = () => setImage(img);
      setShowCropper(false);
    } catch (error) {
      console.error("Crop failed:", error);
    }
  };

  useEffect(() => {
    if (isDrawingEnabled) {
      drawCanvas(canvasRef, isDrawingEnabled, image, polygons, currentPolygon, color);
    }
  }, [image, polygons, currentPolygon, isDrawingEnabled, color]);

  useEffect(() => {
    if (onUpload) onUpload(imageSrc, polygons);
  }, [imageSrc, polygons]);

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
      {!isDrawingEnabled && <BrowseFileBtn onFileChange={handleImageUpload} />}
      <canvas
        width={800}
        height={500}
        ref={canvasRef}
        className="border border-primary border-dashed rounded-lg"
        onClick={(event) =>
          handleCanvasClick(
            event,
            canvasRef,
            isDeleteMode,
            handleDeletePolygon,
            isCopyMode,
            draggedPolygon,
            polygonCount,
            setPolygons,
            setPolygonCount,
            setDraggedPolygon,
            isEditMode,
            setCurrentPolygon,
            polygons,
            currentPolygon,
            openSensorPopup
          )
        }
        onMouseDown={(event) =>
          handleCanvasMouseDown(event, isMoveMode, canvasRef, polygons, setDraggingPolygon, setDragOffset)
        }
        onMouseMove={(event) =>
          handleCanvasMouseMove(
            event,
            isCopyMode,
            canvasRef,
            polygons,
            draggingPolygon,
            dragOffset,
            setDraggedPolygon,
            setPolygons
          )
        }
        onMouseUp={() => handleCanvasMouseUp(setDraggingPolygon, setSensorPopup, draggingPolygon)}
      />
      {showCropper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg w-3/4 max-w-lg">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={12 / 5}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
            <div className="flex items-center gap-2 mt-4 z-[999] absolute bottom-6 right-6">
              <button onClick={() => setShowCropper(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
              <button type="button" onClick={handleCropConfirm} className="bg-primary text-white px-4 py-2 rounded">
                Crop
              </button>
            </div>
          </div>
        </div>
      )}
      {isDrawingEnabled && (
        <>
          <div className="flex flex-col items-center gap-4 absolute top-0 right-[-6%]">
            <button
              type="button"
              onClick={() => {
                setIsEditMode(!isEditMode);
                setIsCopyMode(false);
                setIsMoveMode(false);
                setIsDeleteMode(false);
              }}
              className={`p-2 border rounded-md text-white ${isEditMode ? "border-primary" : "border-[#565656]"}`}
            >
              <CiEdit fontSize={20} color={isEditMode ? "#18bc9c" : "#565656"} />
            </button>
            <button
              type="button"
              onClick={() =>
                handleCopyMode(
                  setIsCopyMode,
                  setIsEditMode,
                  setIsMoveMode,
                  setIsDeleteMode,
                  setDraggedPolygon,
                  isCopyMode,
                  setSensorPopup,
                  setSelectedPolygon,
                  polygons,
                  setPolygons,
                  polygonCount,
                  setPolygonCount
                )
              }
              className={`p-2 border rounded-md text-white ${isCopyMode ? "border-primary" : "border-[#565656]"}`}
            >
              <VscCopy fontSize={20} color={isCopyMode ? "#18bc9c" : "#565656"} />
            </button>
            <button
              type="button"
              onClick={() =>
                handleMoveMode(
                  setIsMoveMode,
                  setIsEditMode,
                  setIsCopyMode,
                  setIsDeleteMode,
                  setDraggingPolygon,
                  isMoveMode
                )
              }
              className={`p-2 border rounded-md text-white ${isMoveMode ? "border-primary" : "border-[#565656]"}`}
            >
              <SlCursorMove fontSize={20} color={isMoveMode ? "#18bc9c" : "#565656"} />
            </button>
            <button
              type="button"
              onClick={() =>
                handleDeleteMode(setIsDeleteMode, setIsEditMode, setIsCopyMode, setIsMoveMode, isDeleteMode)
              }
              className={`p-2 border rounded-md text-white ${isDeleteMode ? "border-primary" : "border-[#565656]"}`}
            >
              <AiOutlineDelete fontSize={20} color={isDeleteMode ? "#18bc9c" : "#565656"} />
            </button>
          </div>
        </>
      )}
      {sensorPopup && selectedPolygon && (
        <Modal title="Add Sensor" onClose={() => setSensorPopup(false)}>
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              placeholder="name"
              label="Name"
              value={polygonName}
              onChange={(e) => setPolygonName(e.target.value)}
            />
            
            {isBuilding && (
              <Dropdown
                defaultText={selectedSensor}
                options={[
                  { option: "Sensor 1", value: "sensor-1" },
                  { option: "Sensor 2", value: "sensor-2" },
                ]}
                label="Sensor Name"
                // onChange={(e) => setSelectedSensor(e.target.value)}
                onSelect={(selectedOption) => setSelectedSensor(selectedOption.value)}
              />
            )}

            {/* <Dropdown
              defaultText={"first"}
              options={[
                { option: "First-Point", value: "first" },
                { option: "Second-Point", value: "second" },
                { option: "Third-Point", value: "third" },
                { option: "Fourth-Point", value: "fourth" },
              ]}
              label="Label Positioning of polygon"
              onSelect={(selectedOption) =>
                polygonsLabelHandler(selectedOption, selectedPolygon, polygons, setPolygons)
              }
            /> */}

            <div className="flex items-center gap-4">
              <h1 className="font-bold text-xs">Select Color of Polygon</h1>
              <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
            </div>

            <div className="flex justify-center gap-3">
              <Button
                disabled={!polygonName}
                text="Add"
                width="w-[120px]"
                onClick={() => {
                  sensorInfoSubmitHandler(
                    polygonName,
                    polygons,
                    selectedPolygon,
                    selectedSensor,
                    color,
                    setPolygons,
                    setSensorPopup
                  );
                  setSensorPopup(false);
                }}
              />
              <Button
                width="w-[120px]"
                text="cancel"
                onClick={() =>
                  handleCancelPolygon(
                    setSensorPopup,
                    setPolygons,
                    selectedPolygon,
                    setCurrentPolygon,
                    setSelectedPolygon
                  )
                }
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default TwoDModel;

const BrowseFileBtn = ({ onFileChange }) => {
  return (
    <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 cursor-pointer rounded-lg bg-primary text-white font-semibold">
      Browse File
      <input type="file" className="absolute inset-0 cursor-pointer opacity-0" onChange={onFileChange} />
    </button>
  );
};
