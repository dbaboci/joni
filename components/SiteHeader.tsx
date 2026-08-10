import Link from "next/link";
import { SiteNav } from "./SiteNav";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="siteHeader">
      <div className="headerFrame">
        <Link className="brand" href="/" aria-label="Joni Baboci — home">
          <strong>Joni Baboci</strong>
        </Link>

        <div className="headerRight">
          <SiteNav />
          <div className="headerTools" aria-label="Site tools">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
