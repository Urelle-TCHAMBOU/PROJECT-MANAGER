// ─── components/Modal/Modal.tsx ───────────────────────────────────────────────

import React, { type ReactNode } from 'react';

interface ModalProps {
  title:    string;
  onClose:  () => void;
  children: ReactNode;
}

export function Modal({ title, onClose, children }: ModalProps) {
  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position:       'fixed',
        inset:          0,
        background:     'rgba(0,0,0,0.35)',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        zIndex:         100,
      }}
    >
      <div
        style={{
          background:    'var(--color-background-primary, #fff)',
          borderRadius:  '12px',
          border:        '0.5px solid var(--color-border-tertiary, #ddd)',
          width:         '100%',
          maxWidth:      '440px',
          padding:       '20px 24px',
          maxHeight:     '90vh',
          overflowY:     'auto',
        }}
      >
        {/* En-tête */}
        <div
          style={{
            display:        'flex',
            justifyContent: 'space-between',
            alignItems:     'center',
            marginBottom:   '16px',
          }}
        >
          <span style={{ fontWeight: 500, fontSize: '15px' }}>{title}</span>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border:     'none',
              fontSize:   '20px',
              color:      '#999',
              lineHeight: 1,
              cursor:     'pointer',
            }}
            aria-label="Fermer"
          >
            ×
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
