// ─── components/StatsBar/StatsBar.tsx ─────────────────────────────────────────

import React from 'react';
import type { Project } from '../../types';

interface StatsBarProps {
  projects: Project[];
}

export function StatsBar({ projects }: StatsBarProps) {
  const stats = [
    { label: 'Total',    value: projects.length,                                    bg: '#F1EFE8', text: '#2C2C2A' },
    { label: 'À faire',  value: projects.filter((p) => p.status === 'todo').length, bg: '#E6F1FB', text: '#0C447C' },
    { label: 'En cours', value: projects.filter((p) => p.status === 'in_progress').length, bg: '#FAEEDA', text: '#633806' },
    { label: 'Terminés', value: projects.filter((p) => p.status === 'done').length, bg: '#EAF3DE', text: '#27500A' },
  ];

  return (
    <div
      style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
        gap:                 '10px',
        marginBottom:        '20px',
      }}
    >
      {stats.map((s) => (
        <div
          key={s.label}
          style={{ background: s.bg, borderRadius: '8px', padding: '10px 12px' }}
        >
          <p style={{ fontSize: '11px', color: s.text, opacity: 0.75, marginBottom: '2px' }}>
            {s.label}
          </p>
          <p style={{ fontSize: '22px', fontWeight: 500, color: s.text }}>
            {s.value}
          </p>
        </div>
      ))}
    </div>
  );
}
