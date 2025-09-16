"use client";

import dynamic from "next/dynamic";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type MarkerItem = { id: number; pos: [number, number]; title: string };

// Fix for default markers
import L from "leaflet";
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function LeafletMap({ center, markers }: { center: [number, number]; markers: MarkerItem[] }) {
  return (
    <MapContainer 
      center={center} 
      zoom={13} 
      style={{ height: "100%", width: "100%" }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((n) => (
        <Marker key={n.id} position={n.pos}>
          <Popup>{n.title}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default dynamic(() => Promise.resolve(LeafletMap), {
  ssr: false,
});


