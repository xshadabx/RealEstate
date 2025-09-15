"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo } from "react";
import { useLocation } from "@/lib/location-context";
const ClientLeafletMap = dynamic(() => import("@/components/ClientLeafletMap"), { ssr: false });

export default function MapView() {
  const { coords, requestPermission } = useLocation();
  const center = useMemo(() => {
    return coords ? [coords.lat, coords.lng] as [number, number] : [20.5937, 78.9629]; // India center
  }, [coords]);

  useEffect(() => {
    if (!coords) requestPermission();
  }, [coords, requestPermission]);

  const nearby = useMemo(() => {
    // Fake nearby points around center for prototype
    const [lat, lng] = center;
    return [
      { id: 1, pos: [lat + 0.01, lng + 0.01], title: "3BHK • ₹45L" },
      { id: 2, pos: [lat - 0.008, lng + 0.012], title: "2BHK • ₹35L" },
      { id: 3, pos: [lat + 0.006, lng - 0.015], title: "Plot • ₹25L" },
    ];
  }, [center]);

  return (
    <div className="w-full h-80 rounded-md overflow-hidden border">
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />
      <ClientLeafletMap
        center={center as [number, number]}
        markers={[
          ...(coords ? [{ id: 0, pos: center as [number, number], title: "Your location" }] : []),
          ...nearby.map((n) => ({ id: n.id, pos: n.pos as [number, number], title: n.title })),
        ]}
      />
    </div>
  );
}


