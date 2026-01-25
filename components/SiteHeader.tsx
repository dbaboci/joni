import Link from "next/link";
import { SiteNav } from "./SiteNav";
import { CommandPalette } from "./CommandPalette";
import { ReadingModeToggle } from "./ReadingModeToggle";
import { ThemeToggle } from "./ThemeToggle";

export type PaletteItem = {
  title: string;
  href: string;
  kind: "page" | "post";
  meta?: string;
};

export function SiteHeader({ paletteItems }: { paletteItems: PaletteItem[] }) {
  return (
    <header className="siteHeader">
      <div className="container headerInner">
        <div className="brandRow">
          <Link className="brand" href="/" aria-label="Home">
            <span className="brandMark" aria-hidden>
              J
            </span>
            <span className="brandText">Joni</span>
          </Link>
          <div className="tagline">urbanism · software · tools for thought · AI</div>
        </div>

        <div className="headerRight">
          <div className="headerTools" aria-label="Tools">
            <CommandPalette items={paletteItems} />
            <ThemeToggle />
            <ReadingModeToggle />
          </div>
          <SiteNav />
        </div>
      </div>
    </header>
  );
}
