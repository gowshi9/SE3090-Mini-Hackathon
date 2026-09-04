import React from 'react';
import { STATUS_COLORS } from '../schemas/statusSchema';

/**
 * Visual badge for food status.
 * @param {Object} props
 * @param {string} props.status
 */
export function StatusBadge({ status }) {
  const colorClass = STATUS_COLORS[status] || 'bg-slate-100 text-slate-800';

  return (
    <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full border ${colorClass}`}>
      {status}
    </span>
  );
}
