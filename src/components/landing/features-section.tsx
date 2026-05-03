"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Shield,
  Cpu,
  Lock,
  Code2,
  Zap,
  BarChart3,
  Globe,
  Workflow,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FaGithub, FaGitlab } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

/*
 * Bento Layout (3 cols):
 * ┌────────────────┬─────────┐
 * │   Profiling     │ Triage  │
 * │   (2 col)       │ (1 col) │
 * ├────────┬────────┼─────────┤
 * │ Multi  │ Vault  │  Event  │
 * │ (1col) │ (1col) │  (1col) │
 * ├────────┴────────┴─────────┤
 * │      Deep AI Engine       │
 * │      (full width)         │
 * └───────────────────────────┘
 */

const features = [
  {
    title: "Universal Profiling",
    desc: "Scans your entire codebase to build a living map of architecture — config files, dependency trees, conventions, and custom rules.",
    icon: Code2,
    accent: "cyan",
    grid: "md:col-span-2",
    visual: (
      <div className="rounded-2xl bg-black/30 border border-white/6 p-5 font-mono text-xs space-y-1.5 overflow-hidden">
        <div className="flex items-center gap-2 text-white/30 mb-3">
          <div className="w-2 h-2 rounded-full bg-white/80" />
          <span className="uppercase tracking-widest text-[9px]">
            sentinell.profile.json
          </span>
        </div>
        <div className="text-white/30">{"{"}</div>
        <div className="pl-4 text-zinc-400">{`"framework": "Next.js 16",`}</div>
        <div className="pl-4 text-zinc-400">{`"orm": "Prisma 7.4",`}</div>
        <div className="pl-4 text-zinc-400">{`"auth": "Better-Auth",`}</div>
        <div className="pl-4 text-zinc-400">{`"patterns": ["event-driven", "TRPC"]`}</div>
        <div className="text-white/30">{"}"}</div>
      </div>
    ),
  },
  {
    title: "Real-Time Triage",
    desc: "Ranks every changed file by risk — auth logic, migrations, and API surfaces are flagged instantly.",
    icon: Zap,
    accent: "amber",
    grid: "md:col-span-1",
    visual: (
      <div className="space-y-3">
        {[
          {
            risk: "CRITICAL",
            file: "middleware.ts",
            color: "bg-red-500",
            w: "w-[90%]",
          },
          {
            risk: "HIGH",
            file: "schema.prisma",
            color: "bg-amber-500",
            w: "w-[65%]",
          },
          {
            risk: "LOW",
            file: "button.tsx",
            color: "bg-emerald-500",
            w: "w-[25%]",
          },
        ].map((item) => (
          <div key={item.file} className="space-y-1.5">
            <div className="flex justify-between text-[10px] font-mono">
              <span className="text-white/50">{item.file}</span>
              <span className="text-white/30">{item.risk}</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/6">
              <div
                className={`h-full rounded-full ${item.color}/60 ${item.w}`}
              />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Multi-Provider OAuth",
    desc: "Connect GitHub and GitLab seamlessly. Review everywhere.",
    icon: Globe,
    accent: "violet",
    grid: "md:col-span-1",
    visual: (
      <div className="flex items-center justify-center gap-5">
        {[
          { Icon: FaGithub, label: "GitHub" },
          { Icon: FaGitlab, label: "GitLab" },
        ].map(({ Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-white/4 border border-white/8 flex items-center justify-center hover:border-white/20 hover:bg-white/5 transition-all duration-300">
              <Icon className="w-5 h-5 text-white/40" />
            </div>
            <span className="text-[9px] text-white/30 font-mono uppercase tracking-wider">
              {label}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Secure Vault",
    desc: "AES-256-GCM encryption for all API keys at rest.",
    icon: Lock,
    accent: "rose",
    grid: "md:col-span-1",
    visual: (
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <Shield className="w-14 h-14 text-white/6" />
          <Lock className="w-5 h-5 text-zinc-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/3 border border-white/6">
          <div className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
          <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">
            Encrypted
          </span>
        </div>
      </div>
    ),
  },
  {
    title: "Event-Driven Engine",
    desc: "Built on Inngest for atomic, retriable, and cancellable jobs.",
    icon: Workflow,
    accent: "sky",
    grid: "md:col-span-1",
    visual: (
      <div className="space-y-2">
        {[
          {
            status: "✓",
            text: "pr.review.requested",
            color: "text-white/60",
          },
          {
            status: "⟳",
            text: "review.step.profiling",
            color: "text-zinc-400",
          },
          {
            status: "⟳",
            text: "review.step.analysis",
            color: "text-zinc-400",
          },
          { status: "—", text: "review.completed", color: "text-white/20" },
        ].map((ev) => (
          <div
            key={ev.text}
            className="flex items-center gap-2.5 font-mono text-[11px]"
          >
            <span className={ev.color}>{ev.status}</span>
            <span className="text-white/40">{ev.text}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Deep AI Review Engine",
    desc: "Hunk-aware analysis with full surrounding context. Catches logic flaws, race conditions, and security bypasses before they hit production.",
    icon: Cpu,
    accent: "emerald",
    grid: "md:col-span-3",
    visual: (
      <div className="rounded-2xl bg-black/30 border border-white/6 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/6 bg-white/2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          <span className="ml-2 text-[9px] font-mono text-white/20 uppercase tracking-widest">
            sentinell — review output
          </span>
        </div>
        <div className="p-5 font-mono text-xs grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <div className="text-white/20 text-[10px] uppercase tracking-widest mb-2">
              Changed Code
            </div>
            <div className="text-emerald-400/70">
              + if (!user.can(action)) {"{"}
            </div>
            <div className="text-emerald-400/70">
              + throw new UnauthorizedError();
            </div>
            <div className="text-emerald-400/70">+ {"}"}</div>
            <div className="text-white/20 mt-2">
              {"  // ... existing handler logic"}
            </div>
            <div className="text-red-400/60">- return res.send(data);</div>
            <div className="text-emerald-400/70">
              + return res.json({"{ success: true, data }"});
            </div>
          </div>
          <div className="space-y-3">
            <div className="text-white/20 text-[10px] uppercase tracking-widest mb-2">
              Sentinell Findings
            </div>
            <div className="p-3 rounded-xl bg-red-500/6 border border-red-500/10 text-red-400/80 text-[11px] leading-relaxed">
              ⚠ <strong>Auth Bypass</strong>:{" "}
              <code className="text-white/50">action</code> param is not
              validated against user roles at L:47
            </div>
            <div className="p-3 rounded-xl bg-amber-500/6 border border-amber-500/10 text-amber-400/80 text-[11px] leading-relaxed">
              ⚡ <strong>Edge Case</strong>: Missing null check for{" "}
              <code className="text-white/50">user.session</code> — will throw
              at runtime
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

const accentMap: Record<
  string,
  { border: string; text: string; bg: string; glow: string }
> = {
  cyan: {
    border: "border-zinc-500/20",
    text: "text-zinc-300",
    bg: "bg-zinc-500/10",
    glow: "hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]",
  },
  amber: {
    border: "border-zinc-500/20",
    text: "text-zinc-300",
    bg: "bg-zinc-500/10",
    glow: "hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]",
  },
  violet: {
    border: "border-zinc-500/20",
    text: "text-zinc-300",
    bg: "bg-zinc-500/10",
    glow: "hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]",
  },
  emerald: {
    border: "border-zinc-500/20",
    text: "text-zinc-300",
    bg: "bg-zinc-500/10",
    glow: "hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]",
  },
  rose: {
    border: "border-zinc-500/20",
    text: "text-zinc-300",
    bg: "bg-zinc-500/10",
    glow: "hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]",
  },
  sky: {
    border: "border-zinc-500/20",
    text: "text-zinc-300",
    bg: "bg-zinc-500/10",
    glow: "hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]",
  },
};

export const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power4.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 95%",
        },
      });

      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.from(card, {
          y: 30,
          opacity: 0,
          scale: 0.97,
          duration: 0.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            start: "top 95%",
          },
        });

        const visual = card.querySelector(".feature-visual");
        if (visual) {
          gsap.from(visual, {
            y: 10,
            opacity: 0,
            duration: 0.4,
            delay: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="py-32 px-6 relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-150 h-150 bg-white/2 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-150 h-150 bg-white/1 rounded-full blur-[150px]" />
        {/* Section fade edges */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20 space-y-6">
          <Badge
            variant="outline"
            className="border-white/10 bg-white/3 text-muted-foreground uppercase tracking-[0.3em] text-[10px] font-bold px-4 py-1.5"
          >
            <BarChart3 className="w-3 h-3 mr-2" />
            Core Capabilities
          </Badge>
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter leading-[0.95]">
            Built Different. <br />
            <span className="bg-linear-to-r from-foreground via-foreground/60 to-foreground/20 bg-clip-text text-transparent">
              Built to Protect.
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every feature is designed with one goal: catch what humans miss,
            before it reaches production.
          </p>
        </div>

        {/* Bento Grid — 3 cols, 3 rows */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, i) => {
            const colors = accentMap[feature.accent];
            return (
              <div
                key={feature.title}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                className={`${feature.grid} rounded-3xl border ${colors.border} bg-white/2 p-7 ${colors.glow} hover:bg-white/4 transition-all duration-500 group flex flex-col`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl ${colors.bg} ${colors.border} border flex items-center justify-center shrink-0`}
                  >
                    <feature.icon className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {feature.desc}
                </p>
                <div className="feature-visual mt-auto">{feature.visual}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
