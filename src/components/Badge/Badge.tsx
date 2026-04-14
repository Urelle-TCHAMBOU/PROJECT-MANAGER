// ─── components/Badge/Badge.tsx ───────────────────────────────────────────────

import React from 'react';

interface BadgeProps {
  label:  string;
  bg:     string;
  color:  string;
}

export function Badge({ label, bg, color }: BadgeProps) {
  return (
    <span
      style={{
        display:      'inline-block',
        padding:      '2px 8px',
        borderRadius: '20px',
        fontSize:     '11px',
        fontWeight:   500,
        background:   bg,
        color,
      }}
    >
      {label}
    </span>
  );
}
