"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GitPullRequest, Brain, ShieldCheck, ArrowDown, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: "01",
    title: "Repository Profiling",
    subtitle: "CONTEXT MAPPING",
    desc: "Scans your entire repository to build a living map of your architecture — config files, dependency trees, folder conventions, and custom rules.",
    icon: GitPullRequest,
    accent: "cyan",
    stats: [
      { label: "Files Scanned", value: "∞" },
      { label: "Latency", value: "< 800ms" },
    ],
    terminal: [
      { type: "info", text: "▸ Scanning repository structure..." },
      { type: "success", text: "✓ 847 files indexed" },
      { type: "info", text: "▸ Detecting tech stack: Next.js 16, TypeScript, Prisma" },
      { type: "success", text: "✓ Architecture profile generated" },
    ],
  },
  {
    id: "02",
    title: "Intelligent Triage",
    subtitle: "RISK ANALYSIS",
    desc: "Ranks every changed file by risk level — authentication logic, database migrations, and API surface changes are flagged instantly.",
    icon: Brain,
    accent: "amber",
    stats: [
      { label: "Risk Levels", value: "5" },
      { label: "Accuracy", value: "99.2%" },
    ],
    terminal: [
      { type: "warn", text: "▸ HIGH RISK: auth/middleware.ts (security boundary)" },
      { type: "warn", text: "▸ MEDIUM: prisma/schema.prisma (migration)" },
      { type: "info", text: "▸ LOW: components/button.tsx (UI)" },
      { type: "success", text: "✓ 3 files triaged, 1 critical" },
    ],
  },
  {
    id: "03",
    title: "Deep AI Review",
    subtitle: "LOGIC ANALYSIS",
    desc: "Performs hunk-aware analysis with full surrounding context. Detects logic flaws, race conditions, security bypasses, and missing edge cases.",
    icon: ShieldCheck,
    accent: "emerald",
    stats: [
      { label: "Bug Types", value: "24+" },
      { label: "Confidence", value: "99.9%" },
    ],
    terminal: [
      { type: "info", text: "▸ Analyzing auth/middleware.ts [hunk 1/3]..." },
      { type: "error", text: "✗ Potential auth bypass: missing role check L:47" },
      { type: "warn", text: "▸ Edge case: null user session not handled L:52" },
      { type: "success", text: "✓ Review complete — 2 issues, 1 critical" },
    ],
  },
];

const accentColors: Record<string, { border: string; bg: string; text: string; glow: string; dot: string }> = {
  cyan: {
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    glow: "shadow-[0_0_60px_rgba(6,182,212,0.15)]",
    dot: "bg-cyan-400",
  },
  amber: {
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    glow: "shadow-[0_0_60px_rgba(245,158,11,0.15)]",
    dot: "bg-amber-400",
  },
  emerald: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    glow: "shadow-[0_0_60px_rgba(16,185,129,0.15)]",
    dot: "bg-emerald-400",
  },
};

const terminalColors: Record<string, string> = {
  info: "text-white/50",
  success: "text-emerald-400",
  warn: "text-amber-400",
  error: "text-red-400",
};

// Timeline axis constant: all dots, lines, orb sit on this X position
const TIMELINE_LEFT = 20; // px from left edge of the relative container
const DOT_SIZE = 16; // px
const END_DOT_SIZE = 24; // px

