// ─── components/TaskForm/TaskForm.tsx ─────────────────────────────────────────

import React from 'react';
import { useForm }     from '../../hooks/useForm';
import { useProjects } from '../../context/ProjectContext';
import { Field }       from '../Field/Field';
import type { Task, TaskStatus, FormErrors } from '../../types';
import { STATUS_LABELS } from '../../utils/constants';

type TaskFormValues = Omit<Task, 'id'>;

interface TaskFormProps {
  projectId: number;
  onClose:   () => void;
}

const EMPTY: TaskFormValues = { title: '', assigneeId: null, status: 'todo' };

function validate(values: TaskFormValues): FormErrors<TaskFormValues> {
  const errors: FormErrors<TaskFormValues> = {};
  if (!values.title.trim()) errors.title = 'Le titre est requis';
  return errors;
}

const inp: React.CSSProperties = {
  fontFamily: 'inherit', fontSize: '13px', width: '100%',
  padding: '8px 10px', border: '0.5px solid #ccc', borderRadius: '8px',
  background: '#fff', color: '#111', outline: 'none',
};

export function TaskForm({ projectId, onClose }: TaskFormProps) {
  const { state, dispatch } = useProjects();
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, reset } =
    useForm<TaskFormValues>(EMPTY, validate);

  const submit = handleSubmit((data) => {
    dispatch({ type: 'ADD_TASK', payload: { projectId, task: data } });
    reset();
    onClose();
  });

  return (
    <div>
      <Field label="Titre de la tache *" error={errors.title} touched={touched.title}>
        <input name="title" value={values.title} onChange={handleChange} onBlur={handleBlur}
          placeholder="Ex : Rediger les specs" style={inp} />
      </Field>

      <Field label="Assigner a">
        <select
          name="assigneeId"
          value={values.assigneeId ?? ''}
          onChange={(e) => handleChange({ target: { name: 'assigneeId', value: e.target.value ? Number(e.target.value) : null } } as any)}
          style={inp}
        >
          <option value="">-- Aucun --</option>
          {state.participants.map((p) => (
            <option key={p.id} value={p.id}>{p.name} ({p.role})</option>
          ))}
        </select>
      </Field>

      <Field label="Statut">
        <select name="status" value={values.status} onChange={handleChange} style={inp}>
          {(Object.entries(STATUS_LABELS) as [TaskStatus, string][]).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
      </Field>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '16px' }}>
        <button onClick={onClose} style={{ padding: '7px 16px', borderRadius: '8px', border: '0.5px solid #ccc', background: 'none', color: '#666', fontSize: '13px', cursor: 'pointer' }}>
          Annuler
        </button>
        <button onClick={submit} style={{ padding: '7px 16px', borderRadius: '8px', border: 'none', background: '#185FA5', color: '#fff', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
          Ajouter
        </button>
      </div>
    </div>
  );
}
