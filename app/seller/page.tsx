"use client";

import Card from "@/components/Card";
import { motion } from "framer-motion";
import LottiePlayer from "@/components/LottiePlayer";

export default function SellerHome() {
  const listings = Array.from({ length: 6 }).map((_, i) => ({
    id: i + 1,
    title: "2BHK Flat in Vijay Nagar",
    price: "₹35,00,000",
    location: "Indore",
    badges: ["Verified", i % 2 === 0 ? "New" : ""].filter(Boolean) as string[],
  }));

  return (
    <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-4">
        <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-semibold">Seller Home</motion.h1>
        <LottiePlayer src={{ v: "5.7.6", fr: 30, ip: 0, op: 30, w: 50, h: 50, nm: "dot", ddd: 0, assets: [], layers: [{ ddd: 0, ind: 1, ty: 4, nm: "c", sr: 1, ks: { o: { a: 0, k: 100 }, r: { a: 0, k: 0 }, p: { a: 0, k: [25, 25, 0] }, a: { a: 0, k: [0, 0, 0] }, s: { a: 0, k: [100, 100, 100] } }, shapes: [{ ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [20, 20] }, nm: "el" }, { ty: "fl", c: { a: 0, k: [0.149, 0.388, 0.922, 1] }, o: { a: 0, k: 100 }, r: 1, bm: 0, nm: "fill" }], ip: 0, op: 30, st: 0, bm: 0 }] }} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((l) => (
          <Card key={l.id} title={l.title} price={l.price} location={l.location} badges={l.badges} />
        ))}
      </div>
    </main>
  );
}


