// ─── components/ProjectDetail/ProjectDetail.tsx ────────────────────────────────

import React, { useState } from 'react';
import { Badge }     from '../Badge/Badge';
import { Modal }     from '../Modal/Modal';
import { TaskForm }  from '../TaskForm/TaskForm';
import { TaskItem }  from '../TaskItem/TaskItem';
import type { Project } from '../../types';
import { STATUS_LABELS, PRIORITY_LABELS, STATUS_COLORS, PRIORITY_COLORS } from '../../utils/constants';

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const [addingTask, setAddingTask] = useState(false);

  return (
    <>
      <div
        style={{
          background:   'var(--color-background-primary, #fff)',
          border:       '0.5px solid var(--color-border-tertiary, #ddd)',
          borderRadius: '12px',
          padding:      '16px 18px',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 500, marginBottom: '6px' }}>{project.name}</h3>
            <div style={{ display: 'flex', gap: '6px' }}>
              <Badge label={STATUS_LABELS[project.status]}     bg={STATUS_COLORS[project.status].bg}     color={STATUS_COLORS[project.status].text} />
              <Badge label={PRIORITY_LABELS[project.priority]} bg={PRIORITY_COLORS[project.priority].bg} color={PRIORITY_COLORS[project.priority].text} />
            </div>
          </div>
          <button
            onClick={() => setAddingTask(true)}
            style={{
              padding: '6px 12px', borderRadius: '8px',
              border: '0.5px solid #185FA5', background: 'none',
              color: '#185FA5', fontSize: '12px', fontWeight: 500, cursor: 'pointer',
            }}
          >
            + Tâche
          </button>
        </div>

        {/* Description */}
        <p style={{ fontSize: '13px', color: '#888', marginBottom: '14px', lineHeight: 1.6 }}>
          {project.description || 'Aucune description.'}
        </p>

        {/* Liste des tâches */}
        <div style={{ borderTop: '0.5px solid var(--color-border-tertiary, #eee)', paddingTop: '12px' }}>
          <p style={{ fontSize: '12px', fontWeight: 500, color: '#888', marginBottom: '8px' }}>
            Tâches ({project.tasks.length})
          </p>

          {project.tasks.length === 0 ? (
            <p style={{ fontSize: '12px', color: '#bbb', textAlign: 'center', padding: '16px 0' }}>
              {"Aucune tâche pour l'instant"}
            </p>
          ) : (
            project.tasks.map((t) => (
              <TaskItem key={t.id} task={t} projectId={project.id} />
            ))
          )}
        </div>
      </div>

      {addingTask && (
        <Modal title="Nouvelle tâche" onClose={() => setAddingTask(false)}>
          <TaskForm projectId={project.id} onClose={() => setAddingTask(false)} />
        </Modal>
      )}
    </>
  );
}
