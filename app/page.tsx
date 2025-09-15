"use client";

import Card from "@/components/Card";
import { motion } from "framer-motion";

export default function Home() {
  const listings = Array.from({ length: 6 }).map((_, i) => ({
    id: i + 1,
    title: "3BHK Apartment in Indore",
    price: "₹45,00,000",
    location: "Indore, MP",
    badges: ["Verified", i % 2 === 0 ? "New" : ""].filter(Boolean) as string[],
  }));

  return (
    <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold mb-6"
      >
        Home
      </motion.h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((l) => (
          <Card key={l.id} title={l.title} price={l.price} location={l.location} badges={l.badges} />
        ))}
      </div>
    </main>
  );
}
