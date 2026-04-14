// ─── components/Filters/Filters.tsx ───────────────────────────────────────────

import React from 'react';
import type { ProjectStatus, Priority } from '../../types';
import { STATUS_LABELS, PRIORITY_LABELS } from '../../utils/constants';

interface FiltersProps {
  search:           string;
  statusFilter:     ProjectStatus | 'all';
  priorityFilter:   Priority | 'all';
  onSearch:         (v: string) => void;
  onStatusChange:   (v: ProjectStatus | 'all') => void;
  onPriorityChange: (v: Priority | 'all') => void;
}

const inputStyle: React.CSSProperties = {
  fontFamily:   'inherit',
  fontSize:     '13px',
  padding:      '8px 10px',
  border:       '0.5px solid var(--color-border-secondary, #ccc)',
  borderRadius: '8px',
  background:   'var(--color-background-primary, #fff)',
  color:        'var(--color-text-primary, #111)',
  outline:      'none',
};

export function Filters({
  search, statusFilter, priorityFilter,
  onSearch, onStatusChange, onPriorityChange,
}: FiltersProps) {
  return (
    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
      <input
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Rechercher un projet..."
        style={{ ...inputStyle, flex: '1 1 150px' }}
      />

      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value as ProjectStatus | 'all')}
        style={{ ...inputStyle, flex: '0 0 auto', width: 'auto' }}
      >
        <option value="all">Tous les statuts</option>
        {(Object.entries(STATUS_LABELS) as [ProjectStatus, string][]).map(([k, v]) => (
          <option key={k} value={k}>{v}</option>
        ))}
      </select>

      <select
        value={priorityFilter}
        onChange={(e) => onPriorityChange(e.target.value as Priority | 'all')}
        style={{ ...inputStyle, flex: '0 0 auto', width: 'auto' }}
      >
        <option value="all">Toutes priorités</option>
        {(Object.entries(PRIORITY_LABELS) as [Priority, string][]).map(([k, v]) => (
          <option key={k} value={k}>{v}</option>
        ))}
      </select>
    </div>
  );
}
