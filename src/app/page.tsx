import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { Footer } from "@/components/landing/footer";
import { PricingSection } from "@/components/landing/pricing-section";
import { PipelineSection } from "@/components/landing/pipeline-section";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { APP_URL } from "@/lib/constants";

export default function Home() {
  return (
    <main className="relative bg-background">
      <Navbar />
      <HeroSection />

      <Separator className="bg-white/5" />

      {/* Advanced GSAP Pipeline Section */}
      <PipelineSection />

      <Separator className="bg-white/5" />

      <FeaturesSection />

      <PricingSection />

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto py-16 px-6 md:p-24 rounded-[3.5rem] bg-foreground text-background text-center relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent" />
          <div
            className="absolute inset-0 opacity-3"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter leading-[0.95]">
              Ready to secure <br className="hidden md:block" /> your codebase?
            </h2>
            <p className="text-lg md:text-xl opacity-60 max-w-xl mx-auto font-medium">
              Start reviewing every PR with architectural intelligence. Free to
              try, no credit card required.
            </p>
            <div className="pt-4">
              <Button
                asChild
                size="lg"
                className="h-14 px-10 rounded-2xl font-bold text-lg bg-background text-foreground hover:bg-background/90 hover:text-black hover:scale-[1.03] transition-transform duration-300"
              >
                <Link href={APP_URL}>Get Started Free →</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
