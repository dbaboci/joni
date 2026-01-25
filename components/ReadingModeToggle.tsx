'use client';

import { useEffect, useState } from 'react';

const KEY = 'joni:readingMode';

export function ReadingModeToggle() {
  const [on, setOn] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(KEY) === '1';
  });

  useEffect(() => {
    document.documentElement.dataset.reading = on ? 'on' : 'off';
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(KEY, on ? '1' : '0');
    }
  }, [on]);

  const toggle = () => {
    setOn((v) => !v);
  };

  return (
    <button className="readBtn" type="button" onClick={toggle} aria-pressed={on}>
      <span className="readBtnLabel">Aa</span>
      <span className="readBtnHint">{on ? 'reading' : 'default'}</span>
    </button>
  );
}
