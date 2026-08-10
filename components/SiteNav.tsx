'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItem = { href: string; label: string };

const NAV: NavItem[] = [
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/media', label: 'Media' },
];

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(href + '/');
}

export function SiteNav() {
  const pathname = usePathname() || '/';

  return (
    <nav className="nav" aria-label="Main">
      <ul className="navList">
        {NAV.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <li key={item.href} className="navItem">
              <Link
                href={item.href}
                className={active ? 'navLink navLinkActive' : 'navLink'}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
