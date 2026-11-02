'use client';

import Script from "next/script";
import { getCommunicationInjectorUrl } from "@/lib/config";

export default function CommunicationInjector() {
  return (
    <Script
      src={getCommunicationInjectorUrl()}
      strategy="beforeInteractive"
      id="optimizely-communication-injector"
    />
  );
}