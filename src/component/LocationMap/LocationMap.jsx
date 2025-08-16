// 📁 src/components/LocationMap.jsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Default marker fix for React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const locations = [
  {
    id: 1,
    title: "Downtown Community Center",
    position: [23.8103, 90.4125], // Example coordinates (Dhaka)
    description: "Food Donation Drive – Downtown",
  },
  {
    id: 2,
    title: "Green Park Hotel",
    position: [23.8150, 90.4250],
    description: "Restaurant Partner Meetup",
  },
];

const LocationMap = () => {
  return (
    <section className="my-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            📍 Our Locations
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Find where our food donation drives and events happen.
          </p>
        </div>

        <div className="w-full h-96 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
          <MapContainer
            center={[23.8103, 90.4125]}
            zoom={13}
            scrollWheelZoom={false}
            className="w-full h-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {locations.map((loc) => (
              <Marker key={loc.id} position={loc.position}>
                <Popup>
                  <strong>{loc.title}</strong>
                  <br />
                  {loc.description}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
