import Image from 'next/image';
import Link from 'next/link';
import { SiteNav } from './SiteNav';

export function SiteHeader() {
  return (
    <header className="siteHeader">
      <div className="container headerInner">
        <div className="brandRow">
          <Link className="brand" href="/" aria-label="Home">
            <span className="brandMark" aria-hidden>
              <Image
                src="/images/logo.png"
                alt=""
                width={28}
                height={28}
                priority
              />
            </span>
            <span className="brandText">Joni</span>
          </Link>
          <div className="tagline">thinking · cities · code · AI</div>
        </div>
        <SiteNav />
      </div>
    </header>
  );
}
