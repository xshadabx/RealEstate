"use client";

import { Card as UICard, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Calendar, Shield, Bot, CheckCircle, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { TrustBadge, TrustTier } from "./TrustTierSystem";

type Props = {
  title: string;
  price: string;
  location: string;
  badges?: string[];
  trustTier?: TrustTier;
  isAIEnhanced?: boolean;
  hasDuplicateCheck?: boolean;
  views?: number;
  likes?: number;
  rating?: number;
  onTrustBadgeClick?: () => void;
};

export default function Card({ 
  title, 
  price, 
  location, 
  badges = [], 
  trustTier = 'UNVERIFIED',
  isAIEnhanced = false,
  hasDuplicateCheck = false,
  views = 0,
  likes = 0,
  rating = 0,
  onTrustBadgeClick
}: Props) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      <UICard className="overflow-hidden relative h-full flex flex-col property-card-hover">
        <div className="h-48 w-full bg-gradient-to-br from-muted to-muted/50 relative">
          {/* Trust Badge Overlay */}
          <div className="absolute top-3 left-3">
            <TrustBadge tier={trustTier} size="sm" onClick={onTrustBadgeClick} />
          </div>
          
          {/* AI Enhancement Badge */}
          {isAIEnhanced && (
            <div className="absolute top-3 right-3">
              <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                <Bot className="h-3 w-3" />
                AI
              </Badge>
            </div>
          )}
          
          {/* Duplicate Check Badge */}
          {hasDuplicateCheck && (
            <div className="absolute bottom-3 left-3">
              <Badge variant="outline" className="flex items-center gap-1 text-xs bg-white/90">
                <CheckCircle className="h-3 w-3 text-green-600" />
                Verified
              </Badge>
            </div>
          )}
        </div>
        
        <CardContent className="p-4 space-y-3 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-2">
            <div className="font-semibold text-sm leading-tight flex-1">{title}</div>
            <div className="text-primary font-bold text-lg whitespace-nowrap">{price}</div>
          </div>
          
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {location}
          </div>
          
          {/* Stats Row */}
          {(views > 0 || likes > 0 || rating > 0) && (
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              {views > 0 && <span>{views} views</span>}
              {likes > 0 && <span>{likes} likes</span>}
              {rating > 0 && <span>★ {rating}</span>}
            </div>
          )}
          
          <div className="flex gap-2 flex-wrap">
            {badges.map((b) => (
              <Badge key={b} variant="secondary" className="text-xs">
                {b}
              </Badge>
            ))}
          </div>
          
          <div className="flex gap-2 mt-auto">
            <Button variant="outline" size="sm" className="gap-1 flex-1 text-xs">
              <Heart className="h-3 w-3" /> Save
            </Button>
            <Button variant="outline" size="sm" className="gap-1 flex-1 text-xs">
              <MessageSquare className="h-3 w-3" /> Message
            </Button>
            <Button size="sm" className="gap-1 flex-1 text-xs">
              <Calendar className="h-3 w-3" /> Visit
            </Button>
          </div>
        </CardContent>
      </UICard>
    </motion.div>
  );
}


