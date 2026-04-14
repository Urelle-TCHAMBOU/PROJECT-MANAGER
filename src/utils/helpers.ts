// ─── utils/helpers.ts ─────────────────────────────────────────────────────────

import type { Project } from '../types';

/** Calcule le pourcentage de tâches terminées */
export function getProgress(project: Project): number {
  const total = project.tasks.length;
  if (total === 0) return 0;
  const done = project.tasks.filter((t) => t.status === 'done').length;
  return Math.round((done / total) * 100);
}

/** Formate une date ISO en date lisible */
export function formatDate(iso: string): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

/** Génère un ID unique simple */
export function generateId(): number {
  return Date.now() + Math.floor(Math.random() * 1000);
}
