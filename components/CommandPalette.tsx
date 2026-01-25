'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

type Item = {
  title: string;
  href: string;
  kind: 'page' | 'post';
  meta?: string;
};

function isMac() {
  if (typeof navigator === 'undefined') return false;
  return /Mac|iPhone|iPad|iPod/.test(navigator.platform);
}

export function CommandPalette({ items }: { items: Item[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return items;
    return items
      .filter((i) => (i.title + ' ' + (i.meta || '')).toLowerCase().includes(query))
      .slice(0, 24);
  }, [items, q]);

  useEffect(() => {
    setActive(0);
  }, [q]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const mod = isMac() ? e.metaKey : e.ctrlKey;
      if (mod && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (!open) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, Math.max(0, filtered.length - 1)));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((a) => Math.max(0, a - 1));
      }
      if (e.key === 'Enter') {
        const item = filtered[active];
        if (!item) return;
        e.preventDefault();
        setOpen(false);
        setQ('');
        router.push(item.href);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, filtered, active, router]);

  useEffect(() => {
    // Close palette on navigation.
    if (!open) return;
    setOpen(false);
    setQ('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 0);
    return () => clearTimeout(t);
  }, [open]);

  return (
    <>
      <button
        className="cmdBtn"
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className="cmdBtnLabel">Search</span>
        <span className="cmdBtnHint">{isMac() ? '⌘K' : 'Ctrl+K'}</span>
      </button>

      {open ? (
        <div className="cmdOverlay" role="dialog" aria-label="Command palette" onMouseDown={() => setOpen(false)}>
          <div className="cmdPanel" onMouseDown={(e) => e.stopPropagation()}>
            <div className="cmdTop">
              <input
                ref={inputRef}
                className="cmdInput"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search pages and posts…"
                aria-label="Search"
              />
              <div className="cmdKbd">esc</div>
            </div>

            <ul className="cmdList" role="listbox" aria-label="Results">
              {filtered.length ? (
                filtered.map((item, i) => (
                  <li key={item.href} role="option" aria-selected={i === active}>
                    <button
                      type="button"
                      className={i === active ? 'cmdItem cmdItemActive' : 'cmdItem'}
                      onMouseEnter={() => setActive(i)}
                      onClick={() => {
                        setOpen(false);
                        setQ('');
                        router.push(item.href);
                      }}
                    >
                      <span className="cmdTitle">{item.title}</span>
                      <span className="cmdMeta">
                        <span className={item.kind === 'post' ? 'pill pillPost' : 'pill pillPage'}>
                          {item.kind}
                        </span>
                        {item.meta ? <span className="cmdMetaText">{item.meta}</span> : null}
                      </span>
                    </button>
                  </li>
                ))
              ) : (
                <li className="cmdEmpty">No matches.</li>
              )}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}
