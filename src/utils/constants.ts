// ─── utils/constants.ts ───────────────────────────────────────────────────────

import type { Project, Participant } from '../types';

export const STATUS_LABELS = {
  todo:        'A faire',
  in_progress: 'En cours',
  done:        'Termine',
} as const;

export const PRIORITY_LABELS = {
  low:    'Faible',
  medium: 'Moyenne',
  high:   'Haute',
} as const;

export const STATUS_COLORS = {
  todo:        { bg: '#E6F1FB', text: '#0C447C' },
  in_progress: { bg: '#FAEEDA', text: '#633806' },
  done:        { bg: '#EAF3DE', text: '#27500A' },
} as const;

export const PRIORITY_COLORS = {
  low:    { bg: '#F1EFE8', text: '#444441' },
  medium: { bg: '#FAEEDA', text: '#633806' },
  high:   { bg: '#FCEBEB', text: '#791F1F' },
} as const;

export const TASK_STATUSES = ['todo', 'in_progress', 'done'] as const;

export const INITIAL_PARTICIPANTS: Participant[] = [
  { id: 1, name: 'Amina',   role: 'Designer' },
  { id: 2, name: 'Kofi',    role: 'Developpeur' },
  { id: 3, name: 'Ibrahim', role: 'Tech Lead' },
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 1,
    name: 'Refonte UI',
    description: 'Moderniser l\u0027interface utilisateur de la plateforme.',
    status: 'in_progress',
    priority: 'high',
    deadline: '2026-06-01',
    ownerId: 3,
    tasks: [
      { id: 101, title: 'Audit design actuel',   status: 'done',        assigneeId: 1 },
      { id: 102, title: 'Maquettes Figma',        status: 'in_progress', assigneeId: 2 },
      { id: 103, title: 'Integration composants', status: 'todo',        assigneeId: 1 },
    ],
  },
  {
    id: 2,
    name: 'API Gateway',
    description: 'Mise en place d\u0027une gateway centralisee pour les microservices.',
    status: 'todo',
    priority: 'medium',
    deadline: '2026-07-15',
    ownerId: 3,
    tasks: [
      { id: 201, title: 'Analyse des besoins', status: 'done', assigneeId: 3 },
      { id: 202, title: 'Architecture cible',  status: 'todo', assigneeId: 2 },
    ],
  },
  {
    id: 3,
    name: 'Dashboard Analytics',
    description: 'Tableaux de bord temps reel pour le suivi des KPIs.',
    status: 'done',
    priority: 'low',
    deadline: '2026-04-01',
    ownerId: 2,
    tasks: [
      { id: 301, title: 'Connexion donnees', status: 'done', assigneeId: 1 },
      { id: 302, title: 'Graphiques D3',     status: 'done', assigneeId: 3 },
    ],
  },
];
