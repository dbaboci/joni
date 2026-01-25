import type { Metadata } from "next";
import { Crimson_Pro, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { listPosts } from "@/lib/content";

const serif = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-serif",
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

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const posts = await listPosts();

  const paletteItems = [
    { title: "Home", href: "/", kind: "page" as const },
    { title: "About", href: "/about", kind: "page" as const },
    { title: "Now", href: "/now", kind: "page" as const },
    { title: "Blog", href: "/blog", kind: "page" as const },
    { title: "Media", href: "/media", kind: "page" as const },
    { title: "Contact", href: "/contact", kind: "page" as const },
    { title: "Legacy", href: "/legacy", kind: "page" as const },
    ...posts.map((p) => ({
      title: p.title,
      href: `/blog/${p.slug}`,
      kind: "post" as const,
      meta: p.date,
    })),
  ];

  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <SiteHeader paletteItems={paletteItems} />
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
