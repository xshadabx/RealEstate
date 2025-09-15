"use client";

import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import Carousel from "@/components/Carousel";

export default function ListingDetailPage() {
  const params = useParams();
  const { id } = params as { id: string };

  return (
    <main className="mx-auto max-w-6xl p-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <Carousel
          items={[
            { id: 1, label: "Photo 1" },
            { id: 2, label: "Photo 2" },
            { id: 3, label: "Optional Reel" },
          ]}
        />
      </div>
      <div className="space-y-4">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-semibold">
          2BHK Flat in Vijay Nagar
        </motion.h1>
        <div className="text-primary text-xl font-bold">₹35,00,000</div>
        <div className="text-muted-foreground">Vijay Nagar, Indore • ID #{id}</div>
        <div className="flex gap-2">
          <Badge>Verified</Badge>
          <Badge variant="secondary">Hot Listing</Badge>
        </div>
        <Tabs defaultValue="details" className="w-full">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="seller">Seller Info</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="pt-2 text-sm text-muted-foreground">
            Spacious 2BHK with balcony, near schools and markets.
          </TabsContent>
          <TabsContent value="seller" className="pt-2 text-sm text-muted-foreground">
            Seller: Rohan Realty • Verified Partner
          </TabsContent>
          <TabsContent value="contact" className="pt-2 text-sm text-muted-foreground">
            Call: +91-90000 00000 • Email: contact@example.com
          </TabsContent>
        </Tabs>
        <div className="sticky bottom-4 flex gap-2">
          <Button variant="outline">Message Seller</Button>
          <Button variant="outline">Schedule Visit</Button>
          <Button>Make Offer</Button>
        </div>
      </div>
    </main>
  );
}


