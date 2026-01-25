'use client';

import { useMemo } from 'react';

function getPlatform() {
  if (typeof navigator === 'undefined') return '';
  // Prefer UA-CH when available.
  // @ts-expect-error - userAgentData is not in TS lib for all targets.
  const uadPlatform = navigator.userAgentData?.platform;
  return String(uadPlatform || navigator.platform || '');
}

function isMacLike(platform: string) {
  return /Mac|iPhone|iPad|iPod/i.test(platform);
}

export function ShortcutHint({ className = 'kbdHint', prefix = 'Try' }: { className?: string; prefix?: string }) {
  const hint = useMemo(() => {
    const mac = isMacLike(getPlatform());
    return mac ? '⌘K' : 'Ctrl+K';
  }, []);

  return (
    <span className={className}>
      {prefix} {hint}
    </span>
  );
}
