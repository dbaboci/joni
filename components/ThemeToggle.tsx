'use client';

import { useEffect, useState } from 'react';

const KEY = 'joni:theme';

type Theme = 'light' | 'dark';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    const v = window.localStorage.getItem(KEY);
    return v === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    const el = document.documentElement;
    el.dataset.theme = theme;
    el.classList.toggle('dark', theme === 'dark');
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(KEY, theme);
    }
  }, [theme]);

  const toggle = () => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  };

  const on = theme === 'dark';

  return (
    <button className="readBtn" type="button" onClick={toggle} aria-pressed={on} aria-label="Toggle theme">
      <span className="readBtnLabel">◐</span>
      <span className="readBtnHint">{on ? 'dark' : 'light'}</span>
    </button>
  );
}
