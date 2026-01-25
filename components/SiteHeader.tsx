import Link from "next/link";
import { SiteNav } from "./SiteNav";

export function SiteHeader() {
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
        <SiteNav />
      </div>
    </header>
  );
}
