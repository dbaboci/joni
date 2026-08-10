import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Joni Baboci — Urbanist & Builder",
    template: "%s — Joni Baboci",
  },
  description: "Joni Baboci is a planner, architect, and founder working across urban systems, spatial intelligence, and public technology.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <SiteHeader />
        <main className="siteMain">{children}</main>
        <footer className="siteFooter">
          <div className="footerInner">
            <p>© {new Date().getFullYear()} Joni Baboci</p>
            <p>Tirana, Albania</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
