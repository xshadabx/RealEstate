"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ProfilePage() {
  const [bio] = useState("Explorer of beautiful homes. Photographer.");
  const posts = Array.from({ length: 9 }).map((_, i) => i + 1);
  return (
    <main className="mx-auto max-w-4xl p-4">
      <div className="flex items-center gap-6">
        <Avatar className="h-20 w-20">
          <AvatarFallback>AN</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <div className="text-2xl font-semibold">aditya.n</div>
          <div className="text-sm text-muted-foreground">Indore, MP</div>
          <p className="text-sm max-w-xl">{bio}</p>
          <div className="flex gap-3 text-sm">
            <span><strong>12</strong> posts</span>
            <span><strong>340</strong> followers</span>
            <span><strong>180</strong> following</span>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary">Edit profile</Button>
            <Button size="sm" variant="outline">Settings</Button>
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-2">
        {posts.map((p) => (
          <div key={p} className="aspect-square w-full bg-muted" />
        ))}
      </div>
    </main>
  );
}


