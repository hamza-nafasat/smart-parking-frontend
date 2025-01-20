import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import GreenMarker from "../../../../assets/images/dashboard/greenMarker.png"; // If used
import Button from "../../../../components/shared/small/Button";
import popupImage from "../../../../assets/images/dashboard/popup1.png";

// Custom icon for the marker
const myIcon = L.icon({
  iconUrl: GreenMarker, // Use your custom green marker
  iconSize: [38, null], // Set the appropriate size for your icon
  iconAnchor: [19, 95], // Anchor point of the icon
  popupAnchor: [0, -76], // Popup positioning
  shadowSize: [68, 95], // Shadow size
  shadowAnchor: [22, 94], // Shadow anchor point
});

const Map = () => {
  const position = [51.505, -0.09];

  const markers = [
    { id: 1, position: [51.505, -0.09], popup: "Marker 1: London" },
  ];

  return (
    <div className="rounded-xl">
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
        attributionControl={false}
      >
        {/* Using CartoDB Positron for Grayscale Map */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a> contributors'
        />

        {markers.map((marker) => (
          <Marker key={marker.id} position={marker.position} icon={myIcon}>
            <Popup>
              {/* Custom Popup Content */}
              <div style={{ width: "200px", fontSize: "12px" }}>
                {/* Image Section */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <img src={popupImage} alt="location" />
                </div>

                {/* Location and Information */}
                <div style={{ textAlign: "left", color: "#333" }}>
                  <p className="text-xs text-[#00000050]">Oslo</p>
                  <p style={{ margin: 0 }}>
                    <strong>Torshov 0476</strong>
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong>Address:</strong> Al Duwayh
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong>Area (sq ft/m):</strong> 1500sqm
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong>Building type:</strong> Commercial
                  </p>
                </div>

                {/* Button Section */}
                <div className="flex justify-center mt-3">
                  <Button
                    text="View All"
                    bg="bg-primary text-white hover:text-primary hover:bg-white"
                    width="w-[80px]"
                  />
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
