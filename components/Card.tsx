"use client";

import { Card as UICard, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Calendar } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  title: string;
  price: string;
  location: string;
  badges?: string[];
};

export default function Card({ title, price, location, badges = [] }: Props) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      <UICard className="overflow-hidden">
        <div className="h-40 w-full bg-muted" />
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="font-semibold">{title}</div>
            <div className="text-primary font-bold">{price}</div>
          </div>
          <div className="text-sm text-muted-foreground">{location}</div>
          <div className="flex gap-2">
            {badges.map((b) => (
              <Badge key={b} variant="secondary">
                {b}
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Heart className="h-4 w-4" /> Save
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <MessageSquare className="h-4 w-4" /> Message
            </Button>
            <Button size="sm" className="gap-1">
              <Calendar className="h-4 w-4" /> Schedule Visit
            </Button>
          </div>
        </CardContent>
      </UICard>
    </motion.div>
  );
}


