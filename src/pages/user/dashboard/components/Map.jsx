import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import GreenMarker from "../../../../assets/images/dashboard/locator-green.png"; // If used
import Button from "../../../../components/shared/small/Button";
import popupImage from "../../../../assets/images/dashboard/popup1.png";
import ParkingLotCard from "./ParkingLotCard";

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
              <div className="w-fit xl:w-[500px]">
                <ParkingLotCard inMap={true} name="Station" level="high" />
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
