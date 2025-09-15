"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

type MarkerItem = { id: number; pos: [number, number]; title: string };

export default function ClientLeafletMap({ center, markers }: { center: [number, number]; markers: MarkerItem[] }) {
  return (
    <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
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


