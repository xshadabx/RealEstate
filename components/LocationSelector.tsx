"use client";

import { useLocation } from "@/lib/location-context";
import { useMemo } from "react";
import { Input } from "@/components/ui/input";

// Minimal cascading selector using free-text for prototype; replace with real datasets
export default function LocationSelector() {
  const { parts, setParts, requestPermission, permission } = useLocation();

  const subtitle = useMemo(() => {
    if (permission === "granted") return "Using your location for nearby properties";
    if (permission === "denied") return "Permission denied. Use the fields below to set location.";
    if (permission === "prompt") return "Allow location or set manually";
    return "Set location manually or allow access";
  }, [permission]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">{subtitle}</div>
        <button onClick={requestPermission} className="text-primary text-sm">Use my location</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
        <Input placeholder="Country" value={parts.country || ""} onChange={(e) => setParts({ ...parts, country: e.target.value })} />
        <Input placeholder="State" value={parts.state || ""} onChange={(e) => setParts({ ...parts, state: e.target.value })} />
        <Input placeholder="City" value={parts.city || ""} onChange={(e) => setParts({ ...parts, city: e.target.value })} />
        <Input placeholder="Area" value={parts.area || ""} onChange={(e) => setParts({ ...parts, area: e.target.value })} />
      </div>
    </div>
  );
}


