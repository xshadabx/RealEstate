"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card as UICard, CardContent } from "@/components/ui/card";

export default function SellerProfile() {
  const stats = [
    { title: "Active Listings", value: "12" },
    { title: "Views", value: "3,240" },
    { title: "Messages", value: "45" },
  ];

  const posts = Array.from({ length: 9 }).map((_, i) => i + 1);

  return (
    <main className="mx-auto max-w-5xl p-4 space-y-6">
      <div className="flex items-center gap-6">
        <Avatar className="h-20 w-20">
          <AvatarFallback>SL</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <div className="text-2xl font-semibold">seller.pro</div>
          <div className="text-sm text-muted-foreground">Indore, MP</div>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary">Edit profile</Button>
            <Button size="sm" variant="outline">Settings</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <UICard key={s.title}>
            <CardContent className="p-4">
              <div className="text-muted-foreground text-sm">{s.title}</div>
              <div className="text-2xl font-semibold">{s.value}</div>
            </CardContent>
          </UICard>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {posts.map((p) => (
          <div key={p} className="aspect-square w-full bg-muted" />
        ))}
      </div>
    </main>
  );
}


