import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Joni",
  description: "Joni's playground",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container">
            <Link className="brand" href="/">
              Joni
            </Link>
            <nav className="nav">
              <Link href="/about">About</Link>
              <Link href="/now">Now</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/media">Media</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/legacy">Legacy</Link>
            </nav>
          </div>
        </header>

        <main className="container">{children}</main>

        <footer className="site-footer">
          <div className="container">
            <small>Deployed on Vercel. ⚡</small>
          </div>
        </footer>
      </body>
    </html>
  );
}
