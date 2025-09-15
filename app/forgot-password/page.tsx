"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);

  const sendLink = () => {
    if (!/.+@.+\..+/.test(email)) return setError("Enter a valid email");
    setError(null);
    setSent(true);
  };

  const reset = () => {
    if (password.length < 6 || password !== confirm) return setError("Passwords must match and be 6+ chars");
    setError(null);
    window.location.href = "/login";
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] grid place-items-center">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md border rounded-md p-6 bg-card/80 space-y-3">
        <h1 className="text-xl font-semibold">Forgot Password</h1>
        {!sent ? (
          <div className="space-y-3">
            <Input placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button className="w-full" onClick={sendLink}>Send reset link</Button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">We emailed a reset link to {email}. For demo, reset here:</p>
            <Input type="password" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Input type="password" placeholder="Confirm password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button className="w-full" onClick={reset}>Reset password</Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}


