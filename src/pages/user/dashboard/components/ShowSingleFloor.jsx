/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../../../components/shared/small/Modal';
// import Modal from './Modal'; // Adjust the import path as needed

// Helper function to convert hex to rgba with opacity
const convertHexToRgba = (hex, opacity) => {
  const cleanHex = hex.replace('#', '');
  const bigint = parseInt(cleanHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const ShowSingleFloor = ({ image, polygons, view, heatmap = false }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [selectedPolygon, setSelectedPolygon] = useState(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 500 });

  // Handle responsive canvas size
  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      if (container) {
        const containerWidth = container.clientWidth - 32; // Account for padding
        const aspectRatio = 800 / 500;
        let newWidth = Math.min(containerWidth, 1200);
        let newHeight = newWidth / aspectRatio;

        // Set max height for better viewing
        if (newHeight > 600) {
          newHeight = 600;
          newWidth = newHeight * aspectRatio;
        }

        setCanvasSize({ width: newWidth, height: newHeight });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scale polygon points based on canvas size
  const scalePoints = (points, originalWidth = 800, originalHeight = 500) => {
    const scaleX = canvasSize.width / originalWidth;
    const scaleY = canvasSize.height / originalHeight;

    return points.map((point) => ({
      x: point.x * scaleX,
      y: point.y * scaleY,
    }));
  };

  // Function to handle polygon click detection
  const handlePolygonClick = (e, polygon, scaledPoints) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    // Get the context and begin a path for the polygon
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(scaledPoints[0].x, scaledPoints[0].y);
    scaledPoints.forEach((point) => ctx.lineTo(point.x, point.y));
    ctx.closePath();

    // Check if the click is inside the polygon path
    const isInside = ctx.isPointInPath(mouseX, mouseY);
    if (isInside) {
      setSelectedPolygon(polygon);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    const ctx = canvas.getContext('2d');

    // Clear the canvas and draw the image as background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const img = new Image();
    img.onload = () => {
      // Draw image to cover the canvas while maintaining aspect ratio
      const imgAspect = img.width / img.height;
      const canvasAspect = canvas.width / canvas.height;

      let drawWidth,
        drawHeight,
        offsetX = 0,
        offsetY = 0;

      if (imgAspect > canvasAspect) {
        drawHeight = canvas.height;
        drawWidth = img.width * (canvas.height / img.height);
        offsetX = (canvas.width - drawWidth) / 2;
      } else {
        drawWidth = canvas.width;
        drawHeight = img.height * (canvas.width / img.width);
        offsetY = (canvas.height - drawHeight) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      if (heatmap) {
        // Draw heatmap-style polygons
        polygons?.forEach((polygon) => {
          if (!polygon || !polygon?.points) return;

          const scaledPoints = scalePoints(polygon.points);

          // Calculate the center of the polygon
          const centerX = scaledPoints.reduce((sum, p) => sum + p.x, 0) / scaledPoints.length;
          const centerY = scaledPoints.reduce((sum, p) => sum + p.y, 0) / scaledPoints.length;

          // Scale radius based on canvas size
          const radius = (polygon.radius || 50) * (canvasSize.width / 800);

          // Create radial gradient
          const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
          gradient.addColorStop(0, polygon.fillColor || 'red');
          gradient.addColorStop(1, 'rgba(255, 255, 0, 0.3)');

          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
          ctx.fillStyle = gradient;
          ctx.fill();
        });
      } else {
        // Draw normal polygons
        polygons?.forEach((polygon) => {
          if (!polygon || !polygon.points) return;

          const scaledPoints = scalePoints(polygon.points);

          ctx.beginPath();
          ctx.moveTo(scaledPoints[0].x, scaledPoints[0].y);
          scaledPoints.forEach((point) => ctx.lineTo(point.x, point.y));
          ctx.closePath();

          // Fill polygon with a semi-transparent color
          ctx.fillStyle = polygon.fillColor ? convertHexToRgba(polygon.fillColor, 0.5) : 'rgba(255, 255, 255, 0.5)';
          ctx.fill();

          // Draw border of the polygon
          ctx.strokeStyle = polygon.color || '#000000';
          ctx.lineWidth = Math.max(1, 2 * (canvasSize.width / 800));
          ctx.stroke();

          // Add event listener for polygon click detection
          canvas.addEventListener('click', (e) => handlePolygonClick(e, polygon, scaledPoints));

          // Draw label for the polygon
          const labelX = scaledPoints[0]?.x;
          const labelY = scaledPoints[0]?.y - 10 * (canvasSize.width / 800);
          if (labelX && labelY) {
            const padding = 5 * (canvasSize.width / 800);
            const fontSize = Math.max(10, 12 * (canvasSize.width / 800));
            const text = polygon.id || `Slot ${polygon._id?.slice(-4)}`;
            ctx.font = `${fontSize}px Arial`;
            const textWidth = ctx.measureText(text).width;
            const textHeight = fontSize;
            const boxWidth = textWidth + padding * 2;
            const boxHeight = textHeight + padding * 2;
            const boxX = labelX - padding;
            const boxY = labelY - textHeight - padding;

            // Draw label box background
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.moveTo(boxX + 4, boxY);
            ctx.arcTo(boxX + boxWidth, boxY, boxX + boxWidth, boxY + boxHeight, 4);
            ctx.arcTo(boxX + boxWidth, boxY + boxHeight, boxX, boxY + boxHeight, 4);
            ctx.arcTo(boxX, boxY + boxHeight, boxX, boxY, 4);
            ctx.arcTo(boxX, boxY, boxX + boxWidth, boxY, 4);
            ctx.closePath();
            ctx.fill();

            // Draw the polygon ID inside the label box
            ctx.fillStyle = '#000000';
            ctx.fillText(text, boxX + padding, boxY + padding + textHeight - 4);
          }
        });
      }
    };
    img.src = image;

    return () => {
      canvas.removeEventListener('click', handlePolygonClick);
    };
  }, [image, polygons, heatmap, canvasSize]);

  // Close modal function
  const closeModal = () => {
    setSelectedPolygon(null);
  };

  return (
    <div ref={containerRef} className="w-full px-4 md:px-6 lg:px-8">
      <div style={{ position: 'relative', width: '100%' }}>
        <canvas
          width={canvasSize.width}
          height={canvasSize.height}
          ref={canvasRef}
          className="border border-primary-lightBlue border-dashed bg-[#03a5e010] rounded-lg w-full h-auto cursor-pointer"
          style={{ maxWidth: '100%', height: 'auto' }}
        />

        {/* Modal for all screens */}
        {selectedPolygon && (
          <Modal
            title={view === 'building-view' ? 'Floor Details' : 'Parking Details'}
            onClose={closeModal}
            width="w-[320px] md:w-[450px] lg:w-[500px]"
          >
            {view === 'building-view' ? (
              <div>
                <div className="my-4 space-y-3">
                  <h6 className="text-base md:text-lg font-bold">Parking List:</h6>
                  <ul className="text-sm space-y-2">
                    <li className="list-disc ml-4">
                      <span className="font-bold text-sm md:text-base">Booked Parking:</span> 0
                    </li>
                    <li className="list-disc ml-4">
                      <span className="font-bold text-sm md:text-base">Parking Free:</span> 12
                    </li>
                  </ul>
                  <p className="text-base md:text-lg mt-3 font-bold">Total Parking: 2</p>
                </div>
                <div className="flex justify-center gap-3 mt-6">
                  <Link
                    className="bg-primary py-2 px-4 md:px-5 rounded-md text-white font-semibold text-sm md:text-base hover:bg-primary-dark transition-colors text-center"
                    to={`/user/booking/${selectedPolygon?.id}`}
                    onClick={closeModal}
                  >
                    Book Slot
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <div className="my-3 space-y-3">
                  <h6 className="text-sm md:text-base break-all">
                    <span className="font-bold">Name:</span>{' '}
                    {selectedPolygon?.id || `Slot ${selectedPolygon?._id?.slice(-4)}`}
                  </h6>

                  <div className="mt-4 p-3 md:p-4 bg-gray-50 rounded-lg max-h-[250px] md:max-h-[400px] overflow-y-auto">
                    <p className="text-xs md:text-sm text-gray-700">
                      <span className="font-semibold text-gray-900">Already Booked Times:</span>
                    </p>
                    {selectedPolygon?.bookedTimes && selectedPolygon.bookedTimes.length > 0 ? (
                      <ul className="mt-2 space-y-2">
                        {selectedPolygon.bookedTimes.map((time) => (
                          <li
                            key={time._id}
                            className="text-xs md:text-sm text-gray-600 bg-white p-2 rounded border border-gray-200"
                          >
                            <span>
                              🕒{' '}
                              {new Date(time.startTime).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true,
                              })}{' '}
                              →{' '}
                              {new Date(time.endTime).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true,
                              })}
                            </span>
                            <br />
                            <span
                              className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${
                                time.status === 'confirmed'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}
                            >
                              Status: {time.status}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-2 text-xs md:text-sm text-gray-400 italic">No bookings</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <Link
                    to={`/user/booking/${selectedPolygon?._id}`}
                    className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md font-semibold text-center transition-colors text-sm md:text-base"
                    onClick={closeModal}
                  >
                    Book a Slot
                  </Link>
                  <button
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md font-semibold transition-colors text-sm md:text-base"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </Modal>
        )}
      </div>
    </div>
  );
};

export default ShowSingleFloor;
