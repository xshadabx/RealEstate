"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/lib/language-context";
import LanguageSelector from "@/components/LanguageSelector";

export default function LoginPage() {
  const router = useRouter();
  const { t } = useLanguage();
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
      // Set user type in localStorage for navbar context
      localStorage.setItem('userType', role);
      router.push(role === "buyer" ? "/buyer" : "/seller");
    } else {
      setErrors({ form: "Invalid credentials" });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Netflix-like background with animated elements */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      {/* Language selector in top right */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageSelector />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Logo and title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
              <span className="text-3xl">🏠</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">RealEstate Pro</h1>
            <p className="text-gray-300 text-lg">Welcome Back</p>
          </motion.div>

          {/* Login form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl"
          >
            <Tabs defaultValue="buyer" onValueChange={(v) => setRole(v as "buyer" | "seller")}>
              <TabsList className="grid grid-cols-2 w-full mb-6 bg-white/10 border border-white/20">
                <TabsTrigger value="buyer" className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-gray-300">{t('buyer')}</TabsTrigger>
                <TabsTrigger value="seller" className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-gray-300">{t('seller')}</TabsTrigger>
              </TabsList>
              <TabsContent value="buyer" className="space-y-6">
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">{t('user_id')}</label>
                  <Input
                    placeholder="email or phone"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                  />
                  {errors.email ? <p className="text-xs text-red-400 mt-1">{errors.email}</p> : null}
                </div>
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">{t('password')}</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
                    value={secret}
                    onChange={(e) => setSecret(e.target.value)}
                  />
                  {errors.secret ? <p className="text-xs text-red-400 mt-1">{errors.secret}</p> : null}
                </div>
                <label className="flex items-center gap-3 text-sm text-gray-300">
                  <input 
                    type="checkbox" 
                    checked={captchaChecked} 
                    onChange={(e) => setCaptchaChecked(e.target.checked)}
                    className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500 focus:ring-2"
                  />
                  {t('human_verification')}
                </label>
                {errors.form ? <p className="text-sm text-red-400">{errors.form}</p> : null}
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105" 
                  onClick={onSubmit} 
                  disabled={loading}
                >
                  {loading ? t('signing_in') : t('login_as_buyer')}
                </Button>
                <div className="flex items-center justify-between text-sm">
                  <Link href="/forgot-password" className="text-gray-300 hover:text-white transition-colors">{t('forget_password')}</Link>
                  <Link href="/create-account" className="text-gray-300 hover:text-white transition-colors">{t('create_account')}</Link>
                </div>
              </TabsContent>
              <TabsContent value="seller" className="space-y-6">
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">{t('user_id')}</label>
                  <Input
                    placeholder="email or phone"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                  />
                  {errors.email ? <p className="text-xs text-red-400 mt-1">{errors.email}</p> : null}
                </div>
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">{t('password')}</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400/20"
                    value={secret}
                    onChange={(e) => setSecret(e.target.value)}
                  />
                  {errors.secret ? <p className="text-xs text-red-400 mt-1">{errors.secret}</p> : null}
                </div>
                <label className="flex items-center gap-3 text-sm text-gray-300">
                  <input 
                    type="checkbox" 
                    checked={captchaChecked} 
                    onChange={(e) => setCaptchaChecked(e.target.checked)}
                    className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500 focus:ring-2"
                  />
                  {t('human_verification')}
                </label>
                {errors.form ? <p className="text-sm text-red-400">{errors.form}</p> : null}
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105" 
                  onClick={onSubmit} 
                  disabled={loading}
                >
                  {loading ? t('signing_in') : t('login_as_seller')}
                </Button>
                <div className="flex items-center justify-between text-sm">
                  <Link href="/forgot-password" className="text-gray-300 hover:text-white transition-colors">{t('forget_password')}</Link>
                  <Link href="/create-account" className="text-gray-300 hover:text-white transition-colors">{t('create_account')}</Link>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}


