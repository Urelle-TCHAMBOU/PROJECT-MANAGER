// ─── context/ProjectContext.tsx ───────────────────────────────────────────────

import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  type ReactNode,
} from 'react';
import type { AppState, AppAction, Project, Task, Participant } from '../types';
import { INITIAL_PROJECTS, INITIAL_PARTICIPANTS } from '../utils/constants';
import { generateId } from '../utils/helpers';

// ── Reducer ──────────────────────────────────────────────────────────────────

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {

    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [
          ...state.projects,
          { ...action.payload, id: generateId(), tasks: [] } satisfies Project,
        ],
      };

    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.payload.id ? action.payload : p,
        ),
      };

    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter((p) => p.id !== action.payload),
        selectedId: state.selectedId === action.payload
          ? (state.projects.find((p) => p.id !== action.payload)?.id ?? null)
          : state.selectedId,
      };

    case 'SELECT_PROJECT':
      return { ...state, selectedId: action.payload };

    case 'ADD_TASK':
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.payload.projectId
            ? { ...p, tasks: [...p.tasks, { ...action.payload.task, id: generateId() } satisfies Task] }
            : p,
        ),
      };

    case 'UPDATE_TASK':
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.payload.projectId
            ? {
                ...p,
                tasks: p.tasks.map((t) =>
                  t.id === action.payload.taskId ? { ...t, status: action.payload.status } : t,
                ),
              }
            : p,
        ),
      };

    case 'DELETE_TASK':
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.payload.projectId
            ? { ...p, tasks: p.tasks.filter((t) => t.id !== action.payload.taskId) }
            : p,
        ),
      };

    case 'ADD_PARTICIPANT':
      return {
        ...state,
        participants: [
          ...state.participants,
          { ...action.payload, id: generateId() } satisfies Participant,
        ],
      };

    case 'UPDATE_PARTICIPANT':
      return {
        ...state,
        participants: state.participants.map((p) =>
          p.id === action.payload.id ? action.payload : p,
        ),
      };

    case 'DELETE_PARTICIPANT':
      return {
        ...state,
        participants: state.participants.filter((p) => p.id !== action.payload),
        // desassigner ce participant des projets et taches
        projects: state.projects.map((p) => ({
          ...p,
          ownerId: p.ownerId === action.payload ? null : p.ownerId,
          tasks: p.tasks.map((t) => ({
            ...t,
            assigneeId: t.assigneeId === action.payload ? null : t.assigneeId,
          })),
        })),
      };

    default:
      return state;
  }
}

// ── Context ──────────────────────────────────────────────────────────────────

interface AppContextValue {
  state:    AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, {
    projects:     INITIAL_PROJECTS,
    selectedId:   INITIAL_PROJECTS[0]?.id ?? null,
    participants: INITIAL_PARTICIPANTS,
  });

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useProjects(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useProjects doit etre utilise dans ProjectProvider');
  return ctx;
}
