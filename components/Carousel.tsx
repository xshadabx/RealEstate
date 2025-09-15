"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Item = { id: number; label: string };

export default function Carousel({ items }: { items: Item[] }) {
  const [index, setIndex] = useState(0);

  return (
    <div className="w-full">
      <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="grid place-items-center absolute inset-0"
          >
            <span className="text-sm text-muted-foreground">{items[index]?.label}</span>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-3 flex gap-2">
        {items.map((it, i) => (
          <button
            key={it.id}
            onClick={() => setIndex(i)}
            className={cn(
              "h-16 w-24 rounded-md bg-muted transition-opacity",
              i === index ? "opacity-100 ring-2 ring-primary" : "opacity-60 hover:opacity-80"
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}


