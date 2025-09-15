"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Props = {
  price: string;
  location: string;
  badge?: string;
};

export default function VideoReel({ price, location, badge }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-xl border bg-card"
    >
      <div className="aspect-[9/16] w-full bg-muted grid place-items-center">
        <div className="text-sm text-muted-foreground">Reel placeholder</div>
      </div>
      <div className="absolute top-3 left-3 flex items-center gap-2">
        {badge ? <Badge variant="secondary">{badge}</Badge> : null}
        <Badge>{price}</Badge>
      </div>
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
        <div className="rounded-md bg-background/80 px-2 py-1 text-sm backdrop-blur">
          {location}
        </div>
        <Button size="sm">View Listing</Button>
      </div>
    </motion.div>
  );
}


