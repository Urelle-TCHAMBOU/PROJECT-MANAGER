// ─── components/ParticipantPanel/ParticipantPanel.tsx ─────────────────────────

import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { useForm }     from '../../hooks/useForm';
import { Field }       from '../Field/Field';
import type { Participant, FormErrors } from '../../types';

type ParticipantFormValues = Omit<Participant, 'id'>;

const EMPTY: ParticipantFormValues = { name: '', role: '' };

function validate(v: ParticipantFormValues): FormErrors<ParticipantFormValues> {
  const e: FormErrors<ParticipantFormValues> = {};
  if (!v.name.trim()) e.name = 'Le nom est requis';
  if (!v.role.trim()) e.role = 'Le role est requis';
  return e;
}

const inp: React.CSSProperties = {
  fontFamily: 'inherit', fontSize: '13px', width: '100%',
  padding: '7px 9px', border: '0.5px solid #ccc', borderRadius: '8px',
  background: '#fff', color: '#111', outline: 'none',
};

function initials(name: string) {
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);
}

const COLORS = ['#E6F1FB', '#EAF3DE', '#FAEEDA', '#FCEBEB', '#F1EFE8', '#EEEDFE'];
const TEXT_C = ['#0C447C', '#27500A', '#633806', '#791F1F', '#444441', '#3C3489'];

export function ParticipantPanel() {
  const { state, dispatch } = useProjects();
  const [open, setOpen]     = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, reset, setValues } =
    useForm<ParticipantFormValues>(EMPTY, validate);

  const startEdit = (p: Participant) => {
    setEditId(p.id);
    setValues({ name: p.name, role: p.role });
    setOpen(true);
  };

  const startAdd = () => {
    setEditId(null);
    reset();
    setOpen(true);
  };

  const submit = handleSubmit((data) => {
    if (editId !== null) {
      dispatch({ type: 'UPDATE_PARTICIPANT', payload: { ...data, id: editId } });
    } else {
      dispatch({ type: 'ADD_PARTICIPANT', payload: data });
    }
    setOpen(false);
    reset();
    setEditId(null);
  });

  return (
    <div style={{ background: '#fff', border: '0.5px solid #ddd', borderRadius: '12px', padding: '14px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <p style={{ fontWeight: 500, fontSize: '13px' }}>Participants ({state.participants.length})</p>
        <button
          onClick={startAdd}
          style={{ padding: '4px 10px', borderRadius: '7px', border: '0.5px solid #185FA5', background: 'none', color: '#185FA5', fontSize: '11px', fontWeight: 500, cursor: 'pointer' }}
        >
          + Ajouter
        </button>
      </div>

      {/* Formulaire inline */}
      {open && (
        <div style={{ background: '#f9f9f8', border: '0.5px solid #e0e0e0', borderRadius: '8px', padding: '12px', marginBottom: '12px' }}>
          <p style={{ fontSize: '12px', fontWeight: 500, marginBottom: '8px', color: '#444' }}>
            {editId !== null ? 'Modifier le participant' : 'Nouveau participant'}
          </p>
          <Field label="Nom *" error={errors.name} touched={touched.name}>
            <input name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} placeholder="Ex : Marie" style={inp} />
          </Field>
          <Field label="Role *" error={errors.role} touched={touched.role}>
            <input name="role" value={values.role} onChange={handleChange} onBlur={handleBlur} placeholder="Ex : Designer" style={inp} />
          </Field>
          <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button
              onClick={() => { setOpen(false); reset(); setEditId(null); }}
              style={{ padding: '5px 12px', borderRadius: '7px', border: '0.5px solid #ccc', background: 'none', color: '#666', fontSize: '12px', cursor: 'pointer' }}
            >
              Annuler
            </button>
            <button
              onClick={submit}
              style={{ padding: '5px 12px', borderRadius: '7px', border: 'none', background: '#185FA5', color: '#fff', fontSize: '12px', cursor: 'pointer' }}
            >
              {editId !== null ? 'Mettre a jour' : 'Ajouter'}
            </button>
          </div>
        </div>
      )}

      {/* Liste */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {state.participants.length === 0 && (
          <p style={{ fontSize: '12px', color: '#bbb', textAlign: 'center', padding: '12px 0' }}>Aucun participant</p>
        )}
        {state.participants.map((p, i) => {
          const ci = i % COLORS.length;
          // compter les projets et taches assignes
          const projCount = state.projects.filter((pr) => pr.ownerId === p.id).length;
          const taskCount = state.projects.reduce((acc, pr) => acc + pr.tasks.filter((t) => t.assigneeId === p.id).length, 0);

          return (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '7px 8px', border: '0.5px solid #eee', borderRadius: '8px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                background: COLORS[ci], color: TEXT_C[ci],
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '12px', fontWeight: 500,
              }}>
                {initials(p.name)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '13px', fontWeight: 500, lineHeight: 1.3 }}>{p.name}</p>
                <p style={{ fontSize: '11px', color: '#888' }}>{p.role}</p>
                <p style={{ fontSize: '10px', color: '#bbb', marginTop: '2px' }}>
                  {projCount} projet{projCount !== 1 ? 's' : ''} &middot; {taskCount} tache{taskCount !== 1 ? 's' : ''}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button onClick={() => startEdit(p)}
                  style={{ background: 'none', border: '0.5px solid #ddd', borderRadius: '5px', padding: '2px 6px', fontSize: '10px', color: '#888', cursor: 'pointer' }}>
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Supprimer ' + p.name + ' ? Il sera desassigne de tous ses projets et taches.'))
                      dispatch({ type: 'DELETE_PARTICIPANT', payload: p.id });
                  }}
                  style={{ background: 'none', border: '0.5px solid #ddd', borderRadius: '5px', padding: '2px 6px', fontSize: '10px', color: '#A32D2D', cursor: 'pointer' }}>
                  &times;
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
