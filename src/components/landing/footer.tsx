"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-7 h-7">
            <Image
              src="/logo.svg"
              alt="Sentinell Logo"
              fill
              className="object-contain invert"
            />
          </div>
          <span className="text-base font-bold tracking-tighter">SENTINELL</span>
        </Link>

        <span className="text-xs text-muted-foreground uppercase tracking-widest">
          © 2026 Sentinell AI. All rights reserved.
        </span>
      </div>
    </footer>
  );
};
