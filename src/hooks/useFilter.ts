// ─── hooks/useFilter.ts ───────────────────────────────────────────────────────
//
// Custom hook : filtre les projets par recherche texte, statut et priorité.

import { useState, useMemo } from 'react';
import type { Project, ProjectStatus, Priority } from '../types';

interface UseFilterReturn {
  filtered:         Project[];
  search:           string;
  statusFilter:     ProjectStatus | 'all';
  priorityFilter:   Priority | 'all';
  setSearch:        (v: string) => void;
  setStatusFilter:  (v: ProjectStatus | 'all') => void;
  setPriorityFilter:(v: Priority | 'all') => void;
}

export function useFilter(projects: Project[]): UseFilterReturn {
  const [search,           setSearch]           = useState('');
  const [statusFilter,     setStatusFilter]     = useState<ProjectStatus | 'all'>('all');
  const [priorityFilter,   setPriorityFilter]   = useState<Priority | 'all'>('all');

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return projects.filter((p) => {
      const matchSearch   = p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
      const matchStatus   = statusFilter   === 'all' || p.status   === statusFilter;
      const matchPriority = priorityFilter === 'all' || p.priority === priorityFilter;
      return matchSearch && matchStatus && matchPriority;
    });
  }, [projects, search, statusFilter, priorityFilter]);

  return { filtered, search, statusFilter, priorityFilter, setSearch, setStatusFilter, setPriorityFilter };
}
