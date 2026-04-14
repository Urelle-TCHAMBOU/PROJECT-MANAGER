// ─── components/ProjectForm/ProjectForm.tsx ────────────────────────────────────

import React from 'react';
import { useForm }     from '../../hooks/useForm';
import { useProjects } from '../../context/ProjectContext';
import { Field }       from '../Field/Field';
import type { Project, ProjectStatus, Priority, FormErrors } from '../../types';
import { STATUS_LABELS, PRIORITY_LABELS } from '../../utils/constants';

type ProjectFormValues = Omit<Project, 'id' | 'tasks'>;

interface ProjectFormProps {
  initial?: ProjectFormValues;
  onSubmit: (values: ProjectFormValues) => void;
  onClose:  () => void;
}

const EMPTY: ProjectFormValues = {
  name: '', description: '', status: 'todo', priority: 'medium', deadline: '', ownerId: null,
};

function validate(values: ProjectFormValues): FormErrors<ProjectFormValues> {
  const errors: FormErrors<ProjectFormValues> = {};
  if (!values.name.trim())        errors.name     = 'Le nom est requis';
  else if (values.name.length < 3) errors.name    = 'Minimum 3 caracteres';
  if (!values.deadline)            errors.deadline = 'La date limite est requise';
  return errors;
}

const inp: React.CSSProperties = {
  fontFamily: 'inherit', fontSize: '13px', width: '100%',
  padding: '8px 10px', border: '0.5px solid #ccc', borderRadius: '8px',
  background: '#fff', color: '#111', outline: 'none',
};

export function ProjectForm({ initial, onSubmit, onClose }: ProjectFormProps) {
  const { state } = useProjects();
  const { values, errors, touched, handleChange, handleBlur, handleSubmit, reset } =
    useForm<ProjectFormValues>(initial ?? EMPTY, validate);

  const submit = handleSubmit((data) => { onSubmit(data); reset(); onClose(); });

  return (
    <div>
      <Field label="Nom du projet *" error={errors.name} touched={touched.name}>
        <input name="name" value={values.name} onChange={handleChange} onBlur={handleBlur}
          placeholder="Ex : Migration Cloud" style={inp} />
      </Field>

      <Field label="Description">
        <textarea name="description" value={values.description} onChange={handleChange}
          placeholder="Objectif du projet..." rows={3} style={{ ...inp, resize: 'vertical' }} />
      </Field>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <Field label="Statut">
          <select name="status" value={values.status} onChange={handleChange} style={inp}>
            {(Object.entries(STATUS_LABELS) as [ProjectStatus, string][]).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </Field>
        <Field label="Priorite">
          <select name="priority" value={values.priority} onChange={handleChange} style={inp}>
            {(Object.entries(PRIORITY_LABELS) as [Priority, string][]).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Responsable">
        <select
          name="ownerId"
          value={values.ownerId ?? ''}
          onChange={(e) => handleChange({ target: { name: 'ownerId', value: e.target.value ? Number(e.target.value) : null } } as any)}
          style={inp}
        >
          <option value="">-- Aucun --</option>
          {state.participants.map((p) => (
            <option key={p.id} value={p.id}>{p.name} ({p.role})</option>
          ))}
        </select>
      </Field>

      <Field label="Date limite *" error={errors.deadline} touched={touched.deadline}>
        <input type="date" name="deadline" value={values.deadline}
          onChange={handleChange} onBlur={handleBlur} style={inp} />
      </Field>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '16px' }}>
        <button onClick={onClose} style={{ padding: '7px 16px', borderRadius: '8px', border: '0.5px solid #ccc', background: 'none', color: '#666', fontSize: '13px', cursor: 'pointer' }}>
          Annuler
        </button>
        <button onClick={submit} style={{ padding: '7px 16px', borderRadius: '8px', border: 'none', background: '#185FA5', color: '#fff', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
          Enregistrer
        </button>
      </div>
    </div>
  );
}
