"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

function sipFutureValue({ monthly, ratePercent, months }: { monthly: number; ratePercent: number; months: number }) {
  const r = ratePercent / 100 / 12;
  if (r === 0) return monthly * months;
  return monthly * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
}

export default function ESipPage() {
  const [monthly, setMonthly] = useState(5000);
  const [years, setYears] = useState(5);
  const [rate, setRate] = useState(10);

  const months = years * 12;
  const totalInvested = monthly * months;
  const expected = useMemo(() => sipFutureValue({ monthly, ratePercent: rate, months }), [monthly, rate, months]);
  const gains = expected - totalInvested;

  return (
    <main className="mx-auto max-w-3xl p-4 space-y-6">
      <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-semibold">
        E-SIP (Property SIP)
      </motion.h1>
      <Card>
        <CardContent className="p-4 grid gap-4 sm:grid-cols-3">
          <div>
            <label className="text-sm">Monthly Investment (₹)</label>
            <Input type="number" value={monthly} onChange={(e) => setMonthly(parseInt(e.target.value || "0"))} className="mt-1" />
          </div>
          <div>
            <label className="text-sm">Years</label>
            <Input type="number" value={years} onChange={(e) => setYears(parseInt(e.target.value || "0"))} className="mt-1" />
          </div>
          <div>
            <label className="text-sm">Expected Annual Return (%)</label>
            <Input type="number" value={rate} onChange={(e) => setRate(parseFloat(e.target.value || "0"))} className="mt-1" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="rounded-md border p-3">
            <div className="text-muted-foreground">Total Invested</div>
            <div className="text-xl font-semibold">₹{totalInvested.toLocaleString("en-IN")}</div>
          </div>
          <div className="rounded-md border p-3">
            <div className="text-muted-foreground">Estimated Value</div>
            <div className="text-xl font-semibold">₹{Math.round(expected).toLocaleString("en-IN")}</div>
          </div>
          <div className="rounded-md border p-3">
            <div className="text-muted-foreground">Estimated Gains</div>
            <div className="text-xl font-semibold text-primary">₹{Math.round(gains).toLocaleString("en-IN")}</div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button>Start SIP as Buyer</Button>
        <Button variant="outline">Start SIP as Seller</Button>
      </div>
    </main>
  );
}


