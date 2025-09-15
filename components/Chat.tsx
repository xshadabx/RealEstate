"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

type Message = { id: number; from: "Buyer" | "Seller"; text: string };

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, from: "Buyer", text: "Can we schedule a visit?" },
    { id: 2, from: "Seller", text: "Yes, available this weekend." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { id: Date.now(), from: "Buyer", text: input.trim() }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { id: Date.now() + 1, from: "Seller", text: "Noted!" }]);
      setTyping(false);
    }, 900);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4">
      <div className="rounded-lg border p-3">
        <div className="font-semibold mb-2">Chats</div>
        <div className="space-y-2 text-sm">
          <div className="rounded-md bg-muted p-2">Buyer A • 10:45 AM</div>
          <div className="rounded-md p-2 hover:bg-muted cursor-pointer">Buyer B • 9:15 AM</div>
          <div className="rounded-md p-2 hover:bg-muted cursor-pointer">Buyer C • Yesterday</div>
        </div>
      </div>
      <div className="rounded-lg border flex flex-col">
        <div className="border-b p-3 font-semibold">Chat with Buyer A</div>
        <ScrollArea className="flex-1 p-3 h-[60vh]">
          <div className="space-y-2">
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={
                  m.from === "Buyer"
                    ? "ml-auto max-w-[70%] rounded-lg bg-primary text-primary-foreground px-3 py-2"
                    : "mr-auto max-w-[70%] rounded-lg bg-muted px-3 py-2"
                }
              >
                {m.text}
              </motion.div>
            ))}
            {typing && (
              <div className="mr-auto max-w-[70%] rounded-lg bg-muted px-3 py-2 flex gap-1">
                <span className="w-2 h-2 rounded-full bg-foreground/60 animate-bounce [animation-delay:-0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-foreground/60 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-foreground/60 animate-bounce [animation-delay:0.2s]"></span>
              </div>
            )}
            <div ref={endRef} />
          </div>
        </ScrollArea>
        <div className="p-3 border-t flex gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
          />
          <Button onClick={send}>Send</Button>
        </div>
      </div>
    </div>
  );
}


