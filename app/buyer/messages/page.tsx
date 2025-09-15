"use client";

import dynamic from "next/dynamic";
const Chat = dynamic(() => import("@/components/Chat"), { ssr: false });

export default function BuyerMessagesPage() {
  return (
    <main className="mx-auto max-w-5xl p-4">
      <Chat />
    </main>
  );
}


