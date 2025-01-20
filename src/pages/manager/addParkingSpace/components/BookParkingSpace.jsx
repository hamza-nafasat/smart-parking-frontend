import React, { useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg, sensors } from "../utils/addParkingSpaceFeatures";
import { CiEdit } from "react-icons/ci";
import { VscCopy } from "react-icons/vsc";
import { SlCursorMove } from "react-icons/sl";
import { AiOutlineDelete } from "react-icons/ai";
import { CiExport } from "react-icons/ci";
import Button from "../../../../components/shared/small/Button";

const BookParkingSpace = () => {
  const canvasRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [isDrawingEnabled, setIsDrawingEnabled] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [showCropper, setShowCropper] = useState(false);
  const [image, setImage] = useState(null);
  const [currentPolygon, setCurrentPolygon] = useState([]);
  const [polygons, setPolygons] = useState([]);
  const [polygonCount, setPolygonCount] = useState(1);
  const [isEditMode, setIsEditMode] = useState(true);
  const [isCopyMode, setIsCopyMode] = useState(false);
  const [isMoveMode, setIsMoveMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [draggedPolygon, setDraggedPolygon] = useState(null);
  const [draggingPolygon, setDraggingPolygon] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [sensorModal, setSensorModal] = useState(false);

  const sensorModalHandler = () => setSensorModal(true);

  // Handle image upload and display on the canvas
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
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

  // Draw canvas content
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas && !isDrawingEnabled) return;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (image) {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    }

    polygons.forEach((polygon) => {
      if (!polygon || !polygon.points) return;
      context.beginPath();
      context.moveTo(polygon.points[0].x, polygon.points[0].y);
      polygon.points.forEach((point) => context.lineTo(point.x, point.y));
      context.closePath();
      context.fillStyle = "#18bc9c80";
      context.fill();
      context.strokeStyle = "#00b791";
      context.lineWidth = 2;
      context.stroke();

      // Draw ID label with styling
      const idX = polygon.points[0].x;
      const idY = polygon.points[0].y - 5;
      const padding = 4;
      const text = polygon.id;

      context.font = "12px Arial";
      const textWidth = context.measureText(text).width;
      const textHeight = 14;
      const boxWidth = textWidth + padding * 2;
      const boxHeight = textHeight + padding * 2;
      const boxX = idX - padding;
      const boxY = idY - textHeight - padding;

      context.fillStyle = "#FFFFFF";
      context.beginPath();
      context.moveTo(boxX + 4, boxY);
      context.arcTo(
        boxX + boxWidth,
        boxY,
        boxX + boxWidth,
        boxY + boxHeight,
        4
      );
      context.arcTo(
        boxX + boxWidth,
        boxY + boxHeight,
        boxX,
        boxY + boxHeight,
        4
      );
      context.arcTo(boxX, boxY + boxHeight, boxX, boxY, 4);
      context.arcTo(boxX, boxY, boxX + boxWidth, boxY, 4);
      context.closePath();
      context.fill();

      context.fillStyle = "#000000";
      context.fillText(text, boxX + padding, boxY + padding + textHeight - 4);
    });

    if (currentPolygon.length > 0) {
      context.beginPath();
      context.moveTo(currentPolygon[0].x, currentPolygon[0].y);
      currentPolygon.forEach((point) => context.lineTo(point.x, point.y));
      context.strokeStyle = "#18BC9C66";
      context.lineWidth = 2;
      context.stroke();
    }
  };

  // Add point to current polygon
  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (isDeleteMode) {
      handleDeletePolygon(x, y);
    } else if (isCopyMode && draggedPolygon) {
      // Handle copy-pasting of polygons
      const newPolygon = {
        ...draggedPolygon,
        id: `F1-PS${polygonCount}`,
        points: draggedPolygon.points.map((point) => ({
          x: point.x + (x - draggedPolygon.points[0].x),
          y: point.y + (y - draggedPolygon.points[0].y),
        })),
      };
      setPolygons([...polygons, newPolygon]);
      setPolygonCount(polygonCount + 1);
      setDraggedPolygon(null);
    } else if (isEditMode) {
      // Handle creating a new polygon
      const newPolygon = [...currentPolygon, { x, y }];
      setCurrentPolygon(newPolygon);

      if (newPolygon.length === 4) {
        const polygonWithId = {
          points: newPolygon,
          id: `F1-PS${polygonCount}`,
        };
        setPolygons([...polygons, polygonWithId]);
        setPolygonCount(polygonCount + 1);
        setCurrentPolygon([]);
      }
    }
  };

  // Toggle Copy Mode
  const handleCopyMode = () => {
    setIsCopyMode(!isCopyMode);
    setIsEditMode(false);
    setIsMoveMode(false);
    setIsDeleteMode(false);
    setDraggedPolygon(null);
  };

  // Toggle Move Mode
  const handleMoveMode = () => {
    setIsMoveMode(!isMoveMode);
    setIsEditMode(false);
    setIsCopyMode(false);
    setIsDeleteMode(false);
    setDraggingPolygon(null);
  };

  // Toggle Delete Mode
  const handleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);
    setIsEditMode(false);
    setIsCopyMode(false);
    setIsMoveMode(false);
  };

  // Enable Polygon Copying
  const handlePolygonCopy = (event) => {
    if (!isCopyMode) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const selectedPolygon = polygons.find((polygon) => {
      const path = new Path2D();
      path.moveTo(polygon.points[0].x, polygon.points[0].y);
      polygon.points.forEach((point) => path.lineTo(point.x, point.y));
      path.closePath();

      return canvas.getContext("2d").isPointInPath(path, x, y);
    });

    if (selectedPolygon) {
      setDraggedPolygon(selectedPolygon);
    }
  };

  // Start dragging polygon on mouse down in Move Mode
  const handleCanvasMouseDown = (event) => {
    if (!isMoveMode) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const selectedPolygon = polygons.find((polygon) => {
      const path = new Path2D();
      path.moveTo(polygon.points[0].x, polygon.points[0].y);
      polygon.points.forEach((point) => path.lineTo(point.x, point.y));
      path.closePath();

      return canvas.getContext("2d").isPointInPath(path, x, y);
    });

    if (selectedPolygon) {
      setDraggingPolygon(selectedPolygon);
      setDragOffset({
        x: x - selectedPolygon.points[0].x,
        y: y - selectedPolygon.points[0].y,
      });
    }
  };

  // Handle polygon dragging in Move Mode
  const handleCanvasMouseMove = (event) => {
    if (isCopyMode) {
      handlePolygonCopy(event);
    } else if (draggingPolygon) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const updatedPolygons = polygons.map((polygon) => {
        if (polygon.id === draggingPolygon.id) {
          const updatedPoints = polygon.points.map((point) => ({
            x: point.x + (x - dragOffset.x - polygon.points[0].x),
            y: point.y + (y - dragOffset.y - polygon.points[0].y),
          }));
          return { ...polygon, points: updatedPoints };
        }
        return polygon;
      });

      setPolygons(updatedPolygons);
    }
  };

  // Stop dragging on mouse up
  const handleCanvasMouseUp = () => {
    setDraggingPolygon(null);
  };

  // Delete polygon
  const handleDeletePolygon = (x, y) => {
    const canvas = canvasRef.current;
    const updatedPolygons = polygons.filter((polygon) => {
      const path = new Path2D();
      path.moveTo(polygon.points[0].x, polygon.points[0].y);
      polygon.points.forEach((point) => path.lineTo(point.x, point.y));
      path.closePath();

      return !canvas.getContext("2d").isPointInPath(path, x, y);
    });
    setPolygons(updatedPolygons);
  };

  // attaching sensor to the polygon
  const updateSensorAttached = (polygonId, sensor) => {
    const updatedPolygons = polygons.map((polygon) => {
      return polygon?.id === polygonId
        ? { ...polygon, sensorAttached: sensor }
        : polygon;
    });
    setPolygons(updatedPolygons);
  };

  // Export SVG functionality
  const exportSVG = async () => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    // Convert blob URL to base64
    const toBase64 = async (blobUrl) => {
      const response = await fetch(blobUrl);
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    };

    // Convert the image's blob URL to a base64 data URL
    const base64Image = await toBase64(image.src);

    // Create SVG content
    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}">`;

    // Embed the base64 image in the SVG
    svgContent += `<image href="${base64Image}" width="${canvas.width}" height="${canvas.height}" />`;

    // Add polygons and text labels to the SVG
    polygons.forEach((polygon) => {
      svgContent += `<polygon points="${polygon.points
        .map((point) => `${point.x},${point.y}`)
        .join(" ")}" id="${polygon.id}" sensorAttached="${
        polygon.sensorAttached || ""
      }" fill="#18bc9c80" stroke="#00b791" stroke-width="2"/>`;
      svgContent += `<text x="${polygon.points[0].x}" y="${
        polygon.points[0].y - 10
      }" font-size="12" fill="black">${polygon.id}</text>`;
    });

    svgContent += "</svg>";

    // Create a blob and download the SVG file
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "parking-slot.svg";
    link.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (isDrawingEnabled) {
      drawCanvas();
    }
  }, [image, polygons, currentPolygon]);

  return (
    <div className="relative">
      {!isDrawingEnabled && <BrowseFileBtn onFileChange={handleImageUpload} />}
      <canvas
        width={800}
        height={500}
        ref={canvasRef}
        className="border border-primary border-dashed rounded-lg"
        onClick={handleCanvasClick}
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={handleCanvasMouseUp}
      />
      {showCropper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg w-3/4 max-w-lg">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={8 / 5}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
            <div className="flex items-center gap-2 mt-4 z-[999] absolute bottom-6 right-6">
              <button
                onClick={() => setShowCropper(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCropConfirm}
                className="bg-primary text-white px-4 py-2 rounded"
              >
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
              onClick={() => {
                setIsEditMode(!isEditMode);
                setIsCopyMode(false);
                setIsMoveMode(false);
                setIsDeleteMode(false);
              }}
              className={`p-2 border rounded-md text-white ${
                isEditMode ? "border-primary" : "border-[#565656]"
              }`}
            >
              <CiEdit
                fontSize={20}
                color={isEditMode ? "#18bc9c" : "#565656"}
              />
            </button>
            <button
              onClick={handleCopyMode}
              className={`p-2 border rounded-md text-white ${
                isCopyMode ? "border-primary" : "border-[#565656]"
              }`}
            >
              <VscCopy
                fontSize={20}
                color={isCopyMode ? "#18bc9c" : "#565656"}
              />
            </button>
            <button
              onClick={handleMoveMode}
              className={`p-2 border rounded-md text-white ${
                isMoveMode ? "border-primary" : "border-[#565656]"
              }`}
            >
              <SlCursorMove
                fontSize={20}
                color={isMoveMode ? "#18bc9c" : "#565656"}
              />
            </button>
            <button
              onClick={handleDeleteMode}
              className={`p-2 border rounded-md text-white ${
                isDeleteMode ? "border-primary" : "border-[#565656]"
              }`}
            >
              <AiOutlineDelete
                fontSize={20}
                color={isDeleteMode ? "#18bc9c" : "#565656"}
              />
            </button>
            <button
              className="border rounded-md border-[#565656] hover:border-primary p-2"
              onClick={exportSVG}
            >
              <CiExport />
            </button>
          </div>
          <button
            className="absolute top-5 left-5 bg-primary px-3 py-[6px] rounded-md text-white text-sm font-bold"
            onClick={sensorModalHandler}
          >
            Add Sensor
          </button>
          {/* sensor modal */}
          {sensorModal && (
            <SensorModal
              setSensorModal={setSensorModal}
              polygons={polygons}
              sensors={sensors}
              onUpdateSensor={updateSensorAttached}
            />
          )}
        </>
      )}
    </div>
  );
};

