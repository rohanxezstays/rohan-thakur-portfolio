import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const SITE = "https://rohanthakur.dev"; // TODO: set your live domain

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Rohan Thakur — Founder's Office | AI Engineer | Business Analyst",
    template: "%s · Rohan Thakur",
  },
  description:
    "Founder's Office Executive with expertise in Strategy, Analytics, AI, Product Development and Business Operations. Turning data into decisions, building growth through execution.",
  keywords: [
    "Rohan Thakur",
    "Founder's Office",
    "Business Analyst",
    "AI Engineer",
    "Data Analytics",
    "Power BI",
    "Ezstays",
    "IPO Readiness",
  ],
  authors: [{ name: "Rohan Thakur" }],
  openGraph: {
    title: "Rohan Thakur — Founder's Office | AI Engineer | Builder",
    description:
      "Turning Data Into Decisions. Building Growth Through Execution.",
    url: SITE,
    siteName: "Rohan Thakur",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohan Thakur — Founder's Office | AI Engineer | Builder",
    description:
      "Turning Data Into Decisions. Building Growth Through Execution.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ECE4D6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${cormorant.variable}`}
    >
      <body
        suppressHydrationWarning
        className="bg-bone font-sans text-espresso antialiased"
      >
        {children}
      </body>
    </html>
  );
}
