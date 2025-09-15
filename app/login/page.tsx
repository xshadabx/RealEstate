"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LoginPage() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [secret, setSecret] = useState("");
  const [errors, setErrors] = useState<{ email?: string; secret?: string; form?: string }>({});
  const [loading, setLoading] = useState(false);
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [role, setRole] = useState<"buyer" | "seller">("buyer");

  const validate = () => {
    const next: typeof errors = {};
    if (!userId.trim()) next.email = "Required";
    if (!secret.trim()) next.secret = "Required";
    else if (secret.length < 4) next.secret = "Min 4 characters";
    if (!captchaChecked) next.form = "Please verify you're human";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    if (userId && secret && captchaChecked) {
      router.push(role === "buyer" ? "/buyer" : "/seller");
    } else {
      setErrors({ form: "Invalid credentials" });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] grid place-items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background to-muted/30">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md backdrop-blur bg-card/80 border rounded-md p-6 shadow-lg"
      >
        <div className="text-center mb-4">
          <div className="text-xl font-semibold">YourBrand</div>
          <h1 className="mt-1 text-xl font-bold tracking-tight">Welcome Back</h1>
        </div>
        <Tabs defaultValue="buyer" onValueChange={(v) => setRole(v as any)}>
          <TabsList className="grid grid-cols-2 w-full mb-4">
            <TabsTrigger value="buyer">Buyer</TabsTrigger>
            <TabsTrigger value="seller">Seller</TabsTrigger>
          </TabsList>
          <TabsContent value="buyer" className="space-y-4">
            <div>
              <label className="text-sm">User ID</label>
              <Input
                placeholder="email or phone"
                className="mt-1"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
              {errors.email ? <p className="text-xs text-red-500 mt-1">{errors.email}</p> : null}
            </div>
            <div>
              <label className="text-sm">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                className="mt-1"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
              />
              {errors.secret ? <p className="text-xs text-red-500 mt-1">{errors.secret}</p> : null}
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={captchaChecked} onChange={(e) => setCaptchaChecked(e.target.checked)} />
              I'm not a robot
            </label>
            {errors.form ? <p className="text-sm text-red-500">{errors.form}</p> : null}
            <Button className="w-full" onClick={onSubmit} disabled={loading}>
              {loading ? "Signing in..." : `Login as ${role}`}
            </Button>
            <div className="flex items-center justify-between text-sm">
              <Link href="/forgot-password" className="hover:underline">Forgot password?</Link>
              <Link href="/create-account" className="hover:underline">Create account</Link>
            </div>
          </TabsContent>
          <TabsContent value="seller" className="space-y-4">
            {/* Same form for seller */}
            <div>
              <label className="text-sm">User ID</label>
              <Input
                placeholder="email or phone"
                className="mt-1"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
              {errors.email ? <p className="text-xs text-red-500 mt-1">{errors.email}</p> : null}
            </div>
            <div>
              <label className="text-sm">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                className="mt-1"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
              />
              {errors.secret ? <p className="text-xs text-red-500 mt-1">{errors.secret}</p> : null}
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={captchaChecked} onChange={(e) => setCaptchaChecked(e.target.checked)} />
              I'm not a robot
            </label>
            {errors.form ? <p className="text-sm text-red-500">{errors.form}</p> : null}
            <Button className="w-full" onClick={onSubmit} disabled={loading}>
              {loading ? "Signing in..." : `Login as ${role}`}
            </Button>
            <div className="flex items-center justify-between text-sm">
              <Link href="/forgot-password" className="hover:underline">Forgot password?</Link>
              <Link href="/create-account" className="hover:underline">Create account</Link>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}


