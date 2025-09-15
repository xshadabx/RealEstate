"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Coordinates = { lat: number; lng: number } | null;
type LocationParts = { country?: string; state?: string; city?: string; area?: string };

type LocationState = {
  coords: Coordinates;
  parts: LocationParts;
  setParts: (p: LocationParts) => void;
  requestPermission: () => void;
  permission: PermissionState | "unsupported" | "unknown";
};

const LocationCtx = createContext<LocationState | undefined>(undefined);

export function useLocation() {
  const ctx = useContext(LocationCtx);
  if (!ctx) throw new Error("useLocation must be used within LocationProvider");
  return ctx;
}

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [coords, setCoords] = useState<Coordinates>(null);
  const [parts, setParts] = useState<LocationParts>({});
  const [permission, setPermission] = useState<PermissionState | "unsupported" | "unknown">("unknown");

  useEffect(() => {
    if (typeof navigator === "undefined" || !(navigator as any).permissions) {
      setPermission("unsupported");
      return;
    }
    (navigator as any).permissions
      .query({ name: "geolocation" as PermissionName })
      .then((status: any) => {
        setPermission(status.state);
        status.onchange = () => setPermission(status.state);
      })
      .catch(() => setPermission("unknown"));
  }, []);

  const requestPermission = () => {
    if (!navigator?.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      () => {
        // ignore errors in prototype
      }
    );
  };

  const value = useMemo(
    () => ({ coords, parts, setParts, requestPermission, permission }),
    [coords, parts, permission]
  );

  return <LocationCtx.Provider value={value}>{children}</LocationCtx.Provider>;
}


