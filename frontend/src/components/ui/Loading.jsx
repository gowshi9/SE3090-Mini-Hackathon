import React from 'react';

/**
 * Reusable Loading Spinner component.
 * @param {Object} props
 * @param {string} [props.message='Loading...'] - Label text.
 * @returns {JSX.Element}
 */
export function Loading({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 gap-3">
      <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
      <p className="text-sm font-medium text-slate-600">{message}</p>
    </div>
  );
}
