// ─── components/TaskItem/TaskItem.tsx ─────────────────────────────────────────

import React from 'react';
import { useProjects } from '../../context/ProjectContext';
import { Badge }       from '../Badge/Badge';
import type { Task, TaskStatus } from '../../types';
import { STATUS_LABELS, STATUS_COLORS, TASK_STATUSES } from '../../utils/constants';

interface TaskItemProps {
  task:      Task;
  projectId: number;
}

export function TaskItem({ task, projectId }: TaskItemProps) {
  const { state, dispatch } = useProjects();

  const assignee = task.assigneeId
    ? state.participants.find((p) => p.id === task.assigneeId)
    : null;

  const cycleStatus = () => {
    const idx  = TASK_STATUSES.indexOf(task.status);
    const next = TASK_STATUSES[(idx + 1) % TASK_STATUSES.length] as TaskStatus;
    dispatch({ type: 'UPDATE_TASK', payload: { projectId, taskId: task.id, status: next } });
  };

  const isDone = task.status === 'done';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0', borderBottom: '0.5px solid #eee' }}>
      <button
        onClick={cycleStatus}
        title="Changer statut"
        style={{
          width: '18px', height: '18px', borderRadius: '50%',
          border: `2px solid ${isDone ? '#1D9E75' : '#ccc'}`,
          background: isDone ? '#1D9E75' : 'none',
          flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}
      >
        {isDone && <span style={{ color: '#fff', fontSize: '10px', lineHeight: 1 }}>&#10003;</span>}
      </button>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: '13px', textDecoration: isDone ? 'line-through' : 'none', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {task.title}
        </p>
        {assignee && (
          <p style={{ fontSize: '11px', color: '#888' }}>{assignee.name} &middot; {assignee.role}</p>
        )}
      </div>

      <Badge label={STATUS_LABELS[task.status]} bg={STATUS_COLORS[task.status].bg} color={STATUS_COLORS[task.status].text} />

      <button
        onClick={() => dispatch({ type: 'DELETE_TASK', payload: { projectId, taskId: task.id } })}
        style={{ background: 'none', border: 'none', color: '#bbb', fontSize: '16px', cursor: 'pointer' }}
      >
        &times;
      </button>
    </div>
  );
}
