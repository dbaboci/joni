import type { Metadata } from "next";
import { Open_Sans, PT_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";

const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-sans" });
const ptSans = PT_Sans({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Joni",
  description: "Personal playground: thinker · urban planner · coder · AI-obsessed",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${openSans.variable} ${ptSans.variable}`}> 
      <body>
        <div className="bgGrid" aria-hidden />
        <SiteHeader />

        <main className="container">{children}</main>

        <footer className="siteFooter">
          <div className="container footerInner">
            <small>
              Deployed on Vercel. Built to evolve. <span aria-hidden>⚡</span>
            </small>
            <small className="muted">/legacy keeps the old artifacts.</small>
          </div>
        </footer>
      </body>
    </html>
  );
}
