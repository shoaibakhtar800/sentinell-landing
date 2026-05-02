"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Hero3D } from "./hero-3d";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { APP_URL } from "@/lib/constants";
import Link from "next/link";

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: 0.2,
      })
        .from(
          subtitleRef.current,
          {
            y: 50,
            opacity: 0,
            duration: 1,
          },
          "-=0.6",
        )
        .from(
          buttonsRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.6",
        )
        .from(
          statsRef.current?.children || [],
          {
            scale: 0.8,
            opacity: 0,
            stagger: 0.1,
            duration: 0.6,
          },
          "-=0.4",
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden"
    >
      <Hero3D />

      <div className="max-w-7xl mx-auto text-center z-10">
        <Badge
          variant="outline"
          className="px-4 py-1.5 rounded-full bg-primary/5 border-primary/20 mb-8 animate-pulse text-xs font-bold tracking-widest uppercase text-primary gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-primary" />
          Next-Gen AI Pipeline Active
        </Badge>

        <h1
          ref={titleRef}
          className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 leading-[1.1]"
        >
          Your Code, <br />
          <span className="bg-gradient-to-r from-foreground via-foreground/70 to-foreground/40 bg-clip-text text-transparent">
            Perfectly Reviewed.
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed font-medium"
        >
          Sentinell isn&apos;t just an AI bot; it&apos;s your project&apos;s
          most vigilant Principal Engineer. Perform deep contextual reviews on
          every PR, automatically.
        </p>

        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
        >
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto h-14 px-8 rounded-2xl text-lg font-bold shadow-[0_0_40px_rgba(var(--primary),0.2)] group transition-all"
          >
            <Link href={APP_URL}>
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          {/* <Button
            size="lg"
            variant="outline"
            className="h-14 px-8 rounded-2xl text-lg font-bold backdrop-blur-sm border-white/10 hover:bg-white/5 transition-all"
          >
            <Play className="w-5 h-5 mr-2 fill-current" />
            Watch Demo
          </Button> */}
        </div>

        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-t border-white/5 pt-12"
        >
          {[
            { label: "AI Confidence", value: "99.9%" },
            { label: "Review Time", value: "< 2m" },
            { label: "Bugs Caught", value: "10k+" },
            { label: "Engineers Saved", value: "500+" },
          ].map((stat) => (
            <div key={stat.label} className="space-y-1">
              <div className="text-2xl font-bold tracking-tighter">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-bold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-1/2 bg-gradient-to-t from-background via-transparent to-transparent -z-10" />
    </section>
  );
};
