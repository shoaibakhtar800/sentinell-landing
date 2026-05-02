"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Sparkles, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    desc: "Perfect for growing startups and small teams.",
    accent: "white",
    popular: false,
    features: [
      "Unlimited Repositories",
      "10 AI Code Reviews / Day",
      "Custom Architecture Rules",
      "Priority Support",
      "GitHub & GitLab Integration",
    ],
    cta: "Join Waitlist",
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "/month",
    desc: "For large-scale engineering teams shipping at speed.",
    accent: "primary",
    popular: true,
    features: [
      "Everything in Pro",
      "Unlimited AI Code Reviews",
      "Deep Context Extraction",
      "SAML / SSO Authentication",
      "Dedicated Success Manager",
      "Custom AI Model Fine-tuning",
    ],
    cta: "Contact Sales",
  },
];

export const PricingSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
        },
      });

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          y: 80,
          opacity: 0,
          scale: 0.95,
          duration: 1,
          delay: i * 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="py-32 px-6 relative overflow-hidden"
    >
      {/* Ambient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/[0.03] rounded-full blur-[200px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20 space-y-6">
          <Badge
            variant="outline"
            className="border-white/10 bg-white/[0.03] text-muted-foreground uppercase tracking-[0.3em] text-[10px] font-bold px-4 py-1.5"
          >
            <CreditCard className="w-3 h-3 mr-2" />
            Pricing
          </Badge>
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter leading-[0.95]">
            Simple Pricing. <br />
            <span className="bg-gradient-to-r from-foreground via-foreground/60 to-foreground/20 bg-clip-text text-transparent">
              Serious Protection.
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your workflow.{" "}
            <span className="text-foreground font-semibold">
              Payment gateway coming soon.
            </span>
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {plans.map((plan, i) => {
            const isPopular = plan.popular;
            return (
              <div
                key={plan.name}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                className={`relative rounded-3xl p-8 md:p-10 flex flex-col border transition-all duration-500 ${
                  isPopular
                    ? "border-white/20 bg-white/[0.04]"
                    : "border-white/[0.08] bg-white/[0.02] hover:border-white/15"
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-foreground text-background font-bold text-xs px-4 py-1 rounded-full shadow-lg">
                      <Sparkles className="w-3 h-3 mr-1.5" />
                      MOST POPULAR
                    </Badge>
                  </div>
                )}

                {/* Plan Header */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-5xl font-bold tracking-tighter">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground text-sm font-medium">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">{plan.desc}</p>
                </div>

                {/* Divider */}
                <div className="h-[1px] bg-white/[0.06] mb-8" />

                {/* Features */}
                <div className="space-y-4 mb-10 flex-1">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 text-sm"
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                          isPopular
                            ? "bg-foreground/10"
                            : "bg-white/[0.06]"
                        }`}
                      >
                        <Check
                          className={`w-3 h-3 ${
                            isPopular
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }`}
                        />
                      </div>
                      <span
                        className={
                          isPopular
                            ? "text-foreground font-medium"
                            : "text-muted-foreground"
                        }
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Button
                  disabled
                  className={`w-full h-13 rounded-2xl text-base font-bold ${
                    isPopular
                      ? "bg-foreground text-background hover:bg-foreground/90"
                      : "bg-white/[0.06] text-foreground hover:bg-white/[0.1]"
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
