"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { Globe, Bot, Sparkles, MessageSquare, Clock, CheckCircle } from "lucide-react";

type Message = { 
  id: number; 
  from: "Buyer" | "Seller"; 
  text: string; 
  originalText?: string;
  isTranslated?: boolean;
  timestamp: Date;
  isAI?: boolean;
};

type ChatThread = {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: Date;
  unread: number;
  isActive: boolean;
};

export default function Chat() {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, from: "Buyer", text: "Can we schedule a visit?", timestamp: new Date(Date.now() - 1000 * 60 * 30) },
    { id: 2, from: "Seller", text: "Yes, available this weekend.", timestamp: new Date(Date.now() - 1000 * 60 * 25) },
    { id: 3, from: "Buyer", text: "Great! What time works for you?", timestamp: new Date(Date.now() - 1000 * 60 * 20) },
    { id: 4, from: "Seller", text: "Saturday 2 PM would be perfect.", timestamp: new Date(Date.now() - 1000 * 60 * 15) },
  ]);
  
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showTranslation, setShowTranslation] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const endRef = useRef<HTMLDivElement | null>(null);

  const [threads] = useState<ChatThread[]>([
    { id: "1", name: "Rajesh Kumar", lastMessage: "Saturday 2 PM would be perfect.", timestamp: new Date(Date.now() - 1000 * 60 * 15), unread: 0, isActive: true },
    { id: "2", name: "Priya Sharma", lastMessage: "What's the carpet area?", timestamp: new Date(Date.now() - 1000 * 60 * 60), unread: 2, isActive: false },
    { id: "3", name: "Amit Patel", lastMessage: "Is parking available?", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), unread: 1, isActive: false },
  ]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // AI Translation function
  const translateMessage = (text: string, targetLang: string): string => {
    // Mock translation - in real app, this would call an AI translation service
    const translations: Record<string, Record<string, string>> = {
      "Can we schedule a visit?": {
        hindi: "क्या हम एक दौरे की योजना बना सकते हैं?",
        kannada: "ನಾವು ಭೇಟಿಯನ್ನು ನಿಗದಿಪಡಿಸಬಹುದೇ?"
      },
      "Yes, available this weekend.": {
        hindi: "हाँ, इस सप्ताहांत उपलब्ध।",
        kannada: "ಹೌದು, ಈ ವಾರಾಂತ್ಯದಲ್ಲಿ ಲಭ್ಯವಿದೆ."
      },
      "Great! What time works for you?": {
        hindi: "बहुत बढ़िया! आपके लिए कौन सा समय ठीक है?",
        kannada: "ಅದ್ಭುತ! ನಿಮಗೆ ಯಾವ ಸಮಯ ಸೂಕ್ತವಾಗುತ್ತದೆ?"
      },
      "Saturday 2 PM would be perfect.": {
        hindi: "शनिवार दोपहर 2 बजे एकदम सही होगा।",
        kannada: "ಶನಿವಾರ ಮಧ್ಯಾಹ್ನ 2 ಗಂಟೆ ಪರಿಪೂರ್ಣವಾಗಿರುತ್ತದೆ."
      }
    };
    
    return translations[text]?.[targetLang] || text;
  };

  // AI Smart Reply suggestions
  const generateSmartReplies = (lastMessage: string): string[] => {
    const smartReplies: Record<string, string[]> = {
      "Yes, available this weekend.": [
        "Perfect! I'll be there.",
        "What time works best?",
        "Can we make it Sunday instead?"
      ],
      "Saturday 2 PM would be perfect.": [
        "See you then!",
        "I'll bring my family.",
        "What's the exact address?"
      ],
      "What's the carpet area?": [
        "It's 1200 sq ft",
        "Let me check the documents",
        "I'll send you the floor plan"
      ]
    };
    
    return smartReplies[lastMessage] || [
      "Thanks for the info",
      "I'll get back to you",
      "Sounds good!"
    ];
  };

  const send = () => {
    if (!input.trim()) return;
    const newMessage: Message = {
      id: Date.now(),
      from: "Buyer",
      text: input.trim(),
      timestamp: new Date()
    };
    setMessages((m) => [...m, newMessage]);
    setInput("");
    setTyping(true);
    
    // Generate AI smart replies
    const suggestions = generateSmartReplies(input.trim());
    setAiSuggestions(suggestions);
    
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        from: "Seller",
        text: "I understand. Let me check my schedule and get back to you.",
        timestamp: new Date(),
        isAI: true
      };
      setMessages((m) => [...m, aiResponse]);
      setTyping(false);
    }, 1500);
  };

  const sendSmartReply = (reply: string) => {
    setInput(reply);
    setAiSuggestions([]);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-4 h-[calc(100vh-8rem)]">
      {/* Chat Threads Sidebar */}
      <div className="rounded-lg border p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">{t('messages')}</h2>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Bot className="h-3 w-3" />
            AI
          </Badge>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="space-y-2">
            {threads.map((thread) => (
              <motion.div
                key={thread.id}
                whileHover={{ scale: 1.02 }}
                className={`rounded-lg p-3 cursor-pointer transition-all ${
                  thread.isActive 
                    ? "bg-primary/10 border border-primary/20" 
                    : "hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{thread.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {thread.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{thread.lastMessage}</p>
                {thread.unread > 0 && (
                  <Badge variant="destructive" className="mt-2 text-xs">
                    {thread.unread} new
                  </Badge>
                )}
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="rounded-lg border flex flex-col">
        {/* Chat Header */}
        <div className="border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Rajesh Kumar</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-green-500" />
                Online
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTranslation(!showTranslation)}
              className="flex items-center gap-1"
            >
              <Globe className="h-4 w-4" />
              {showTranslation ? "Hide Translation" : "Show Translation"}
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((m) => {
              const translatedText = showTranslation && language !== 'english' 
                ? translateMessage(m.text, language) 
                : m.text;
              const isTranslated = showTranslation && language !== 'english' && translatedText !== m.text;
              
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.from === "Buyer" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[70%] ${m.from === "Buyer" ? "order-2" : "order-1"}`}>
                    <div className={`rounded-2xl px-4 py-2 ${
                      m.from === "Buyer"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        {m.isAI && (
                          <Badge variant="secondary" className="text-xs flex items-center gap-1">
                            <Sparkles className="h-3 w-3" />
                            AI
                          </Badge>
                        )}
                        <span className="text-xs opacity-70">
                          {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p>{translatedText}</p>
                      {isTranslated && (
                        <div className="mt-2 pt-2 border-t border-white/20">
                          <p className="text-xs opacity-70 italic">
                            ⚠️ This text was translated with AI, original available.
                          </p>
                          <details className="mt-1">
                            <summary className="text-xs cursor-pointer opacity-70">Show original</summary>
                            <p className="text-xs mt-1 opacity-70">{m.text}</p>
                          </details>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
            
            {typing && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="max-w-[70%] rounded-2xl bg-muted px-4 py-2 flex items-center gap-2">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">Typing...</span>
                </div>
              </motion.div>
            )}
            <div ref={endRef} />
          </div>
        </ScrollArea>

        {/* AI Smart Replies */}
        {aiSuggestions.length > 0 && (
          <div className="border-t p-3">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">AI Suggested Replies</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {aiSuggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => sendSmartReply(suggestion)}
                  className="text-xs"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              className="flex-1"
            />
            <Button onClick={send} className="px-6">
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


