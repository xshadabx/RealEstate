"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dropzone from "@/components/Dropzone";

export default function CreateListingPage() {
  return (
    <main className="mx-auto max-w-3xl p-4">
      <h1 className="text-2xl font-semibold mb-4">Create Listing</h1>
      <Tabs defaultValue="photos">
        <TabsList>
          <TabsTrigger value="photos">Upload Photos</TabsTrigger>
          <TabsTrigger value="reel">Add Reel (Optional)</TabsTrigger>
          <TabsTrigger value="details">Fill Details</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="photos" className="space-y-3 pt-3">
          <Label>Upload Property Photos</Label>
          <Dropzone multiple />
        </TabsContent>
        <TabsContent value="reel" className="space-y-3 pt-3">
          <Label>Upload Optional Reel</Label>
          <Dropzone multiple={false} />
        </TabsContent>
        <TabsContent value="details" className="space-y-3 pt-3">
          <Label>Price</Label>
          <Input type="number" placeholder="3500000" />
          <Label>Property Type</Label>
          <Input placeholder="Flat / Plot / Commercial" />
          <Label>City</Label>
          <Input placeholder="Indore" />
        </TabsContent>
        <TabsContent value="preview" className="pt-3">
          <div className="rounded-md border p-4">Preview your listing here…</div>
        </TabsContent>
      </Tabs>
      <div className="mt-4">
        <Button>Publish Listing</Button>
      </div>
    </main>
  );
}


