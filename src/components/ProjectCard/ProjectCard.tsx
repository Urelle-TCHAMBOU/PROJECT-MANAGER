// ─── components/ProjectCard/ProjectCard.tsx ────────────────────────────────────

import React, { useState } from 'react';
import { useProjects }  from '../../context/ProjectContext';
import { Badge }        from '../Badge/Badge';
import { Modal }        from '../Modal/Modal';
import { ProjectForm }  from '../ProjectForm/ProjectForm';
import type { Project } from '../../types';
import { STATUS_LABELS, PRIORITY_LABELS, STATUS_COLORS, PRIORITY_COLORS } from '../../utils/constants';
import { getProgress, formatDate } from '../../utils/helpers';

interface ProjectCardProps {
  project:  Project;
  selected: boolean;
  onSelect: (id: number) => void;
}

export function ProjectCard({ project, selected, onSelect }: ProjectCardProps) {
  const { state, dispatch } = useProjects();
  const [editing, setEditing] = useState(false);

  const progress = getProgress(project);
  const done     = project.tasks.filter((t) => t.status === 'done').length;
  const owner    = project.ownerId ? state.participants.find((p) => p.id === project.ownerId) : null;

  const handleUpdate = (data: Omit<Project, 'id' | 'tasks'>) =>
    dispatch({ type: 'UPDATE_PROJECT', payload: { ...project, ...data } });

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Supprimer ce projet ?'))
      dispatch({ type: 'DELETE_PROJECT', payload: project.id });
  };

  return (
    <>
      <div
        onClick={() => onSelect(project.id)}
        style={{
          background: '#fff', borderRadius: '12px', padding: '14px 16px', cursor: 'pointer',
          border: `0.5px solid ${selected ? '#378ADD' : '#ddd'}`, transition: 'border-color .15s',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <span style={{ fontWeight: 500, fontSize: '14px', flex: 1, paddingRight: '8px' }}>{project.name}</span>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button onClick={(e) => { e.stopPropagation(); setEditing(true); }}
              style={{ background: 'none', border: '0.5px solid #ddd', borderRadius: '6px', padding: '3px 7px', fontSize: '11px', color: '#888', cursor: 'pointer' }}>
              Editer
            </button>
            <button onClick={handleDelete}
              style={{ background: 'none', border: '0.5px solid #ddd', borderRadius: '6px', padding: '3px 7px', fontSize: '11px', color: '#A32D2D', cursor: 'pointer' }}>
              &times;
            </button>
          </div>
        </div>

        <p style={{ fontSize: '12px', color: '#888', marginBottom: '10px', lineHeight: 1.5 }}>
          {project.description || 'Aucune description'}
        </p>

        <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
          <Badge label={STATUS_LABELS[project.status]}     bg={STATUS_COLORS[project.status].bg}     color={STATUS_COLORS[project.status].text} />
          <Badge label={PRIORITY_LABELS[project.priority]} bg={PRIORITY_COLORS[project.priority].bg} color={PRIORITY_COLORS[project.priority].text} />
        </div>

        {owner && (
          <p style={{ fontSize: '11px', color: '#888', marginBottom: '8px' }}>
            Responsable : <strong style={{ fontWeight: 500 }}>{owner.name}</strong> &middot; {owner.role}
          </p>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#aaa', marginBottom: '3px' }}>
          <span>{done}/{project.tasks.length} taches</span>
          <span>{progress}%</span>
        </div>
        <div style={{ height: '4px', background: '#e8e8e8', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: '#1D9E75', transition: 'width .3s' }} />
        </div>
        <p style={{ fontSize: '11px', color: '#bbb', marginTop: '6px' }}>Echeance : {formatDate(project.deadline)}</p>
      </div>

      {editing && (
        <Modal title="Modifier le projet" onClose={() => setEditing(false)}>
          <ProjectForm
            initial={{ name: project.name, description: project.description, status: project.status, priority: project.priority, deadline: project.deadline, ownerId: project.ownerId }}
            onSubmit={handleUpdate}
            onClose={() => setEditing(false)}
          />
        </Modal>
      )}
    </>
  );
}
