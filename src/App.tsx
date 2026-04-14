// ─── App.tsx ──────────────────────────────────────────────────────────────────

import React, { useState, useMemo } from 'react';
import { useProjects }       from './context/ProjectContext';
import { useFilter }         from './hooks/useFilter';
import { StatsBar }          from './components/StatsBar/StatsBar';
import { Filters }           from './components/Filters/Filters';
import { ProjectCard }       from './components/ProjectCard/ProjectCard';
import { ProjectDetail }     from './components/ProjectDetail/ProjectDetail';
import { ParticipantPanel }  from './components/ParticipantPanel/ParticipantPanel';
import { Modal }             from './components/Modal/Modal';
import { ProjectForm }       from './components/ProjectForm/ProjectForm';
import type { Project }      from './types';

export default function App() {
  const { state, dispatch }     = useProjects();
  const [creating, setCreating] = useState(false);

  const { filtered, search, setSearch, statusFilter, setStatusFilter, priorityFilter, setPriorityFilter } =
    useFilter(state.projects);

  const selectedProject = useMemo(
    () => state.projects.find((p) => p.id === state.selectedId) ?? null,
    [state.projects, state.selectedId],
  );

  const handleCreate = (data: Omit<Project, 'id' | 'tasks'>) => {
    dispatch({ type: 'ADD_PROJECT', payload: data });
    setCreating(false);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' }}>

      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '18px', fontWeight: 500 }}>Gestionnaire de projets</h1>
        <button
          onClick={() => setCreating(true)}
          style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#185FA5', color: '#fff', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}
        >
          + Nouveau projet
        </button>
      </div>

      {/* Stats */}
      <StatsBar projects={state.projects} />

      {/* Filtres */}
      <Filters
        search={search}           onSearch={setSearch}
        statusFilter={statusFilter}     onStatusChange={setStatusFilter}
        priorityFilter={priorityFilter} onPriorityChange={setPriorityFilter}
      />

      {/* Layout 3 colonnes : liste | detail | participants */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.2fr) 260px', gap: '14px' }}>

        {/* Colonne 1 — liste projets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.length === 0
            ? <div style={{ padding: '24px', textAlign: 'center', color: '#999', fontSize: '13px', border: '0.5px solid #eee', borderRadius: '12px' }}>Aucun projet trouve</div>
            : filtered.map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  selected={state.selectedId === p.id}
                  onSelect={(id) => dispatch({ type: 'SELECT_PROJECT', payload: id })}
                />
              ))
          }
        </div>

        {/* Colonne 2 — detail projet */}
        <div>
          {selectedProject
            ? <ProjectDetail project={selectedProject} />
            : <div style={{ padding: '32px', textAlign: 'center', color: '#bbb', fontSize: '13px', border: '0.5px solid #eee', borderRadius: '12px' }}>Selectionnez un projet</div>
          }
        </div>

        {/* Colonne 3 — participants */}
        <div>
          <ParticipantPanel />
        </div>
      </div>

      {creating && (
        <Modal title="Nouveau projet" onClose={() => setCreating(false)}>
          <ProjectForm onSubmit={handleCreate} onClose={() => setCreating(false)} />
        </Modal>
      )}
    </div>
  );
}
