// ─── components/Field/Field.tsx ───────────────────────────────────────────────
//
// Wrapper de champ de formulaire : label + input + message d'erreur.

import React, { type ReactNode } from 'react';

interface FieldProps {
  label:    string;
  error?:   string;
  touched?: boolean;
  children: ReactNode;
}

export function Field({ label, error, touched, children }: FieldProps) {
  return (
    <div style={{ marginBottom: '12px' }}>
      <label
        style={{
          display:      'block',
          fontSize:     '12px',
          color:        'var(--color-text-secondary, #666)',
          marginBottom: '4px',
        }}
      >
        {label}
      </label>

      {children}

      {touched && error && (
        <p style={{ fontSize: '11px', color: '#A32D2D', marginTop: '3px' }}>
          {error}
        </p>
      )}
    </div>
  );
}
