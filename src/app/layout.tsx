import type { Metadata } from "next";
import { Ubuntu, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sentinell | Next-Gen AI Code Reviewer",
  description:
    "Automated deep contextual code reviews by your virtual Principal Engineer.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("dark", "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <body
        className={`${ubuntu.variable} antialiased font-ubuntu bg-background text-foreground selection:bg-primary selection:text-primary-foreground`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