export default BookParkingSpace;

const SensorModal = ({ setSensorModal, polygons, sensors, onUpdateSensor }) => {
  const [selectedSensors, setSelectedSensors] = useState({});

  const sensorSelectHandler = (polygonId, sensor) => {
    setSelectedSensors({ ...selectedSensors, [polygonId]: sensor });
    onUpdateSensor(polygonId, sensor);
  };
  console.log("selectedSensors", selectedSensors);
  return (
    <div className="bg-white p-4 rounded-lg shadow-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px]">
      <h6 className="text-sm font-medium text-[#414141] text-center">
        Add Sensor
      </h6>
      <div className="my-6 h-[200px] overflow-y-scroll custom-scroll">
        {polygons?.map((polygon, i) => (
          <div key={i} className="grid grid-cols-2 gap-4 mb-2">
            <h6 className="px-4 h-[45px] flex items-center border rounded-md text-xs text-[#414141]">
              {polygon?.id}
            </h6>
            <select
              name="sensors"
              className="outline-none border rounded-md px-2 text-xs text-[#414141]"
              onChange={(e) => sensorSelectHandler(polygon?.id, e.target.value)}
            >
              <option>Select Sensor</option>
              {sensors?.map((sensor, i) => (
                <option key={i} value={sensor?.value}>
                  {sensor?.option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-3">
        <Button
          text="Cancel"
          width="w-20 sm:w-[85px]"
          bg="bg-white hover:bg-primary hover:text-white"
          color="text-primary"
          onClick={() => setSensorModal(false)}
        />
        <Button
          text="Save"
          width="w-20 sm:w-[85px]"
          onClick={() => setSensorModal(false)}
        />
      </div>
    </div>
  );
};

const BrowseFileBtn = ({ onFileChange }) => {
  return (
    <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 cursor-pointer rounded-lg bg-primary text-white font-semibold">
      Browse File
      <input
        type="file"
        className="absolute inset-0 cursor-pointer opacity-0"
        onChange={onFileChange}
      />
    </button>
  );
};
