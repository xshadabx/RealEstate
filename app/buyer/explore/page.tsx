"use client";

import VideoReel from "@/components/VideoReel";
import { motion } from "framer-motion";
import LocationSelector from "@/components/LocationSelector";
import { useLocation } from "@/lib/location-context";

export default function BuyerExplorePage() {
  const { parts, coords } = useLocation();
  const reels = Array.from({ length: 5 }).map((_, i) => ({
    id: i + 1,
    price: "₹60,00,000",
    location: parts.city || (coords ? "Near you" : "Set location"),
    badge: "Verified",
  }));

  return (
    <main className="mx-auto max-w-3xl h-[calc(100vh-4rem)] p-0">
      <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="sr-only">
        Buyer Explore
      </motion.h1>
      <div className="p-4">
        <LocationSelector />
      </div>
      <div className="h-[calc(100%-120px)] overflow-y-auto snap-y snap-mandatory space-y-0">
        {reels.map((r) => (
          <div key={r.id} className="snap-start p-4">
            <VideoReel {...r} />
          </div>
        ))}
      </div>
    </main>
  );
}