export const PipelineSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const endNodeRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from(headerRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
        },
      });

      // Progress line + orb travel together via scrub
      if (timelineRef.current && progressRef.current && orbRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 50%",
            end: "bottom 50%",
            scrub: 0.3,
          },
        });

        // Progress line scales from top to bottom
        tl.fromTo(
          progressRef.current,
          { scaleY: 0 },
          { scaleY: 1, ease: "none", duration: 1 },
          0
        );

        // Glowing orb travels from top to bottom of the timeline
        tl.fromTo(
          orbRef.current,
          { top: "0%" },
          { top: "100%", ease: "none", duration: 1 },
          0
        );
      }

      // End node fade in
      if (endNodeRef.current) {
        gsap.from(endNodeRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: endNodeRef.current,
            start: "top 90%",
          },
        });
      }

      // Each card: 3D entrance + terminal typewriter
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        gsap.from(card, {
          y: 100,
          opacity: 0,
          rotateX: 8,
          scale: 0.95,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            onEnter: () => setActiveStep(i),
          },
        });

        // Terminal lines typewriter
        const terminalLines = card.querySelectorAll(".terminal-line");
        gsap.from(terminalLines, {
          x: -20,
          opacity: 0,
          stagger: 0.12,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 70%",
          },
        });

        // Stats pop-in
        const statValues = card.querySelectorAll(".stat-value");
        gsap.from(statValues, {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
          },
        });

        // Icon glow pulse
        const iconBox = card.querySelector(".icon-box");
        if (iconBox) {
          gsap.to(iconBox, {
            boxShadow: "0 0 40px rgba(255,255,255,0.1)",
            repeat: -1,
            yoyo: true,
            duration: 2,
            ease: "sine.inOut",
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pipeline"
      className="relative py-32 px-6 overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      {/* Ambient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-emerald-500/[0.03] rounded-full blur-[150px]" />
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-24 space-y-6">
          <Badge
            variant="outline"
            className="border-white/10 bg-white/[0.03] text-muted-foreground uppercase tracking-[0.3em] text-[10px] font-bold px-4 py-1.5"
          >
            <Terminal className="w-3 h-3 mr-2" />
            Execution Pipeline
          </Badge>
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter leading-[0.95]">
            Three Stages. <br />
            <span className="bg-gradient-to-r from-foreground via-foreground/60 to-foreground/20 bg-clip-text text-transparent">
              Zero Blind Spots.
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every PR passes through an autonomous, event-driven pipeline.
            Each stage is atomic, retriable, and cancellable in real-time.
          </p>
        </div>

        {/* Pipeline Timeline */}
        <div ref={timelineRef} className="relative">

          {/* ── Vertical Track (Desktop) ── */}
          {/* Background track line — always visible */}
          <div
            className="absolute top-0 bottom-0 w-[1px] bg-white/[0.06] hidden lg:block"
            style={{ left: `${TIMELINE_LEFT}px` }}
          />
          {/* Animated progress line — grows on scroll */}
          <div
            ref={progressRef}
            className="absolute top-0 bottom-0 w-[2px] hidden lg:block"
            style={{
              left: `${TIMELINE_LEFT - 0.5}px`,
              transformOrigin: "top",
              background: "linear-gradient(to bottom, #06b6d4, #f59e0b, #10b981)",
              boxShadow: "0 0 12px rgba(6,182,212,0.4), 0 0 24px rgba(16,185,129,0.2)",
            }}
          />
          {/* Glowing Orb — travels down the line */}
          <div
            ref={orbRef}
            className="absolute hidden lg:block pointer-events-none"
            style={{
              left: `${TIMELINE_LEFT - 9}px`,
              width: "18px",
              height: "18px",
            }}
          >
            <div className="w-full h-full rounded-full bg-white/90 blur-[1px]" />
            <div
              className="absolute inset-[-8px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
              }}
            />
          </div>

          {/* ── Step Cards ── */}
          <div className="space-y-8 lg:space-y-12">
            {steps.map((step, i) => {
              const colors = accentColors[step.accent];
              const isActive = activeStep >= i;

              return (
                <div
                  key={step.id}
                  ref={(el) => { cardsRef.current[i] = el; }}
                  className="relative lg:pl-16"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* ── Step Dot on timeline ── */}
                  <div
                    className="absolute hidden lg:flex items-center justify-center"
                    style={{
                      left: `${TIMELINE_LEFT - DOT_SIZE / 2}px`,
                      top: "40px",
                      width: `${DOT_SIZE}px`,
                      height: `${DOT_SIZE}px`,
                    }}
                  >
                    {/* Outer ring pulse when active */}
                    {isActive && (
                      <div
                        className={`absolute inset-[-6px] rounded-full ${colors.border} border-2 animate-ping opacity-30`}
                      />
                    )}
                    <div
                      className={`w-full h-full rounded-full border-2 ${colors.border} ${isActive ? colors.dot : "bg-background"} transition-all duration-500 relative z-10`}
                    />
                  </div>

                  {/* ── Card ── */}
                  <div className={`rounded-3xl border ${colors.border} bg-white/[0.02] backdrop-blur-sm p-8 md:p-10 ${colors.glow} hover:bg-white/[0.04] transition-all duration-500 group lg:ml-8`}>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                      {/* Left: Info */}
                      <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center gap-4">
                          <div className={`icon-box w-14 h-14 rounded-2xl ${colors.bg} ${colors.border} border flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                            <step.icon className={`w-7 h-7 ${colors.text}`} />
                          </div>
                          <div>
                            <div className={`text-[10px] font-bold uppercase tracking-[0.3em] ${colors.text} font-mono`}>
                              {step.subtitle}
                            </div>
                            <h3 className="text-2xl font-bold tracking-tight">{step.title}</h3>
                          </div>
                        </div>

                        <p className="text-muted-foreground leading-relaxed">
                          {step.desc}
                        </p>

                        {/* Stats */}
                        <div className="flex gap-6 pt-2">
                          {step.stats.map((stat) => (
                            <div key={stat.label} className="space-y-1">
                              <div className="stat-value text-2xl font-bold tracking-tighter">{stat.value}</div>
                              <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Terminal */}
                      <div className="lg:col-span-3">
                        <div className="rounded-2xl bg-black/40 border border-white/[0.06] overflow-hidden backdrop-blur-md">
                          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                            <div className="w-3 h-3 rounded-full bg-red-500/60" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                            <div className="w-3 h-3 rounded-full bg-green-500/60" />
                            <span className="ml-3 text-[10px] font-mono text-white/30 uppercase tracking-widest">
                              sentinell — stage {step.id}
                            </span>
                          </div>
                          <div className="p-5 font-mono text-[13px] leading-7 space-y-1">
                            {step.terminal.map((line, j) => (
                              <div key={j} className={`terminal-line ${terminalColors[line.type]}`}>
                                {line.text}
                              </div>
                            ))}
                            <div className="terminal-line text-white/20 animate-pulse mt-2">█</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── End Node ── */}
          <div ref={endNodeRef} className="relative lg:pl-16 mt-12 hidden lg:block">
            {/* End dot — perfectly aligned */}
            <div
              className="absolute flex items-center justify-center"
              style={{
                left: `${TIMELINE_LEFT - END_DOT_SIZE / 2}px`,
                top: "50%",
                transform: "translateY(-50%)",
                width: `${END_DOT_SIZE}px`,
                height: `${END_DOT_SIZE}px`,
              }}
            >
              <div className="absolute inset-[-4px] rounded-full border-2 border-emerald-500/20 animate-ping opacity-20" />
              <div className="w-full h-full rounded-full border-2 border-emerald-500/40 bg-emerald-500/20 flex items-center justify-center relative z-10">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
              </div>
            </div>
            {/* End message */}
            <div className="lg:ml-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-6 text-center backdrop-blur-sm">
              <span className="text-emerald-400 font-bold text-sm tracking-wider uppercase">
                ✓ Review Complete — Results Delivered to Your PR
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
