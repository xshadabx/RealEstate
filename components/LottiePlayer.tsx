"use client";

import Lottie from "lottie-react";

export default function LottiePlayer({ src, className }: { src: object; className?: string }) {
  return <Lottie autoplay loop className={className} animationData={src} />;
}


