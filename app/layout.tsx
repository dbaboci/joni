import type { Metadata } from "next";
import { Crimson_Pro, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";

const serif = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-serif",
  // Crimson needs a couple weights for emphasis without looking heavy.
  weight: ["400", "500", "600", "700"],
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Joni",
  description: "Personal playground: urbanism · software · tools for thought · AI",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <SiteHeader />
        <main className="container">{children}</main>
        <footer className="siteFooter">
          <div className="container footerInner">
            <small className="muted">
              Built on Next.js · deployed on Vercel · evolving by design.
            </small>
          </div>
        </footer>
      </body>
    </html>
  );
}
