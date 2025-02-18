// getCroppedImg.js
const getCroppedImg = (imageSrc, crop) => {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 800;
      canvas.height = 500;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        resolve(URL.createObjectURL(blob));
      }, "image/jpeg");
    };
  });
};

const sensors = [
  { option: "Sensor-01", value: "sensor-01" },
  { option: "Sensor-02", value: "sensor-02" },
  { option: "Sensor-03", value: "sensor-03" },
  { option: "Sensor-04", value: "sensor-04" },
  { option: "Sensor-05", value: "sensor-05" },
];

const floors = [
  {
    parking: "Floor 1-ParkingSpace-1",
    sensor: "Sensor name-01",
  },
  {
    parking: "Floor 1-ParkingSpace-2",
    sensor: "Sensor name-02",
  },
  {
    parking: "Floor 2-ParkingSpace-1",
    sensor: "Sensor name-03",
  },
  {
    parking: "Floor 2-ParkingSpace-2",
    sensor: "Sensor name-04",
  },
  {
    parking: "Floor 3-ParkingSpace-1",
    sensor: "Sensor name-05",
  },
];

// Draw canvas content
const drawCanvas = (canvasRef, isDrawingEnabled, image, polygons, currentPolygon) => {
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
    //  Fill the polygon with the color
    const fillColor = polygon?.color ? `${polygon.color}90` : "#18BC9C60";
    const strokeColor = polygon?.fillColor || polygon?.color || "#18BC9C";
    context.fillStyle = fillColor;
    context.strokeStyle = strokeColor;
    context.fill();

    // Draw the border with the specified color
    context.strokeStyle = polygon?.fillColor || polygon.color || "#18BC9C60";
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

    context.fillStyle = "#fff";
    context.beginPath();
    context.moveTo(boxX + 4, boxY);
    context.arcTo(boxX + boxWidth, boxY, boxX + boxWidth, boxY + boxHeight, 4);
    context.arcTo(boxX + boxWidth, boxY + boxHeight, boxX, boxY + boxHeight, 4);
    context.arcTo(boxX, boxY + boxHeight, boxX, boxY, 4);
    context.arcTo(boxX, boxY, boxX + boxWidth, boxY, 4);
    context.closePath();
    context.fill();

    context.fillStyle = "#000";
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
const handleCanvasClick = (
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
) => {
  const canvas = canvasRef.current;
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  if (isDeleteMode) {
    handleDeletePolygon(x, y, canvasRef, polygons, setPolygons);
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
    openSensorPopup(newPolygon);
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
      openSensorPopup(polygonWithId);
    }
  }
};

// Toggle Copy Mode
const handleCopyMode = (
  setIsCopyMode,
  setIsEditMode,
  setIsMoveMode,
  setIsDeleteMode,
  setDraggedPolygon,
  isCopyMode
) => {
  setIsCopyMode(!isCopyMode);
  setIsEditMode(false);
  setIsMoveMode(false);
  setIsDeleteMode(false);
  setDraggedPolygon(null);

  // if (!isCopyMode) {
  //   const lastPolygon = polygons[polygons.length - 1];
  //   if (lastPolygon) {
  //     const newPolygon = {
  //       ...lastPolygon,
  //       id: polygonCount + 1,
  //       points: lastPolygon.points.map((point) => ({
  //         ...point,
  //         x: point.x + 10,
  //         y: point.y + 10,
  //       })),
  //     };
  //     setPolygons([...polygons, newPolygon]);
  //     setPolygonCount(polygonCount + 1);
  //     setSelectedPolygon(newPolygon);
  //     setSensorPopup(true);
  //   }
  // }
};

// Toggle Move Mode
const handleMoveMode = (
  setIsMoveMode,
  setIsEditMode,
  setIsCopyMode,
  setIsDeleteMode,
  setDraggingPolygon,
  isMoveMode
) => {
  setIsMoveMode(!isMoveMode);
  setIsEditMode(false);
  setIsCopyMode(false);
  setIsDeleteMode(false);
  setDraggingPolygon(null);
};

// Toggle Delete Mode
const handleDeleteMode = (setIsDeleteMode, setIsEditMode, setIsCopyMode, setIsMoveMode, isDeleteMode) => {
  setIsDeleteMode(!isDeleteMode);
  setIsEditMode(false);
  setIsCopyMode(false);
  setIsMoveMode(false);
};

// Enable Polygon Copying
const handlePolygonCopy = (event, isCopyMode, canvasRef, polygons, setDraggedPolygon) => {
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
const handleCanvasMouseDown = (event, isMoveMode, canvasRef, polygons, setDraggingPolygon, setDragOffset) => {
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
const handleCanvasMouseMove = (
  event,
  isCopyMode,
  canvasRef,
  polygons,
  draggingPolygon,
  dragOffset,
  setDraggedPolygon,
  setPolygons
) => {
  if (isCopyMode) {
    handlePolygonCopy(event, isCopyMode, canvasRef, polygons, setDraggedPolygon);
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
const handleCanvasMouseUp = (setDraggingPolygon, setSensorPopup, draggingPolygon) => {
  if (draggingPolygon) {
    setSensorPopup(true);
  }
  setDraggingPolygon(null);
};

// Delete polygon
const handleDeletePolygon = (x, y, canvasRef, polygons, setPolygons) => {
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
const updateSensorAttached = (polygonId, sensor, polygons, setPolygons) => {
  const updatedPolygons = polygons.map((polygon) => {
    return polygon?.id === polygonId ? { ...polygon, sensorAttached: sensor } : polygon;
  });
  setPolygons(updatedPolygons);
};

const polygonsLabelHandler = (selectedOption, selectedPolygon, polygons, setPolygons) => {
  console.log("fjl;kasjdfl;kasjdfl;as", selectedOption, selectedPolygon);
  let selectedPolygonId = selectedPolygon.id;
  setPolygons(
    polygons.map((poly) => {
      if (poly.id === selectedPolygonId) {
        poly.labelPoint = selectedOption.value;
        return poly;
      } else return poly;
    })
  );
};

const sensorInfoSubmitHandler = (
  sensorIdInput,
  polygons,
  selectedPolygon,
  selectedSensor,
  color,
  setPolygons,
  setSensorPopup
) => {
  if (sensorIdInput) {
    const updatedPolygons = polygons.map((polygon) =>
      polygon.id === selectedPolygon.id
        ? {
            ...polygon,
            id: sensorIdInput,
            sensorAttached: selectedSensor || sensorIdInput,
            color: color,
            fillColor: color,
            labelPoint: polygon.labelPoint || "first",
          }
        : polygon
    );
    setPolygons(updatedPolygons);
    setSensorPopup(false);
  } else {
    // If sensorIdInput is empty, we do not allow the polygon to be drawn.
    alert("without sensor id and sensor name polygon not draw");
  }
};

const handleCancelPolygon = (setSensorPopup, setPolygons, selectedPolygon, setCurrentPolygon, setSelectedPolygon) => {
  setSensorPopup(false);
  setPolygons((prevPolygons) => prevPolygons.filter((polygon) => polygon.id !== selectedPolygon?.id));
  setCurrentPolygon([]);
  setSelectedPolygon(null);
};

const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

export {
  drawCanvas,
  floors,
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
  handlePolygonCopy,
  polygonsLabelHandler,
  sensorInfoSubmitHandler,
  sensors,
  updateSensorAttached,
  dataURLtoFile,
};
