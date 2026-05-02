"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { APP_URL } from "@/lib/constants";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Pipeline", href: "#pipeline" },
    { name: "Pricing", href: "#pricing" },
    { name: "Docs", href: "#docs" },
  ];

  return (
    <nav
      className={cn(
        "hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-white/5 py-3"
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-10 h-10 group-hover:scale-110 transition-transform duration-300">
            <Image
              src="/logo.svg"
              alt="Sentinell Logo"
              fill
              className="object-contain invert" // The user asked to invert, usually means make it white on black
            />
          </div>
          <span className="text-xl font-bold tracking-tighter text-glow uppercase">
            SENTINELL
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {/* {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))} */}
          <Button
            asChild
            variant="default"
            className="rounded-full px-6 shadow-lg shadow-primary/20"
          >
            <Link href={APP_URL}>Get Started</Link>
          </Button>
        </div>

        {/* Mobile Toggle using Shadcn Sheet */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-background/95 backdrop-blur-xl border-white/5"
            >
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 mb-8">
                  <div className="relative w-8 h-8">
                    <Image
                      src="/logo.svg"
                      alt="Logo"
                      fill
                      className="object-contain invert"
                    />
                  </div>
                  SENTINELL
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 mt-8">
                {/* {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-lg font-semibold text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                ))} */}
                <Button
                  asChild
                  className="w-full mt-4 h-12 rounded-xl text-lg font-bold"
                >
                  <Link href={APP_URL}>Get Started</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
