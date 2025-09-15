"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

export default function CreateAccountPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const next = () => {
    if (step === 1 && !/.+@.+\..+/.test(email)) return setError("Enter a valid email");
    if (step === 2 && !userId.trim()) return setError("User ID is required");
    if (step === 3 && (password.length < 6 || password !== confirm)) return setError("Passwords must match and be 6+ chars");
    setError(null);
    setStep((s) => s + 1);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] grid place-items-center">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md border rounded-md p-6 bg-card/80">
        <h1 className="text-xl font-semibold mb-4">Create your account</h1>
        {step === 1 && (
          <div className="space-y-3">
            <Label>Email</Label>
            <Input placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button onClick={next} className="w-full">Continue</Button>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-3">
            <Label>User ID</Label>
            <Input placeholder="yourname" value={userId} onChange={(e) => setUserId(e.target.value)} />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button onClick={next} className="w-full">Continue</Button>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-3">
            <Label>Password</Label>
            <div className="flex gap-2">
              <Input type={show ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
              <Button type="button" variant="outline" onClick={() => setShow((s) => !s)}>{show ? "Hide" : "Show"}</Button>
            </div>
            <Label>Confirm Password</Label>
            <Input type={show ? "text" : "password"} placeholder="••••••••" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button onClick={next} className="w-full">Create Account</Button>
          </div>
        )}
        {step === 4 && (
          <div className="space-y-3 text-center">
            <p>Verification email sent to {email}. Please verify to continue.</p>
            <Button className="w-full" onClick={() => (window.location.href = "/login")}>Go to Login</Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}


